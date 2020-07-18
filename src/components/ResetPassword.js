import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Paper,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';
import { url } from './constant';
import { light, dark } from '../colors';
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
    marginBottom: '1rem',
  },
  textField: {
    width: '100%',
    marginBottom: '1rem',
  },
  button: {
    width: '100%',
    color: light,
  },
}));

const Authenticate = (props) => {
  const { email, token, ...routeProps } = props;
  const { history } = routeProps;
  const classes = useStyles();
  const [password, setPassword] = useState('');
  const [retype, setRetype] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleChangePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleChangeRetype = (event) => {
    event.preventDefault();
    setRetype(event.target.value);
  };

  const check = () => {
    return !(password === retype) || password === '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email,
      password,
    };
    fetch(`${url}/users/reset/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Reset password failed!');
        }
        history.push('/login', {
          fromReset: true,
        });
      })
      .catch((err) => {
        setMessage(err.message);
        setSeverity('error');
        setOpen(true);
      });
  };

  return (
    <>
      <Paper className={classes.paper}>
        <Typography className={classes.typography}>Password Reset</Typography>
        <TextField
          className={classes.textField}
          variant="outlined"
          color="primary"
          label="New Password"
          type="password"
          defaultValue={password}
          onChange={handleChangePassword}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          color="primary"
          type="password"
          label="Retype New Password"
          defaultValue={retype}
          onChange={handleChangeRetype}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={check()}
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

Authenticate.propTypes = {
  email: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default withRouter(Authenticate);
