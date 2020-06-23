import React, { useState, useEffect } from 'react';
import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Notes from './notes';
import { dark, accent, light } from '../colors';

const useStyles = makeStyles(() => ({
  top: {
    height: '6rem',
    maxHeight: '6rem',
  },
  title: {
    display: 'inline-block',
    color: dark,
    fontSize: '3rem',
    fontWeight: 'bold',
  },
  grid: {
    width: 'max-content',
  },
  button: {
    position: 'absolute',
    right: 0,
    display: 'inline-block',
    fontSize: '2rem',
    backgroundColor: accent,
    color: light,
  },
}));

const NotesGrid = (props) => {
  const { token, username } = props;
  const [count, setCount] = useState(0);
  const [notes, setNotes] = useState([]);
  const [rows, setRows] = useState([0]);
  const classes = useStyles();

  const generateRows = () => {
    let rowCount = 0;
    if (count % 4 === 0) {
      rowCount = count / 4;
    } else {
      rowCount = count / 4 + 1;
    }
    const newRows = [];
    for (let i = 0; i < rowCount; i += 1) {
      newRows.push(i);
    }
    setRows(newRows);
  };

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
        setCount(newCount + 1);
      });
  }, []);

  useEffect(() => {
    generateRows();
  }, [count]);

  return (
    <>
      <div className={classes.top}>
        <Typography className={classes.title}>Notes</Typography>
        <Button variant="outlined" className={classes.button}>
          Add Notes
        </Button>
      </div>
      <Grid container direction="column" className={classes.grid}>
        {rows.map((element) => {
          const sliced = notes.slice(element * 4, (element + 1) * 4);
          return (
            <Grid container item className={classes.grid}>
              {sliced.map((obj) => {
                return (
                  <Notes
                    index={obj.id}
                    key={obj.id}
                    title={obj.title}
                    text={obj.text}
                  />
                );
              })}
            </Grid>
          );
        })}
      </Grid>
    </>
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
