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
  Dialog,
  DialogContent,
  TextField,
  Typography,
  IconButton,
  DialogActions,
  Button,
  makeStyles,
} from '@material-ui/core';
import {
  AccountCircle,
  Create,
  Label,
  GitHub,
  ExitToApp,
  Backup,
  ExpandLess,
  ExpandMore,
  Event,
  Close,
} from '@material-ui/icons';
import { Link, withRouter } from 'react-router-dom';
import { toggleLogout } from '../redux/Actions';
import { dark, light } from '../Colors';
import { url } from './Constant';
import Notification from './Notification';

const useStyles = makeStyles(() => ({
  button: {
    color: light,
    marginLeft: '1rem',
  },
}));

const DrawerList = ({ dispatch, token, username, ...routeProps }) => {
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [titles, setTitles] = React.useState([]);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState('success');
  const { history } = routeProps;

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
    window.localStorage.setItem('logoutTime', null);
    dispatch(toggleLogout());
    history.push('/login');
  };

  const classes = useStyles();

  const handleUpload = (event) => {
    event.preventDefault();
    const reader = new FileReader();
    reader.onload = (e) => {
      fetch(`${url}/events/nusmod/`, {
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

  const fetchTitles = () =>
    fetch(`${url}/events/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

  const [name, setName] = React.useState('');

  const handleAdd = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name }),
    };
    fetch(`${url}/events/`, options);
    history.push(`/events-group/${name}/customize`);
  };

  React.useEffect(() => {
    fetchTitles()
      .then((response) => response.json())
      .then((data) => setTitles(data.map((x) => x.fields.name)))
      .catch(() => {
        setSeverity('error');
        setOpenAlert(true);
        setMessage('Failed to fetch event groups!');
      });
  }, []);

  return (
    <>
      <List style={{ backgroundColor: light }}>
        <Link to="/profile">
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
          <ListItemText primary="Events Groups" style={{ color: dark }} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {titles.map((title) => (
            <List component="div" disablePadding>
              <Link to={`/events-group/${title}/customize`}>
                <ListItem button style={{ paddingLeft: '2rem' }}>
                  <ListItemIcon>
                    <Label style={{ color: dark }} />
                  </ListItemIcon>
                  <ListItemText primary={title} style={{ color: dark }} />
                </ListItem>
              </Link>
            </List>
          ))}
          <List component="div" disablePadding>
            <ListItem
              button
              style={{ paddingLeft: '2rem' }}
              onClick={() => setOpenModal(true)}
            >
              <ListItemIcon>
                <Create style={{ color: dark }} />
              </ListItemIcon>
              <ListItemText primary="Add new group" style={{ color: dark }} />
            </ListItem>
          </List>
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
          <ListItemText primary="Log Out" style={{ color: dark }} />
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
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        style={{ zIndex: 1401 }}
      >
        <div
          style={{
            backgroundColor: light,
            color: dark,
            display: 'flex',
            justifyContent: 'space-between',
            padding: '2rem 1.5rem 0.5rem 1.5rem',
          }}
        >
          <Typography variant="h5" style={{ color: dark }}>
            Add Event Group
          </Typography>
          <IconButton
            onClick={() => setOpenModal(false)}
            style={{ paddingTop: 0, paddingRight: 0 }}
          >
            <Close />
          </IconButton>
        </div>
        <DialogContent style={{ backgroundColor: light }}>
          <Typography
            variant="body2"
            style={{ marginTop: '1rem', color: dark }}
          >
            Name:
          </Typography>
          <TextField
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions style={{ backgroundColor: light, padding: '1.5rem' }}>
          <Button
            onClick={handleAdd}
            className={classes.button}
            variant="contained"
            color="primary"
            disabled={name === ''}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
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

export default withRouter(connect(mapStateToProps)(DrawerList));
