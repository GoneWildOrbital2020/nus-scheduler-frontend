import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../css/login.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleLogin } from '../redux/actions';
import logo from '../images/logo.png';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'relative',
  },
  button: {
    color: 'black',
    width: '82%',
    backgroundColor: '#33f0ff',
  },
});

const Login = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    // TODO: validate data
    event.preventDefault();
    const data = {
      email,
      password,
    };
    fetch('http://localhost:8000/users/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 400) {
          throw new Error('bad request!');
        }
        return res.json();
      })
      .then((json) => {
        props.ToggleLogin(json.token, json.username);
        window.localStorage.setItem('token', json.token);
        window.localStorage.setItem('username', json.username);
        window.localStorage.setItem('isLoggedIn', true);
        window.location.replace('/');
      })
      .catch((err) => {
        console.log(err);
        console.log('error login, try again!');
      });
  };
  return (
    <div className="login">
      <div className="form">
        <img src={logo} alt="logo" />
        <form className={classes.root}>
          <div className="input">
            <TextField
              label="email"
              variant="outlined"
              value={email}
              onChange={handleChangeEmail}
            />
          </div>
          <div className="input">
            <TextField
              label="password"
              variant="outlined"
              value={password}
              onChange={handleChangePassword}
            />
          </div>
        </form>
        <Button className={classes.button} onClick={handleSubmit}>
          Login
        </Button>
        <h5>Not a user?</h5>
        <Link to="/signup" style={{ color: 'black' }}>
          <Button className={classes.button}>Sign Up!</Button>
        </Link>
      </div>
    </div>
  );
};

Login.propTypes = {
  ToggleLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    ToggleLogin: (token, username) => dispatch(toggleLogin(token, username)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
