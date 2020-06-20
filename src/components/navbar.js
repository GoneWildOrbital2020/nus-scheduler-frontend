import { AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../images/logo.png';
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
});

const Navbar = (props) => {
  const { isLoggedIn, toggleDrawer } = props;
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
                <MenuIcon style={{ color: light }} />
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
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps)(Navbar);
