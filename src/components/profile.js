import React, { useState } from 'react';
import {
  makeStyles,
  Paper,
  Typography,
  Button,
  TextField,
} from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { accent, light, dark } from '../colors';
import Notification from './notification';
import { toggleLogin } from '../redux/actions';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: light,
    margin: '2rem auto',
    width: '300px',
    textAlign: 'center',
    padding: '2rem',
    display: 'inline-block',
  },
  title: {
    color: dark,
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  typography: {
    color: dark,
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginTop: '2rem',
  },
  button: {
    width: '100%',
    backgroundColor: accent,
    color: light,
    margin: '0.5rem 0',
  },
  textField: {
    width: '100%',
    margin: '0.5rem 0',
  },
  input: {
    display: 'none',
  },
  avatar: {
    display: 'block',
    margin: '1rem auto',
    maxWidth: '100%',
    maxHeight: '10rem',
    width: 'auto',
    height: 'auto',
  },
}));

const Profile = (props) => {
  const { username, token, email, avatar: avatarProps, dispatch } = props;
  const [url, setUrl] = useState(`http://localhost:8000${avatarProps}`);
  const [password, setPassword] = useState('');
  const [newUsername, setNewUsername] = useState(username);
  const [retype, setRetype] = useState('');
  const [avatar, setAvatar] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const classes = useStyles();

  const handleChangeUsername = (event) => {
    event.preventDefault();
    setNewUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const handleRetype = (event) => {
    event.preventDefault();
    setRetype(event.target.value);
  };

  const handleUploadAvatar = (event) => {
    event.preventDefault();
    setAvatar(event.target.files[0]);
    setUrl(URL.createObjectURL(event.target.files[0]));
  };

  const check = () => {
    return !(password === retype);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('email', email);
    data.append('username', newUsername);
    data.append('password', password);
    data.append('avatar', avatar);
    fetch('http://localhost:8000/users/update/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Update failed, please try again!');
        } else {
          return res.json();
        }
      })
      .then((json) => {
        window.localStorage.setItem('username', json.username);
        window.localStorage.setItem('avatar', json.avatar);
        dispatch(toggleLogin(email, token, json.username, json.avatar));
        setSeverity('success');
        setOpen(true);
        setMessage('Update successful!');
        window.location.replace(`/profile/${json.username}`);
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
    <Paper className={classes.root}>
      <Typography className={classes.title}>Edit Profile</Typography>
      <Typography className={classes.typography} style={{ marginTop: '1rem' }}>
        Change Avatar
      </Typography>
      {avatarProps !== '' ? (
        <img className={classes.avatar} src={url} alt="profile" />
      ) : (
        <div />
      )}
      <label htmlFor="avatar-upload">
        <input
          className={classes.input}
          type="file"
          id="avatar-upload"
          onChange={handleUploadAvatar}
        />
        <Button className={classes.button} variant="contained" component="span">
          Upload Image
        </Button>
      </label>
      <Typography className={classes.typography}>Change Credentials</Typography>
      <TextField
        className={classes.textField}
        label="Username"
        variant="outlined"
        rowsMax={1}
        defaultValue={newUsername}
        onChange={handleChangeUsername}
      />
      <TextField
        className={classes.textField}
        label="New Password"
        variant="outlined"
        type="password"
        rowsMax={1}
        defaultValue={password}
        onChange={handleChangePassword}
      />
      <TextField
        className={classes.textField}
        label="Retype New Password"
        variant="outlined"
        type="password"
        rowsMax={1}
        defaultValue={retype}
        onChange={handleRetype}
      />
      <Button
        className={classes.button}
        variant="contained"
        disabled={check()}
        onClick={handleSubmit}
      >
        Save Changes
      </Button>
      <Notification
        open={open}
        handleClose={handleClose}
        severity={severity}
        message={message}
      />
    </Paper>
  );
};

Profile.propTypes = {
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    username: state.username,
    token: state.token,
    email: state.email,
    avatar: state.avatar,
  };
};

export default connect(mapStateToProps)(Profile);
