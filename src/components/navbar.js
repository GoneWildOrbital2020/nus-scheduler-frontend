import { AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';
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
          <div className="left">
            <Link to="/">
              <Button color="inherit" className={classes.button}>
                <img src={Logo} alt="logo" />
              </Button>
            </Link>
          </div>
          <div className="right">
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
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
