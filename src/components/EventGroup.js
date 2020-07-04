import * as React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Toolbar,
} from '@material-ui/core';
import { Edit, Folder, Note } from '@material-ui/icons';
import { dark, light } from '../colors';
import Customize from './Customize';
import Upload from './upload';
import NotesGrid from './notesGrid';

const EventGroup = ({ name, path }) => {
  return (
    <>
      <Drawer variant="permanent" anchor="left">
        <Toolbar />
        <List>
          <Link to={`/events-group/${name}/customize`}>
            <ListItem button divider>
              <ListItemIcon>
                <Edit style={{ color: dark }} />
              </ListItemIcon>
              <ListItemText primary="Customize" style={{ color: dark }} />
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
        </List>
      </Drawer>
      <Typography
        style={{
          fontSize: '2rem',
          color: light,
          fontWeight: 'bold',
          width: '85%',
          float: 'right',
        }}
      >
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
      </Switch>
    </>
  );
};

EventGroup.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default EventGroup;
