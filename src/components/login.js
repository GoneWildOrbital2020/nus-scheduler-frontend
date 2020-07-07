import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleLogin } from '../redux/actions';
import { dark, light, accent } from '../colors';
import Notification from './notification';
import { url } from './constant';

const useStyles = makeStyles({
  login: {
    width: '100%',
    textAlign: 'center',
  },
  button: {
    color: light,
    backgroundColor: accent,
    width: '100%',
  },
  form: {
    boxSizing: 'border-box',
    width: '300px',
    marginTop: '2em',
    display: 'inline-block',
    border: 'solid gray 1px',
    borderRadius: '10px',
    padding: '1em',
    backgroundColor: light,
  },
  input: {
    margin: '1rem 0',
  },
  link: {
    textDecoration: 'none',
  },
});

const Login = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

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
    fetch(`${url}/users/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 500 || res.status === 400) {
          throw new Error('Login failed, please try again!');
        }
        return res.json();
      })
      .then((json) => {
        props.ToggleLogin(
          json.email,
          json.token,
          json.username,
          json.avatar,
          Date.parse(json.logout_time),
        );
        window.localStorage.setItem('email', json.email);
        window.localStorage.setItem('token', json.token);
        window.localStorage.setItem('username', json.username);
        window.localStorage.setItem('avatar', json.avatar);
        window.localStorage.setItem('isLoggedIn', true);
        window.localStorage.setItem('logoutTime', Date.parse(json.logout_time));
        setSeverity('success');
        setOpen(true);
        setMessage('Login successful!');
        window.location.replace('/');
      })
      .catch((err) => {
        setSeverity('error');
        setOpen(true);
        setMessage(err.message);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.login}>
      <div className={classes.form}>
        <h1 style={{ color: dark }}>WELCOME</h1>
        <form>
          <div className={classes.input}>
            <TextField
              fullWidth
              label="email"
              variant="outlined"
              value={email}
              onChange={handleChangeEmail}
            />
          </div>
          <div className={classes.input}>
            <TextField
              fullWidth
              label="password"
              type="password"
              variant="outlined"
              value={password}
              onChange={handleChangePassword}
            />
          </div>
        </form>
        <Button className={classes.button} onClick={handleSubmit}>
          Login
        </Button>
        <Notification
          message={message}
          handleClose={handleClose}
          open={open}
          severity={severity}
        />
        <h5 style={{ color: dark, marginTop: '1rem', marginBottom: '0.25rem' }}>
          Not a user ?
        </h5>
        <Link className={classes.link} to="/signup">
          <Button className={classes.button}>SignUp</Button>
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
    ToggleLogin: (email, token, username, avatar) =>
      dispatch(toggleLogin(email, token, username, avatar)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
