import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DayButton from './DayButton';
import DayDialog from './TABDayDialog';
import { url } from '../constant';

const fetchEvents = async (token, username, month, day) => {
  const response = await fetch(`${url}/calendars/${username}/${month}/${day}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Can't fetch data");
  const json = await response.json();
  return json.map((data) => data.fields);
};

const saveEventsToDB = (token, username, month, day, events) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ events }),
  };
  fetch(`${url}/calendars/${username}/${month}/${day}`, options);
};

const DayTile = ({ index, username, activeMonth, token }) => {
  const [events, setEvents] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const getEvents = () => {
      fetchEvents(token, username, activeMonth, index)
        .then((data) => setEvents(data))
        .catch(() => {
          setEvents([]);
        });
    };
    getEvents();
  }, [activeMonth]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveEvents = (e) => {
    saveEventsToDB(token, username, activeMonth, index, e);
    setEvents(e);
  };
  return (
    <>
      <DayButton index={index} events={events} handleOpen={handleOpen} />
      <DayDialog
        events={events}
        saveEvents={saveEvents}
        handleClose={handleClose}
        open={open}
      />
    </>
  );
};

DayTile.propTypes = {
  index: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  activeMonth: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  activeMonth: state.activeMonth,
  username: state.username,
  token: state.token,
});

export default connect(mapStateToProps)(DayTile);
