import React from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import '../css/login.css';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'relative',
  },
});

const Login = () => {
  const classes = useStyles();
  return (
    <div className="login">
      <div className="form">
        <form className={classes.root}>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </form>
      </div>
      <h1>Login page!</h1>
    </div>
  );
};

export default Login;
