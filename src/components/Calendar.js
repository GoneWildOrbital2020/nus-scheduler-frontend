import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Typography, makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { connect } from 'react-redux';
import { changeActiveMonth, addNumOfEvents } from '../redux/actions';
import { monthProperties, url } from './constant';
import Month from './Month';
import { light } from '../colors';
import Notification from './notification';

const useStyles = makeStyles(() => ({
  headContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  calendarContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Calendar = ({
  activeMonth,
  numOfEvents,
  username,
  dispatch,
  token,
  isLoggedIn,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const fetchNumOfEvents = async () => {
    const response = await fetch(`${url}/calendars/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok)
      throw new Error('Failed to fetch event count, please reload the page!');
    const json = await response.json();
    return json.count;
  };

  useEffect(() => {
    fetchNumOfEvents()
      .then((data) => dispatch(addNumOfEvents(data - numOfEvents)))
      .catch((err) => {
        setSeverity('error');
        setOpen(true);
        setMessage(err.message);
      });
  }, []);

  if (!JSON.parse(isLoggedIn)) {
    return <Redirect to="/login" />;
  }

  const clickLeft = () => dispatch(changeActiveMonth(-1));
  const clickRight = () => dispatch(changeActiveMonth(1));

  return (
    <div className={classes.calendarContainer}>
      <div className={classes.headContainer}>
        <IconButton onClick={clickLeft}>
          <ArrowLeftIcon fontSize="large" style={{ color: light }} />
        </IconButton>
        <Typography
          style={{ fontSize: '3rem', fontWeight: 'bold', color: light }}
        >
          {monthProperties[activeMonth].name}
        </Typography>
        <IconButton onClick={clickRight} style={{ color: light }}>
          <ArrowRightIcon fontSize="large" />
        </IconButton>
      </div>
      <Month />
      <Notification
        open={open}
        handleClose={handleClose}
        severity={severity}
        message={message}
      />
    </div>
  );
};

Calendar.propTypes = {
  activeMonth: PropTypes.number.isRequired,
  numOfEvents: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  activeMonth: state.activeMonth,
  numOfEvents: state.numOfEvents,
  username: state.username,
  token: state.token,
  isLoggedIn: state.isLoggedIn,
});

export default connect(mapStateToProps)(Calendar);
