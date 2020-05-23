import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../css/login.css';
import logo from '../images/logo.png';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'relative',
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
      </div>
      <h1>Login page!</h1>
    </div>
  );
};

export default Login;
