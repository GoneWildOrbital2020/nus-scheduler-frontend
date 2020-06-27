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

const EventGroup = ({ name, path }) => {
  return (
    <>
      <Drawer variant="permanent" anchor="left">
        <Toolbar />
        <List>
          <Link to={`/event-group/${name}/customize`}>
            <ListItem button divider>
              <ListItemIcon>
                <Edit style={{ color: dark }} />
              </ListItemIcon>
              <ListItemText primary="Customize" style={{ color: dark }} />
            </ListItem>
          </Link>
          <Link to={`/event-group/${name}/uploads`}>
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
          <Link to={`/event-group/${name}/notes`}>
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
        style={{ fontSize: '2rem', color: light, fontWeight: 'bold' }}
      >
        {name}
      </Typography>
      <Switch>
        <Route
          path={`${path}/customize`}
          render={() => <Customize name={name} />}
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
