import React, { useState } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Loader from 'react-loader-spinner';
import { dark, light } from '../Colors';
import Notification from './Notification';
import { url } from './Constant';

const useStyles = makeStyles({
  signup: {
    width: '100%',
    textAlign: 'center',
  },
  button: {
    color: light,
    width: '100%',
  },
  form: {
    boxSizing: 'border-box',
    width: '300px',
    marginTop: '2em',
    display: 'inline-block',
    border: 'solid gray 1px',
    borderRadius: '10px',
    padding: '2rem',
  },
  input: {
    margin: '1rem 0',
  },
});

const Signup = ({ ...routerProps }) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [isLoading, setIsLoading] = useState(false);
  const { history } = routerProps;

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
    setIsLoading(true);
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
        setIsLoading(false);
        if (res.status === 400 || res.status === 500) {
          throw new Error('Sign up failed, please try again!');
        }
        return res.json();
      })
      .then(() => {
        history.push('/login', {
          fromSignup: true,
        });
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
      <Notification
        open={open}
        handleClose={handleClose}
        severity={severity}
        message={message}
      />
      <div className={classes.form} style={{ backgroundColor: light }}>
        <Typography variant="h4" style={{ color: dark }}>
          JOIN NOW
        </Typography>
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
        {isLoading ? (
          <Loader type="ThreeDots" color={dark} height={80} width={80} />
        ) : (
          <Button
            className={classes.button}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            SIGN UP
          </Button>
        )}
      </div>
    </div>
  );
};

export default withRouter(Signup);
