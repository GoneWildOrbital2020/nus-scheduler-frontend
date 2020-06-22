import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { connect } from 'react-redux';
import { changeActiveMonth, addNumOfEvents } from '../redux/actions';
import { monthProperties, url } from './constant';
import Month from './Month';
import { dark } from '../colors';

import './Calendar.css';

const fetchNumOfEvents = async (token, username) => {
  const response = await fetch(`${url}/calendars/${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Can't fetch data");
  const json = await response.json();
  return json.count;
};

const Calendar = ({
  activeMonth,
  numOfEvents,
  username,
  dispatch,
  token,
  isLoggedIn,
}) => {
  if (!JSON.parse(isLoggedIn)) {
    return <Redirect to="/login" />;
  }
  const clickLeft = () => dispatch(changeActiveMonth(-1));
  const clickRight = () => dispatch(changeActiveMonth(1));

  fetchNumOfEvents(token, username).then((data) =>
    dispatch(addNumOfEvents(data - numOfEvents)),
  );

  return (
    <div className="calendarContainer">
      <div className="headContainer">
        <IconButton onClick={clickLeft}>
          <ArrowLeftIcon fontSize="large" style={{ color: dark }} />
        </IconButton>
        <Typography
          style={{ fontSize: '3rem', fontWeight: 'bold', color: dark }}
        >
          {monthProperties[activeMonth].name}
        </Typography>
        <IconButton onClick={clickRight} style={{ color: dark }}>
          <ArrowRightIcon fontSize="large" />
        </IconButton>
      </div>
      <Month />
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
