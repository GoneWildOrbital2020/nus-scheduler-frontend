import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  makeStyles,
  Button,
} from '@material-ui/core';
import { dark, light } from '../colors';
import { url } from './constant';
import Notification from './notification';

const useStyles = makeStyles(() => ({
  paper: {
    width: '300px',
    backgroundColor: light,
    margin: '2rem auto',
    padding: '1rem',
  },
  typography: {
    fontSize: '2rem',
    color: dark,
    fontWeight: 'bold',
  },
  text: {
    fontSize: '1rem',
    color: dark,
    margin: '1rem 0',
  },
  textField: {
    margin: '1rem auto',
    width: '100%',
  },
  button: {
    width: '100%',
    color: light,
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email,
    };
    fetch(`${url}/users/remember/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Account with current email not found!');
        }
        setMessage('Reset email has been sent!');
        setSeverity('success');
        setOpen(true);
      })
      .catch((err) => {
        setMessage(err.message);
        setSeverity('error');
        setOpen(true);
      });
  };

  const handleChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  return (
    <>
      <Paper className={classes.paper}>
        <Typography className={classes.typography}>Password Reset</Typography>
        <Typography className={classes.text}>
          If you have forgotten your password, simply enter your corresponding
          email address and we will send a link to reset your password.
        </Typography>
        <TextField
          className={classes.textField}
          variant="outlined"
          color="primary"
          label="email"
          defaultValue={email}
          onChange={handleChange}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!email}
        >
          Submit
        </Button>
      </Paper>
      <Notification
        message={message}
        handleClose={handleClose}
        open={open}
        severity={severity}
      />
    </>
  );
};

export default ForgotPassword;
