import React, { useState, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Typography, makeStyles, IconButton } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { connect } from 'react-redux';
import {
  changeActiveMonth,
  changeActiveDate,
  changeActiveYear,
  addNumOfEvents,
} from '../redux/Actions';
import { monthProperties, url } from './Constant';
import Month from './Month';
import { light } from '../Colors';
import Notification from './Notification';

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
  inside: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Calendar = ({
  activeMonth,
  activeYear,
  numOfEvents,
  username,
  dispatch,
  token,
  isLoggedIn,
  ...routerProps
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [openDialog, setOpenDialog] = useState(false);
  const [date, setDate] = useState(new Date());
  const { location } = routerProps;
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = (event) => {
    event.preventDefault();
    setOpenDialog(true);
  };

  const handleChangeDate = (currDate) => {
    const month = currDate.getUTCMonth();
    const year = currDate.getUTCFullYear();
    dispatch(changeActiveDate(year, month));
  };

  const fetchNumOfEvents = async () => {
    const response = await fetch(`${url}/calendars/${activeYear}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch event count!');
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
  }, [activeYear]);

  useEffect(() => {
    if (location.state && location.state.fromLogin) {
      setSeverity('success');
      setOpen(true);
      setMessage('Login successful!');
    } else if (location.state && location.state.fromAuthenticate) {
      setSeverity('success');
      setOpen(true);
      setMessage('Account activation successful!');
    }
  }, []);

  if (!JSON.parse(isLoggedIn)) {
    return <Redirect to="/login" />;
  }

  const clickLeft = () => {
    if (activeMonth === 0) {
      dispatch(changeActiveYear(activeYear - 1));
    }
    dispatch(changeActiveMonth(-1));
  };

  const clickRight = () => {
    if (activeMonth === 11) {
      dispatch(changeActiveYear(activeYear + 1));
    }
    dispatch(changeActiveMonth(1));
  };

  return (
    <div className={classes.calendarContainer}>
      <div className={classes.headContainer}>
        <IconButton onClick={clickLeft}>
          <ArrowLeftIcon
            fontSize="large"
            style={{ color: light, marginTop: '2rem' }}
          />
        </IconButton>
        <Button onClick={handleOpenDialog}>
          <div className={classes.inside}>
            <Typography
              variant="h4"
              style={{
                color: light,
              }}
            >
              {activeYear}
            </Typography>
            <Typography variant="h2" style={{ color: light }}>
              {monthProperties[activeMonth].name}
            </Typography>
          </div>
        </Button>
        <DatePicker
          views={['year', 'month']}
          variant="dialog"
          openTo="year"
          value={date}
          onChange={setDate}
          onClose={handleCloseDialog}
          onAccept={handleChangeDate}
          open={openDialog}
          TextFieldComponent={() => <></>}
        />
        <IconButton onClick={clickRight}>
          <ArrowRightIcon
            fontSize="large"
            style={{ color: light, marginTop: '2rem' }}
          />
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
  activeYear: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  activeMonth: state.activeMonth,
  activeYear: state.activeYear,
  numOfEvents: state.numOfEvents,
  username: state.username,
  token: state.token,
  isLoggedIn: state.isLoggedIn,
});

export default withRouter(connect(mapStateToProps)(Calendar));
