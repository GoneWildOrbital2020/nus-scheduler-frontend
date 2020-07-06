import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DayButton from './DayButton';
import DayDialog from './TABDayDialog';
import { url } from '../constant';
import Notification from '../notification';

const DayTile = ({ index, username, activeMonth, activeYear, token }) => {
  const [currEvents, setCurrEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const fetchEvents = async (year, month, day) => {
    const response = await fetch(
      `${url}/calendars/${username}/${year}/${month}/${day}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) throw new Error('Failed to fetch events!');
    const json = await response.json();
    return json.map((data) => data.fields);
  };

  const saveEventsToDB = (year, month, day, events) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ events }),
    };
    fetch(`${url}/calendars/${username}/${year}/${month}/${day}`, options)
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

  React.useEffect(() => {
    const getEvents = () => {
      fetchEvents(activeYear, activeMonth, index)
        .then((data) => {
          setCurrEvents(data);
        })
        .catch((err) => {
          setCurrEvents([]);
          setSeverity('error');
          setOpen(true);
          setMessage(err.message);
        });
    };
    getEvents();
  }, [activeMonth, activeYear]);

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
  );
};

DayTile.propTypes = {
  index: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  activeMonth: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  activeYear: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  activeMonth: state.activeMonth,
  activeYear: state.activeYear,
  username: state.username,
  token: state.token,
});

export default connect(mapStateToProps)(DayTile);
