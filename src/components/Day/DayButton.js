import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Button, Typography } from '@material-ui/core';
import './DayButton.css';

const DayButton = ({ index, events, handleOpen }) => {
  return (
    <Button
      variant="outlined"
      classes={{
        root: 'buttonRoot',
        outlined: 'buttonOutlined',
        label: 'buttonContainer',
      }}
      onClick={handleOpen}
    >
      <div className="buttonNumber">{index}</div>
      <div className="buttonEvents">
        {events.map((event) => (
          <Paper
            key={event.index}
            className="buttonEvent"
            square
            style={{ background: event.color }}
          >
            <Typography style={{ opacity: '50%', fontWeight: 550 }}>
              {event.title}
            </Typography>
          </Paper>
        ))}
      </div>
    </Button>
  );
};

export default DayButton;

DayButton.propTypes = {
  events: PropTypes.arrayOf(
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
  index: PropTypes.number.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

DayButton.defaultProps = {
  events: [],
};
