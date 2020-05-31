import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../css/login.css';
import { Link } from 'react-router-dom';
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

const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    // TODO: validate data
    event.preventDefault();
    const data = {
      username,
      password,
    };
    fetch('http://localhost:8000/token-auth/', {
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
        localStorage.setItem('token', json.token);
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
              label="username"
              variant="outlined"
              value={username}
              onChange={handleChangeUsername}
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

export default Login;
