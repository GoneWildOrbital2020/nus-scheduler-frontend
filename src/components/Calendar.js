import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { connect } from 'react-redux';
import { changeActiveMonth, addNumOfEvents } from '../redux/actions';
import { monthProperties, url } from './constant';
import Month from './Month';

import './Calendar.css';

const fetchNumOfEvents = async (userId) => {
  const response = await fetch(`${url}/calendars/${userId}`);
  if (!response.ok) throw new Error("Can't fetch data");
  const json = await response.json();
  return json.count;
};

const Calendar = ({ activeMonth, numOfEvents, userId, dispatch }) => {
  const clickLeft = () => dispatch(changeActiveMonth(-1));
  const clickRight = () => dispatch(changeActiveMonth(1));

  fetchNumOfEvents(userId).then((data) =>
    dispatch(addNumOfEvents(data - numOfEvents)),
  );

  return (
    <div className="calendarContainer">
      <div className="headContainer">
        <IconButton onClick={clickLeft}>
          <ArrowLeftIcon fontSize="large" />
        </IconButton>
        <Typography style={{ fontSize: '3rem', fontWeight: 'bold' }}>
          {monthProperties[activeMonth].name}
        </Typography>
        <IconButton onClick={clickRight}>
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
  userId: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeMonth: state.activeMonth,
  numOfEvents: state.numOfEvents,
  userId: state.userId,
});

export default connect(mapStateToProps)(Calendar);
