import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, makeStyles } from '@material-ui/core';
import { LabelImportant } from '@material-ui/icons';
import { light, dark } from '../../Colors';

const useStyles = makeStyles((theme) => ({
  buttonRoot: {
    height: '12rem',
    width: 'calc((100vw - 10rem)/7)',
    [theme.breakpoints.down('md')]: {
      width: 'calc((100vw - 7rem)/4)',
      height: '15rem',
    },
    [theme.breakpoints.down('sm')]: {
      width: 'calc((100vw - 5rem)/2)',
      height: '18rem',
    },
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100vw - 4rem)',
      height: '21rem',
    },
    padding: '0',
    margin: '0.5rem',
  },
  buttonOutlined: {
    padding: '0',
    border: '0',
  },
  buttonContainer: {
    height: '10rem',
    [theme.breakpoints.down('md')]: {
      height: '13rem',
    },
    [theme.breakpoints.down('sm')]: {
      height: '16rem',
    },
    [theme.breakpoints.down('xs')]: {
      height: '19rem',
    },
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem 0',
  },
  buttonNumber: {
    flex: '1 1 0',
    marginBottom: '1rem',
    color: dark,
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
      <Typography variant="h5" className={classes.buttonNumber}>
        {index}
      </Typography>
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
