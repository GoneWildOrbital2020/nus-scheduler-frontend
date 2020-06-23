import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NotesTile from './notesTile';
import NotesDialog from './notesDialog';

const Notes = (props) => {
  const { index, title, text } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <NotesTile
        index={index}
        title={title}
        text={text}
        handleOpen={handleOpen}
      />
      <NotesDialog
        handleClose={handleClose}
        open={open}
        title={title}
        text={text}
      />
    </>
  );
};

Notes.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Notes;
