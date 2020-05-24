import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DayButton from './DayButton';
import DayDialog from './DayDialog';

const DayTile = ({ index, events: eventsProp }) => {
  const [events, setEvents] = useState(eventsProp);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveEvents = (e) => {
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

export default DayTile;

DayTile.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.int,
      color: PropTypes.string,
      title: PropTypes.string,
      desc: PropTypes.string,
      start: PropTypes.string,
      end: PropTypes.string,
      location: PropTypes.string,
    }),
  ),
  index: PropTypes.number.isRequired,
};

DayTile.defaultProps = {
  events: [],
};
