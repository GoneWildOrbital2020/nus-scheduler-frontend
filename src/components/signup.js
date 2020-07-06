import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { dark, light, accent } from '../colors';
import Notification from './notification';
import { url } from './constant';

const useStyles = makeStyles({
  signup: {
    width: '100%',
    textAlign: 'center',
  },
  button: {
    color: light,
    width: '100%',
    backgroundColor: accent,
  },
  form: {
    boxSizing: 'border-box',
    width: '300px',
    marginTop: '2em',
    display: 'inline-block',
    border: 'solid gray 1px',
    borderRadius: '10px',
    padding: '1em',
  },
  input: {
    margin: '1rem 0',
  },
});

const Signup = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

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
    fetch(`${url}/users/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 400 || res.status === 500) {
          throw new Error('Signup failed, please try again!');
        }
        return res.json();
      })
      .then(() => {
        setSeverity('success');
        setOpen(true);
        setMessage('Signup successful!');
        window.location.replace('/login');
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
    <div className={classes.signup}>
      <div className={classes.form} style={{ backgroundColor: light }}>
        <h1 style={{ color: dark }}>JOIN NOW</h1>
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
              label="username"
              variant="outlined"
              value={username}
              onChange={handleChangeUsername}
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
          Signup
        </Button>
        <Notification
          open={open}
          handleClose={handleClose}
          severity={severity}
          message={message}
        />
      </div>
    </div>
  );
};

export default Signup;
