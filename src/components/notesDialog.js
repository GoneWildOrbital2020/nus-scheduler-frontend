import React, { useState } from 'react';
import {
  Dialog,
  Typography,
  DialogTitle,
  makeStyles,
  TextField,
  Button,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';
import { light, medium, accent, dark } from '../colors';

const useStyles = makeStyles(() => ({
  title: {
    backgroundColor: light,
    color: dark,
    padding: '2rem',
    paddingBottom: '0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  inside: {
    backgroundColor: light,
    padding: '2rem',
    paddingTop: '1rem',
  },
  textField: {
    width: '100%',
    color: accent,
    // marginTop: '1rem',
    marginBottom: '1rem',
  },
  typography: {},
  buttons: {
    display: 'flex',
    float: 'right',
  },
  button: {
    color: light,
  },
  closeButton: {
    float: 'right',
    padding: '6px',
  },
}));

const NotesDialog = (props) => {
  const {
    open,
    handleClose,
    text,
    title,
    identifier,
    upload,
    deleteNote,
  } = props;
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

  const handleSave = (event) => {
    event.preventDefault();
    upload(identifier, newTitle, newText);
    handleClose();
  };

  const handleDelete = (event) => {
    event.preventDefault();
    deleteNote(identifier);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth="lg"
      style={{ zIndex: 1500 }}
    >
      <div className={classes.title}>
        <Typography variant="h5">{newTitle}</Typography>
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.inside}>
        <Typography variant="body2" className={classes.typography}>
          Title:
        </Typography>
        <TextField
          variant="outlined"
          defaultValue={newTitle}
          rowsMax={1}
          className={classes.textField}
          onChange={handleChangeTitle}
        />
        <Typography variant="body2" className={classes.typography}>
          Text:
        </Typography>
        <TextField
          variant="outlined"
          defaultValue={newText}
          multiline
          rows={20}
          className={classes.textField}
          onChange={handleChangeText}
        />
        <div className={classes.buttons}>
          <Button
            className={classes.button}
            variant="contained"
            style={{ backgroundColor: accent, marginRight: '10px' }}
            onClick={handleDelete}
          >
            Delete Note
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            style={{ backgroundColor: accent }}
            onClick={handleSave}
          >
            Save changes
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

NotesDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  identifier: PropTypes.number.isRequired,
  upload: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
};

export default NotesDialog;
