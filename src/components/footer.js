import React from 'react';
import { makeStyles } from '@material-ui/core';
import { light } from '../colors';

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
      <p>&copy; Copyright 2020</p>
      <p>Made by Audrey Felicio Anwar & Fidella Widjojo</p>
    </footer>
  );
};

export default Footer;
