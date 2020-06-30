import {
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../images/logov2light.png';
import { light, dark } from '../colors';
import '../css/navbar.css';

const useStyles = makeStyles({
  root: {
    backgroundColor: dark,
    position: 'relative',
    zIndex: 1400,
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
    color: light,
  },
  avatar: {
    borderRadius: '50%',
    width: '3rem',
    height: '3rem',
  },
});

const Navbar = (props) => {
  const { isLoggedIn, toggleDrawer, username, avatar } = props;
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <div className="left">
            <Link to="/">
              <Button color="inherit" className={classes.button}>
                <img src={Logo} alt="logo" />
              </Button>
            </Link>
          </div>
          <div className="right">
            {JSON.parse(isLoggedIn) ? (
              <Button
                color="inherit"
                className={classes.button}
                onClick={toggleDrawer}
              >
                <img
                  className={classes.avatar}
                  src={`http://localhost:8000${avatar}`}
                  alt="profile"
                />
                <Typography>{username}</Typography>
              </Button>
            ) : (
              <Link to="/login">
                <Button color="inherit" className={classes.button}>
                  Login
                </Button>
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  isLoggedIn: PropTypes.string.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    username: state.username,
    avatar: state.avatar,
  };
};

export default connect(mapStateToProps)(Navbar);
