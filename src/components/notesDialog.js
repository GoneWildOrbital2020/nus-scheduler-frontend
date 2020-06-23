import React, { useState } from 'react';
import {
  Dialog,
  Typography,
  DialogTitle,
  makeStyles,
  TextField,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { light, medium, accent } from '../colors';

const useStyles = makeStyles(() => ({
  title: {
    backgroundColor: medium,
    color: light,
  },
  inside: {
    backgroundColor: light,
    padding: '2rem',
  },
  textField: {
    width: '100%',
    color: accent,
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  typography: {
    fontWeight: 'bold',
  },
}));

const NotesDialog = (props) => {
  const { open, handleClose, text, title } = props;
  const [newTitle, setNewTitle] = useState(title);
  const [newText, setNewText] = useState(text);
  const classes = useStyles();

  const handleChangeTitle = (event) => {
    event.preventDefault();
    setNewTitle(event.target.value);
  };

  const handleChangeText = (event) => {
    event.preventDefault();
    setNewText(event.target.value);
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="lg">
      <DialogTitle className={classes.title}>{newTitle}</DialogTitle>
      <div className={classes.inside}>
        <Typography className={classes.typography}>Title</Typography>
        <TextField
          variant="outlined"
          defaultValue={newTitle}
          rowsMax={1}
          className={classes.textField}
          onChange={handleChangeTitle}
        />
        <Typography className={classes.typography}>Text</Typography>
        <TextField
          variant="outlined"
          defaultValue={newText}
          multiline
          rows={20}
          className={classes.textField}
          onChange={handleChangeText}
        />
      </div>
    </Dialog>
  );
};

NotesDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NotesDialog;
