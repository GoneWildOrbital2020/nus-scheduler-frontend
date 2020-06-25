import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { GitHub, ExitToApp, Backup } from '@material-ui/icons';
import { toggleLogout } from '../redux/actions';
import { dark, light } from '../colors';

const DrawerList = ({ dispatch, token, username }) => {
  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.setItem('token', null);
    window.localStorage.setItem('username', null);
    window.localStorage.setItem('isLoggedIn', false);
    dispatch(toggleLogout());
    window.location.replace('/login');
  };

  const handleUpload = (event) => {
    event.preventDefault();
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(e.target.result);
      fetch(`http://localhost:8000/events/nusmod/${username}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ics: e.target.result }),
      });
      window.location.reload();
    };
    reader.readAsText(event.target.files[0]);
  };
  return (
    <List style={{ backgroundColor: light }}>
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
