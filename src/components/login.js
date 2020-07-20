import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleLogin } from '../redux/actions';
import { dark, light } from '../colors';
import Notification from './notification';
import { url } from './constant';

const useStyles = makeStyles({
  login: {
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
  const { ...routeProps } = props;
  const { history, location } = routeProps;
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
        if (res.status === 403) {
          throw new Error('Account has not been activated!');
        }
        if (res.status !== 201) {
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
        history.push('/calendar', {
          fromLogin: true,
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

  useEffect(() => {
    if (location.state && location.state.fromAuthenticate) {
      setSeverity('error');
      setOpen(true);
      setMessage('Account activation failed!');
    } else if (location.state && location.state.fromSignup) {
      setSeverity('success');
      setOpen(true);
      setMessage(
        'Signup successful! Please check your email for account activation.',
      );
    } else if (location.state && location.state.fromReset) {
      setSeverity('success');
      setOpen(true);
      setMessage('Reset password successful!');
    }
  }, []);

  return (
    <div className={classes.login}>
      <div className={classes.form}>
        <Typography variant="h4" style={{ color: dark }}>
          WELCOME
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
              label="password"
              type="password"
              variant="outlined"
              value={password}
              onChange={handleChangePassword}
            />
          </div>
        </form>
        <Button
          className={classes.button}
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          LOG IN
        </Button>
        <Notification
          message={message}
          handleClose={handleClose}
          open={open}
          severity={severity}
        />
        <Typography
          variant="body2"
          style={{ color: dark, marginTop: '1rem', marginBottom: '0.25rem' }}
        >
          Not a user?
        </Typography>
        <Link className={classes.link} to="/signup">
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
          >
            SIGN UP
          </Button>
        </Link>
        <Typography
          variant="body2"
          style={{ color: dark, marginTop: '1rem', marginBottom: '0.25rem' }}
        >
          Forgot password?
        </Typography>
        <Link to="/forgotPassword">
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Reset Password
          </Button>
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

export default withRouter(connect(null, mapDispatchToProps)(Login));
