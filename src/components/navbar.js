import { AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleLogout } from '../redux/actions';
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

const Navbar = (props) => {
  const { isLoggedIn } = props;
  const { ToggleLogout } = props;
  const classes = useStyles();
  const handleLogout = (event) => {
    event.preventDefault();
    ToggleLogout();
  };
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
            {isLoggedIn ? (
              <Button
                color="inherit"
                className={classes.button}
                onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button color="inherit" className={classes.button}>
                  Login
                </Button>
              </Link>
            )}
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

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  ToggleLogout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ToggleLogout: () => dispatch(toggleLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
