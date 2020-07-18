/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DayButton from './DayButton';
import DayDialog from './TABDayDialog';
import { url } from '../constant';
import Notification from '../notification';

const DayTile = ({ index, token, propEvents, activeMonth, activeYear }) => {
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState('success');
  const [currEvents, setCurrEvents] = React.useState(
    propEvents.map((event) => {
      const start = new Date();
      if (event.start) {
        start.setHours(event.start.substring(0, 2));
        start.setMinutes(event.start.substring(3, 5));
      }
      const end = new Date();
      if (event.end) {
        end.setHours(event.end.substring(0, 2));
        end.setMinutes(event.end.substring(3, 5));
      }
      return { ...event, start, end };
    }),
  );

  React.useEffect(
    () =>
      setCurrEvents(
        propEvents.map((event) => {
          let start = null;
          if (event.start) {
            console.log(event.start);
            start = new Date(event.start);
          }
          let end = null;
          if (event.end) {
            end = new Date(event.end);
          }
          return { ...event, start, end };
        }),
      ),
    [propEvents],
  );

  const saveEventsToDB = (year, month, day, events) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ events }),
    };
    fetch(`${url}/calendars/${year}/${month}/${day}`, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to save changes!');
        } else {
          setSeverity('success');
          setOpenAlert(true);
          setMessage('Save changes successful!');
        }
      })
      .catch((err) => {
        setSeverity('error');
        setOpenAlert(true);
        setMessage(err.message);
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const saveEvents = (e) => {
    saveEventsToDB(activeYear, activeMonth, index, e);
    setCurrEvents(e);
  };
  return (
    <>
      <>
        <DayButton index={index} events={currEvents} handleOpen={handleOpen} />
        <DayDialog
          events={currEvents}
          saveEvents={saveEvents}
          handleClose={handleClose}
          open={open}
        />
        <Notification
          open={openAlert}
          handleClose={handleCloseAlert}
          severity={severity}
          message={message}
        />
      </>
    </>
  );
};

DayTile.propTypes = {
  index: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  activeMonth: PropTypes.number.isRequired,
  activeYear: PropTypes.number.isRequired,
  propEvents: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.int,
      color: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      start: PropTypes.string,
      end: PropTypes.string,
      location: PropTypes.string,
    }),
  ),
};

DayTile.defaultProps = {
  propEvents: [],
};

const mapStateToProps = (state) => ({
  activeMonth: state.activeMonth,
  activeYear: state.activeYear,
  token: state.token,
});

export default connect(mapStateToProps)(DayTile);
