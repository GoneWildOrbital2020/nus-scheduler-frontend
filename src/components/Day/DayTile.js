/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DayButton from './DayButton';
import DayDialog from './TABDayDialog';
import { url } from '../constant';
import Notification from '../notification';

const DayTile = ({ index, username, token, propEvents, activeMonth }) => {
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState('success');
  const [currEvents, setCurrEvents] = React.useState(propEvents);

  React.useEffect(() => setCurrEvents(propEvents), [propEvents]);

  const saveEventsToDB = (month, day, events) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ events }),
    };
    fetch(`${url}/calendars/${username}/${month}/${day}`, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to save changes, please try again!');
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
    saveEventsToDB(activeMonth, index, e);
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
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  activeMonth: PropTypes.number.isRequired,
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
  ).isRequired,
};

const mapStateToProps = (state) => ({
  activeMonth: state.activeMonth,
  username: state.username,
  token: state.token,
  isLoading: state.isLoading,
});

export default connect(mapStateToProps)(DayTile);
