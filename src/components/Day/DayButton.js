import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import { LabelImportant } from '@material-ui/icons';
import { light } from '../../colors';
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
      style={{ backgroundColor: light }}
      onClick={handleOpen}
    >
      <div className="buttonNumber">{index}</div>
      <div className="buttonEvents">
        {events.map((event) => (
          <div key={event.index} className="buttonEvent">
            <LabelImportant
              style={{ color: event.color, marginRight: '0.5rem' }}
            />
            <Typography style={{ color: event.color, textAlign: 'left' }}>
              {event.title}
            </Typography>
          </div>
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
