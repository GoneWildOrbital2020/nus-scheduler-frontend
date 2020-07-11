import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { toggleLogout } from '../redux/actions';
import { light, dark } from '../colors';

const useStyles = makeStyles(() => ({
  dialog: {
    backgroundColor: light,
    color: dark,
  },
  button: {
    color: light,
  },
}));

const AutomaticLogout = (props) => {
  const { logoutTime, dispatch } = props;
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClose = (event) => {
    event.preventDefault();
    setOpen(false);
    window.localStorage.setItem('token', null);
    window.localStorage.setItem('username', null);
    window.localStorage.setItem('isLoggedIn', false);
    window.localStorage.setItem('email', null);
    window.localStorage.setItem('avatar', null);
    window.localStorage.setItem('logoutTime', null);
    dispatch(toggleLogout());
    window.location.replace('/login');
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const check = setInterval(() => {
      if (logoutTime <= Date.now()) {
        handleOpen();
      }
    }, 1000);
    return () => clearInterval(check);
  }, []);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent className={classes.dialog}>
        <Typography>Your session has expired, please login again!</Typography>
      </DialogContent>
      <DialogActions style={{ backgroundColor: light }}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleClose}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AutomaticLogout.propTypes = {
  logoutTime: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    logoutTime: state.logoutTime,
  };
};

export default connect(mapStateToProps)(AutomaticLogout);
