import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
} from '@material-ui/core';
import {
  AccountCircle,
  Label,
  GitHub,
  ExitToApp,
  Backup,
  ExpandLess,
  ExpandMore,
  Event,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { toggleLogout } from '../redux/actions';
import { dark, light } from '../colors';
import { url } from './constant';
import Notification from './notification';

const DrawerList = ({ dispatch, token, username }) => {
  const [open, setOpen] = React.useState(false);
  const [titles, setTitles] = React.useState([]);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState('success');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.setItem('token', null);
    window.localStorage.setItem('username', null);
    window.localStorage.setItem('isLoggedIn', false);
    window.localStorage.setItem('email', null);
    window.localStorage.setItem('avatar', null);
    dispatch(toggleLogout());
    window.location.replace('/login');
  };

  const handleUpload = (event) => {
    event.preventDefault();
    const reader = new FileReader();
    reader.onload = (e) => {
      fetch(`${url}/events/nusmod/${username}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ics: e.target.result }),
      }).catch(() => {
        setSeverity('error');
        setOpenAlert(true);
        setMessage('Failed to upload calendar!');
      });
      window.location.reload();
    };
    reader.readAsText(event.target.files[0]);
  };

  const fetchTitles = fetch(`${url}/events/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  React.useEffect(() => {
    fetchTitles
      .then((response) => response.json())
      .then((data) => setTitles(data.map((x) => x.fields.name)))
      .catch(() => {
        setSeverity('error');
        setOpenAlert(true);
        setMessage('Failed to fetch event groups!');
      });
  }, []);

  return (
    <List style={{ backgroundColor: light }}>
      <Link to={`/profile/${username}`}>
        <ListItem button divider>
          <ListItemIcon>
            <AccountCircle style={{ color: dark }} />
          </ListItemIcon>
          <ListItemText primary="Profile" style={{ color: dark }} />
        </ListItem>
      </Link>
      <ListItem onClick={() => setOpen((state) => !state)} button>
        <ListItemIcon>
          <Event style={{ color: dark }} />
        </ListItemIcon>
        <ListItemText primary="Event Groups" style={{ color: dark }} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {titles.map((title) => (
          <List component="div" disablePadding>
            <Link to={`/event-group/${title}/customize`}>
              <ListItem button style={{ paddingLeft: '2rem' }}>
                <ListItemIcon>
                  <Label style={{ color: dark }} />
                </ListItemIcon>
                <ListItemText primary={title} style={{ color: dark }} />
              </ListItem>
            </Link>
          </List>
        ))}
      </Collapse>
      <Divider />
      <ListItem button divider component="label">
        <ListItemIcon>
          <Backup style={{ color: dark }} />
        </ListItemIcon>
        <ListItemText
          primary="Upload Nusmod Schedule"
          style={{ color: dark }}
        />
        <input
          type="file"
          style={{ display: 'none' }}
          accept=".ics"
          onChange={handleUpload}
        />
      </ListItem>
      <ListItem onClick={handleLogout} button divider>
        <ListItemIcon>
          <ExitToApp style={{ color: dark }} />
        </ListItemIcon>
        <ListItemText primary="Logout" style={{ color: dark }} />
      </ListItem>
      <ListItem
        onClick={() => window.open('https://github.com/GoneWildOrbital2020')}
        button
        divider
      >
        <ListItemIcon>
          <GitHub style={{ color: dark }} />
        </ListItemIcon>
        <ListItemText primary="Source" style={{ color: dark }} />
      </ListItem>
      <Notification
        open={openAlert}
        handleClose={handleClose}
        severity={severity}
        message={message}
      />
    </List>
  );
};

DrawerList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
    username: state.username,
  };
};

export default connect(mapStateToProps)(DrawerList);
