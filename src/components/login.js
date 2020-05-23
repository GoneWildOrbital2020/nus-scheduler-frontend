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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleChangeEmail = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    // TODO: validate data
    console.log('reloading!');
    window.location.reload();
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

export default Login;
