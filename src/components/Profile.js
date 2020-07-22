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
import { light, dark } from '../Colors';
import Notification from './Notification';
import { toggleLogin } from '../redux/Actions';
import { url, fileUrl } from './Constant';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: light,
    margin: '2rem auto',
    width: '300px',
    [theme.breakpoints.down('xs')]: {
      width: '230px',
    },
    textAlign: 'center',
    padding: '2rem',
    display: 'inline-block',
  },
  title: {
    color: dark,
  },
  typography: {
    color: dark,
    marginTop: '2rem',
  },
  button: {
    width: '100%',
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
  const [imageUrl, setImageUrl] = useState(`${avatarProps}`);
  const [password, setPassword] = useState('');
  const [newUsername, setNewUsername] = useState(username);
  const [retype, setRetype] = useState('');
  const [avatar, setAvatar] = useState(null);
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
    setImageUrl(URL.createObjectURL(event.target.files[0]));
  };

  const check = () => {
    return !(password === retype);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('email', email);
    data.append('username', newUsername);
    if (avatar !== null) {
      data.append('avatar', avatar);
    }
    if (password !== '') {
      data.append('password', password);
    }
    fetch(`${url}/users/update/`, {
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
        window.localStorage.setItem('username', json[0].fields.username);
        if (json[0].fields.avatar) {
          window.localStorage.setItem(
            'avatar',
            `${fileUrl}/media/${json[0].fields.avatar}`,
          );
        }
        dispatch(
          toggleLogin(
            email,
            token,
            json[0].fields.username,
            `${fileUrl}/media/${json[0].fields.avatar}`,
          ),
        );
        setSeverity('success');
        setOpen(true);
        setMessage('Update successful!');
        window.location.replace(`/profile`);
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
      <Typography variant="h4" className={classes.title}>
        Edit Profile
      </Typography>
      <Typography
        variant="body2"
        className={classes.typography}
        style={{ marginTop: '1rem' }}
      >
        Change Avatar
      </Typography>
      {imageUrl !== `${url}` ? (
        <img className={classes.avatar} src={imageUrl} alt="profile" />
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
        <Button
          className={classes.button}
          component="span"
          variant="contained"
          color="primary"
        >
          Upload Image
        </Button>
      </label>
      <Typography variant="body2" className={classes.typography}>
        Change Credentials
      </Typography>
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
        color="primary"
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
