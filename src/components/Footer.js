import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { light } from '../Colors';

const useStyles = makeStyles(() => ({
  footer: {
    boxSizing: 'border-box',
    width: '100%',
    position: 'relative',
    backgroundColor: 'transparent',
    color: light,
    textAlign: 'center',
    marginTop: '50px',
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography>&copy; Copyright 2020</Typography>
      <Typography>Made by Audrey Felicio Anwar & Fidella Widjojo</Typography>
    </footer>
  );
};

export default Footer;
