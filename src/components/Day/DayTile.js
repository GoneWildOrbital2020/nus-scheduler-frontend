import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DayButton from './DayButton';
import DayDialog from './TABDayDialog';
import { url } from '../constant';

const fetchEvents = async (userId, month, day) => {
  const response = await fetch(`${url}/calendars/${userId}/${month}/${day}`);
  if (!response.ok) throw new Error("Can't fetch data");
  const json = await response.json();
  return json.map((data) => data.fields);
};

const saveEventsToDB = (userId, month, day, events) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ events }),
  };
  fetch(`${url}/calendars/${userId}/${month}/${day}`, options);
};

const DayTile = ({ index, userId, activeMonth }) => {
  const [events, setEvents] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const getEvents = () => {
      fetchEvents(userId, activeMonth, index)
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
    saveEventsToDB(userId, activeMonth, index, e);
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
  userId: PropTypes.number.isRequired,
  activeMonth: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  activeMonth: state.activeMonth,
  userId: state.userId,
});

export default connect(mapStateToProps)(DayTile);
