import React from 'react';
import { makeStyles, Button, Paper, Typography } from '@material-ui/core';
import { light } from '../colors';

const useStyles = makeStyles(() => ({
  root: {},
  button: {
    backgroundColor: `${light}`,
    border: 0,
    padding: 0,
  },
  buttonInside: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '12rem',
    height: '12rem',
    width: '13vw',
  },
  buttonTitle: {
    fontWeight: 'bold',
    overflowWrap: 'break-word',
    maxHeight: '3rem',
    overflow: 'auto',
  },
  paper: {
    backgroundColor: `${light}`,
    overflowWrap: 'break-word',
    overflow: 'auto',
  },
}));

const NotesTile = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button variant="outlined" className={classes.button}>
        <div className={classes.buttonInside}>
          <div className={classes.buttonTitle}>Title</div>
          <Paper square className={classes.paper}>
            <Typography>Insert text notes here!</Typography>
          </Paper>
        </div>
      </Button>
    </div>
  );
};

export default NotesTile;
