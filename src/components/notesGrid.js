import React, { useState, useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NotesTile from './notesTile';

const useStyles = makeStyles(() => ({
  grid: {
    width: 'max-content',
  },
}));

const NotesGrid = (props) => {
  const { token, username } = props;
  const [count, setCount] = useState(0);
  const [notes, setNotes] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    fetch(`http://localhost:8000/upload/get/note/${username}/CS1101S`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        const newNotes = [];
        let newCount = 0;
        json.forEach((element) => {
          const details = {};
          details.title = element.fields.title;
          details.text = element.fields.text;
          details.id = newCount;
          newNotes.push(details);
          newCount += 1;
        });
        setNotes(newNotes);
        setCount(newCount);
      });
  }, []);
  return (
    <Grid container direction="column" className={classes.grid}>
      {notes.map((element) => {
        return (
          <NotesTile
            key={element.id}
            title={element.title}
            text={element.text}
          />
        );
      })}
    </Grid>
  );
};

NotesGrid.propTypes = {
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
    username: state.username,
  };
};

export default connect(mapStateToProps)(NotesGrid);
