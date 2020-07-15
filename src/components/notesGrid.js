import React, { useState, useEffect } from 'react';
import {
  Grid,
  makeStyles,
  Typography,
  Button,
  useMediaQuery,
} from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Notes from './notes';
import { accent, light } from '../colors';
import Notification from './notification';
import { url } from './constant';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '85%',
    [theme.breakpoints.down('md')]: {
      width: '75%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    float: 'right',
  },
  top: {
    height: '4rem',
    maxHeight: '6rem',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: '8rem',
      height: '6.5rem',
    },
  },
  title: {
    display: 'inline-block',
    color: light,
    // fontSize: '2rem',
    // fontWeight: 'bold',
  },
  grid: {
    width: 'max-content',
    margin: '0 0.5rem',
  },
  button: {
    color: light,
    // width: '50%',
    margin: '0.5rem auto',
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      right: 0,
      display: 'inline-block',
      fontSize: '1rem',
      marginRight: '2rem',
      marginTop: '0.5rem',
    },
  },
}));

const NotesGrid = (props) => {
  const { token, username, name } = props;
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [notes, setNotes] = useState([]);
  const [rows, setRows] = useState([0]);
  const [itemsPerRow, setItemsPerRow] = useState(4);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const classes = useStyles();
  const medium = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const extraSmall = useMediaQuery((theme) => theme.breakpoints.down('xs'));

  const generateRows = (x) => {
    let rowCount = 0;
    if (count % x === 0) {
      rowCount = count / x;
    } else {
      rowCount = Math.floor(count / x) + 1;
    }
    const newRows = [];
    for (let i = 0; i < rowCount; i += 1) {
      newRows.push(i);
    }
    setRows(newRows);
    setItemsPerRow(x);
  };

  const uploadNoteToDB = (identifier, title, text) => {
    const data = {
      identifier,
      total,
      title,
      text,
    };
    fetch(`${url}/upload/note/${username}/${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status !== 201) {
          throw new Error('Failed to add notes!');
        } else {
          const newNotes = [...notes];
          newNotes.push({
            identifier,
            title,
            text,
          });
          setTotal(total + 1);
          setCount(count + 1);
          setNotes(newNotes);
          setSeverity('success');
          setOpen(true);
          setMessage('Add notes successful!');
        }
      })
      .catch((err) => {
        setSeverity('error');
        setOpen(true);
        setMessage(err.message);
      });
  };

  const editNote = (identifier, title, text) => {
    const data = {
      identifier,
      total,
      title,
      text,
    };
    fetch(`${url}/upload/note/${username}/${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error('Failed to save changes!');
        } else {
          setNotes(
            notes.map((element) => {
              if (element.identifier === identifier) {
                return {
                  identifier,
                  title,
                  text,
                };
              }
              return element;
            }),
          );
          setSeverity('success');
          setOpen(true);
          setMessage('Save changes successful!');
        }
      })
      .catch((err) => {
        setSeverity('error');
        setOpen(true);
        setMessage(err.message);
      });
  };

  const handleAddNote = (event) => {
    event.preventDefault();
    uploadNoteToDB(total + 1, 'New Note', '');
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const deleteNote = (identifier) => {
    const data = {
      identifier,
    };
    fetch(`${url}/upload/delete/note/${username}/${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Delete note failed!');
        } else {
          const newNotes = [...notes];
          const index = newNotes.findIndex(
            (element) => element.identifier === identifier,
          );
          if (index === -1) {
            throw new Error('Note not found!');
          }
          newNotes.splice(index, 1);
          setNotes(newNotes);
          setCount(count - 1);
          setSeverity('success');
          setOpen(true);
          setMessage('Delete note successful!');
        }
      })
      .catch((err) => {
        setSeverity('error');
        setOpen(true);
        setMessage(err.message);
      });
  };

  useEffect(() => {
    const getNotes = fetch(`${url}/upload/get/note/${username}/${name}`, {
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
        json.forEach((element) => {
          const details = {};
          details.title = element.fields.title;
          details.text = element.fields.text;
          details.identifier = element.fields.identifier;
          newNotes.push(details);
        });
        newNotes.sort((a, b) => a.identifier - b.identifier);
        return newNotes;
      });

    const getTotal = fetch(`${url}/upload/get/totalnotes/${username}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    Promise.all([getNotes, getTotal])
      .then((values) => {
        setCount(values[0].length);
        setTotal(values[1].total);
        setNotes(values[0]);
        setSeverity('success');
        setOpen(true);
        setMessage('Fetch notes successful!');
      })
      .catch(() => {
        setSeverity('error');
        setOpen(true);
        setMessage('Fetch notes failed!');
      });
  }, []);

  useEffect(() => {
    if (extraSmall) {
      generateRows(1);
    } else if (!extraSmall && medium) {
      generateRows(2);
    } else {
      generateRows(4);
    }
  }, [count, medium, extraSmall]);

  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <Typography variant="h4" className={classes.title}>
          Notes
        </Typography>
        <Button
          variant="outlined"
          className={classes.button}
          style={{ backgroundColor: accent }}
          onClick={handleAddNote}
        >
          Add Notes
        </Button>
      </div>
      <Grid container direction="column" className={classes.grid}>
        {rows.map((element) => {
          const sliced = notes.slice(
            element * itemsPerRow,
            (element + 1) * itemsPerRow,
          );
          return (
            <Grid container item className={classes.grid}>
              {sliced.map((obj) => {
                return (
                  <Notes
                    index={obj.identifier}
                    key={obj.identifier}
                    identifier={obj.identifier}
                    title={obj.title}
                    text={obj.text}
                    upload={editNote}
                    deleteNote={deleteNote}
                  />
                );
              })}
            </Grid>
          );
        })}
      </Grid>
      <Notification
        open={open}
        handleClose={handleClose}
        severity={severity}
        message={message}
      />
    </div>
  );
};

NotesGrid.propTypes = {
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
    username: state.username,
  };
};

export default connect(mapStateToProps)(NotesGrid);
