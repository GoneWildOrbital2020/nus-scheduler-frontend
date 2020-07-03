import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, makeStyles } from '@material-ui/core';
import { LabelImportant } from '@material-ui/icons';
import { light } from '../../colors';

const useStyles = makeStyles(() => ({
  buttonRoot: {
    height: '12rem',
    width: '13vw',
    padding: '0',
    margin: '0.5rem',
  },
  buttonOutlined: {
    padding: '0',
    border: '0',
  },
  buttonContainer: {
    height: '12rem',
    display: 'flex',
    flexDirection: 'column',
  },
  buttonNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    flex: '1 1 0',
    paddingTop: '0',
  },
  buttonEvents: {
    flex: '4 1 0',
    overflow: 'auto',
    alignSelf: 'stretch',
    padding: '0 1rem',
  },
  buttonEvent: {
    fontSize: '1rem',
    overflow: 'hidden',
    textTransform: 'capitalize',
    display: 'flex',
  },
}));

const DayButton = ({ index, events, handleOpen }) => {
  const classes = useStyles();
  return (
    <Button
      variant="outlined"
      classes={{
        root: classes.buttonRoot,
        outlined: classes.buttonOutlined,
        label: classes.buttonContainer,
      }}
      style={{ backgroundColor: light }}
      onClick={handleOpen}
    >
      <div className={classes.buttonNumber}>{index}</div>
      <div className={classes.buttonEvents}>
        {events.map((event) => (
          <div key={event.index} className={classes.buttonEvent}>
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
