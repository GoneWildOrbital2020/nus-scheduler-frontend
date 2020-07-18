import * as React from 'react';
import { Link, Switch, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  useMediaQuery,
  Typography,
  Toolbar,
} from '@material-ui/core';
import {
  Folder,
  Note,
  Delete,
  EventNote,
  Assignment,
} from '@material-ui/icons';
import { connect } from 'react-redux';
import { dark, light } from '../colors';
import Customize from './Customize';
import Upload from './upload';
import NotesGrid from './notesGrid';
import { url } from './constant';
import Tasks from './Tasks';

const useStyles = makeStyles((theme) => ({
  paperAnchorLeft: {
    backgroundColor: light,
    width: '15%',
    [theme.breakpoints.down('md')]: {
      width: '25%',
    },
  },
  typography: {
    marginTop: '2rem',
    // fontSize: '2rem',
    color: light,
    // fontWeight: 'bold',
    width: '85%',
    [theme.breakpoints.down('md')]: {
      width: '75%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    float: 'right',
  },
}));

const EventGroup = ({ name, path, username, token, ...routerProps }) => {
  const { history } = routerProps;
  const classes = useStyles();
  const extraSmall = useMediaQuery((theme) => theme.breakpoints.down('xs'));
  const handleDeleteGroup = () => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(`${url}/events/activity/${name}`, options);
    history.replace('/');
  };
  return !extraSmall ? (
    <>
      <Drawer
        variant="permanent"
        anchor="left"
        classes={{ paperAnchorLeft: classes.paperAnchorLeft }}
      >
        <Toolbar style={{ minHeight: '75px' }} />
        <List>
          <Link to={`/events-group/${name}/customize`}>
            <ListItem button divider>
              <ListItemIcon>
                <EventNote style={{ color: dark }} />
              </ListItemIcon>
              <ListItemText primary="Activities" style={{ color: dark }} />
            </ListItem>
          </Link>
          <Link to={`/events-group/${name}/uploads`}>
            <ListItem button divider>
              <ListItemIcon>
                <Folder style={{ color: dark }} />
              </ListItemIcon>
              <ListItemText
                primary="Files and Images"
                style={{ color: dark }}
              />
            </ListItem>
          </Link>
          <Link to={`/events-group/${name}/notes`}>
            <ListItem button divider>
              <ListItemIcon>
                <Note style={{ color: dark }} />
              </ListItemIcon>
              <ListItemText primary="Notes" style={{ color: dark }} />
            </ListItem>
          </Link>
          <Link to={`/events-group/${name}/tasks`}>
            <ListItem button divider>
              <ListItemIcon>
                <Assignment style={{ color: dark }} />
              </ListItemIcon>
              <ListItemText primary="Tasks" style={{ color: dark }} />
            </ListItem>
          </Link>
          <ListItem button divider onClick={handleDeleteGroup}>
            <ListItemIcon>
              <Delete style={{ color: dark }} />
            </ListItemIcon>
            <ListItemText
              primary="Delete Event Group"
              style={{ color: dark }}
            />
          </ListItem>
        </List>
      </Drawer>
      <Typography variant="h2" className={classes.typography}>
        {name}
      </Typography>
      <Switch>
        <Route
          path={`${path}/customize`}
          render={() => <Customize name={name} />}
        />
        <Route path={`${path}/uploads`} render={() => <Upload name={name} />} />
        <Route
          path={`${path}/notes`}
          render={() => <NotesGrid name={name} />}
        />
        <Route path={`${path}/tasks`} render={() => <Tasks name={name} />} />
      </Switch>
    </>
  ) : (
    <>
      <Typography variant="h2" className={classes.typography}>
        {name}
      </Typography>
      <Switch>
        <Route
          path={`${path}/customize`}
          render={() => <Customize name={name} />}
        />
        <Route path={`${path}/uploads`} render={() => <Upload name={name} />} />
        <Route
          path={`${path}/notes`}
          render={() => <NotesGrid name={name} />}
        />
        <Route path={`${path}/tasks`} render={() => <Tasks name={name} />} />
      </Switch>
    </>
  );
};

EventGroup.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.username,
  token: state.token,
});

export default withRouter(connect(mapStateToProps)(EventGroup));
