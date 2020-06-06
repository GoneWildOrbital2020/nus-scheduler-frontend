import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../css/signup.css';
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

const Signup = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };
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
      username,
      password,
    };
    fetch('http://localhost:8000/users/create/', {
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
      .then(() => {
        window.location.replace('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="signup">
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
          Signup
        </Button>
      </div>
    </div>
  );
};

export default Signup;
