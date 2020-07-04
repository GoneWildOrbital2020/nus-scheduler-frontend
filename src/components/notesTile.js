import React from 'react';
import { makeStyles, Button, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { light } from '../colors';

const useStyles = makeStyles(() => ({
  button: {
    border: 0,
    padding: 0,
    margin: '1rem',
  },
  buttonInside: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '20rem',
    height: '20rem',
    width: 'calc((85vw - 10rem) / 4)',
  },
  buttonTitle: {
    fontWeight: 'bold',
    overflowWrap: 'break-word',
    maxHeight: '3rem',
    height: '2rem',
    overflow: 'auto',
  },
  typography: {
    backgroundColor: `${light}`,
    overflowWrap: 'break-word',
    overflow: 'auto',
    maxHeight: '10rem',
  },
}));

const NotesTile = (props) => {
  const { title, text, handleOpen } = props;
  const classes = useStyles();
  return (
    <Button
      variant="outlined"
      className={classes.button}
      style={{ backgroundColor: light }}
      onClick={handleOpen}
    >
      <div className={classes.buttonInside}>
        <div className={classes.buttonTitle}>{title}</div>
        <Typography className={classes.typography}>{text}</Typography>
      </div>
    </Button>
  );
};

NotesTile.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default NotesTile;
