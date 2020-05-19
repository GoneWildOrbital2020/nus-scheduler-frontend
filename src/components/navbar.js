import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 0,
  },
  title: {
    color: 'white',
    flexGrow: 1,
    textAlign: 'left',
  },
  button: {
    color: 'white',
  },
});

const Navbar = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            NUS Scheduler
          </Typography>
          <Link to="/login">
            <Button color="inherit" className={classes.button}>
              Login
            </Button>
          </Link>
          <Button color="inherit" className={classes.button}>
            <a href="https://github.com/GoneWildOrbital2020/nus-scheduler-frontend">
              Source
            </a>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
