import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Typography,
  Paper,
  Button,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import { DatePicker, TimePicker } from '@material-ui/pickers';
import { chunk } from 'lodash';
import { TwitterPicker } from 'react-color';
import Loader from 'react-loader-spinner';
import { Close } from '@material-ui/icons';
import { url, monthIdx, colors } from './Constant';
import { dark, light } from '../Colors';
import { addNumOfEvents } from '../redux/Actions';
import './Customize.css';

const useStyles = makeStyles((theme) => ({
  button: {
    color: light,
    marginLeft: '1rem',
  },
  paper: {
    backgroundColor: light,
    width: 'calc(85% - 4rem)',
    [theme.breakpoints.down('md')]: {
      width: 'calc(75% - 4rem)',
    },
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100% - 4rem)',
    },
    float: 'right',
    margin: '1rem 2rem',
    padding: '2rem',
  },
  paperActivity: {
    display: 'flex',
    float: 'left',
    margin: '2rem',
    marginLeft: 'calc(2rem + 15%)',
    [theme.breakpoints.down('md')]: {
      marginLeft: 'calc(2rem + 25%)',
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: '2rem',
    },
    padding: '2rem',
    backgroundColor: light,
  },
  loader: {
    width: '85%',
    [theme.breakpoints.down('md')]: {
      width: '75%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    float: 'right',
    display: 'flex',
    justifyContent: 'center',
  },
  eventButton: {
    color: light,
    width: 'calc((100% - 8rem) / 8)',
    [theme.breakpoints.down('md')]: {
      width: 'calc((100% - 4rem) / 4)',
    },
    [theme.breakpoints.down('xs')]: {
      width: 'calc((100% - 2rem) / 2)',
    },
    margin: '0.5rem',
    transition: '0.3s',
    '&:hover': {
      filter: 'brightness(0.8)',
    },
  },
  bottomButtons: {
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      float: 'right',
    },
    marginTop: '1rem',
  },
  calendar: {
    alignSelf: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
}));

const Customize = ({ name, token, numOfEvents, dispatch }) => {
  const classes = useStyles();
  const styles = {
    card: {
      backgroundColor: `${light} !important`,
    },
  };

  const [events, setEvents] = React.useState({ empty: true });
  const [date, setDate] = React.useState({});
  const fetchEvents = () =>
    fetch(`${url}/events/activity/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

  React.useEffect(() => {
    setEvents({ empty: true });
    fetchEvents()
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.rep.sort((a, b) => a.id - b.id));
        setDate(
          data.rep.reduce((result, item) => {
            result[item.id] = new Date();
            return result;
          }, {}),
        );
      });
  }, [name]);
  const [open, setOpen] = React.useState(false);
  const [cur, setCur] = React.useState({});

  const handleChange = (type) => (e) => {
    const val = e.target.value;
    setCur((state) => ({ ...state, [type]: val }));
  };

  const handleDateChange = (type) => (e) => {
    const val = e;
    setCur((state) => ({ ...state, [type]: val }));
  };

  const handleColorChange = (e) => {
    setCur((state) => ({ ...state, color: e.hex }));
  };

  const handleSave = () => {
    setEvents((state) =>
      state.map((rep) =>
        rep.id === cur.key
          ? {
              ...rep,
              events: rep.events.map((event) =>
                event.id === cur.id ? cur : event,
              ),
            }
          : rep,
      ),
    );
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          title: cur.title,
          description: cur.description,
          start: cur.start,
          end: cur.end,
          location: cur.location,
          color: cur.color,
        },
      }),
    };
    fetch(`${url}/events/${cur.id}`, options);
    setOpen(false);
  };

  const handleDelete = (id, repId) => () => {
    setEvents((state) =>
      state.map((rep) =>
        rep.id === repId
          ? { ...rep, events: rep.events.filter((event) => event.id !== id) }
          : rep,
      ),
    );
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(`${url}/events/${cur.id}`, options);
    setOpen(false);
  };

  const [openEdit, setOpenEdit] = React.useState(false);

  const handleSaveAll = () => {
    setEvents((state) =>
      state.map((rep) =>
        rep.id === cur.key
          ? {
              ...rep,
              events: rep.events.map((event) => ({
                ...event,
                title: cur.title,
                description: cur.description,
                start: cur.start,
                end: cur.end,
                location: cur.location,
                color: cur.color,
              })),
            }
          : rep,
      ),
    );
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          title: cur.title,
          description: cur.description,
          start: cur.start,
          end: cur.end,
          location: cur.location,
          color: cur.color,
        },
      }),
    };
    fetch(`${url}/events/${name}/${cur.key}`, options);
    setOpenEdit(false);
  };

  const handleDeleteAll = (key) => () => {
    setEvents((state) =>
      state.map((rep) => (rep.id === key ? { ...rep, events: [] } : rep)),
    );
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(`${url}/events/${name}/${key}`, options);
  };

  const handleDeleteActivity = (key) => () => {
    setEvents((state) => state.filter((rep) => rep.id !== key));
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(`${url}/events/${name}/${key}/all`, options);
  };

  const handleDate = (key) => (value) =>
    setDate((state) => ({ ...state, [key]: value }));

  const handleAddDate = (add) => () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          index: numOfEvents,
          title: add.title,
          description: add.description,
          start: add.start,
          end: add.end,
          location: add.location,
          color: add.color,
        },
        day: date[add.key].getDate(),
        month: date[add.key].getMonth(),
        year: date[add.key].getFullYear(),
      }),
    };
    fetch(`${url}/events/${name}/${add.key}`, options)
      .then((response) => response.json())
      .then((data) => {
        setEvents((state) =>
          state.map((rep) =>
            rep.id === add.key
              ? { ...rep, events: rep.events.concat([data]) }
              : rep,
          ),
        );
      });
    dispatch(addNumOfEvents(1));
  };

  const [repName, setRepName] = React.useState('');
  const handleRepName = () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: repName,
      }),
    };
    fetch(`${url}/events/rep/${name}`, options)
      .then((response) => response.json())
      .then(({ id }) => {
        setEvents((state) => {
          const newRep = { id, name: repName, events: [] };
          return state.concat([newRep]);
        });
        setDate((state) => ({ ...state, [id]: new Date() }));
      });
    setRepName('');
  };

  return (
    <>
      {!events.empty ? (
        <>
          {events.map((value) => (
            <Paper className={classes.paper} key={value.id}>
              <Typography variant="h5" align="left" style={{ color: dark }}>
                {value.name}
              </Typography>

              <Grid container direction="column" style={{ margin: '1rem 0' }}>
                {chunk(
                  value.events.sort((a, b) => {
                    if (a.year === b.year) {
                      if (monthIdx[a.month] !== monthIdx[b.month]) {
                        return monthIdx[a.month] - monthIdx[b.month];
                      }
                      return a.day - b.day;
                    }
                    return a.year - b.year;
                  }),
                  8,
                ).map((row) => (
                  <Grid container item style={{ margin: '0 -0.5rem' }}>
                    {row.map((event) => (
                      <Button
                        variant="contained"
                        style={{ backgroundColor: event.color }}
                        className={classes.eventButton}
                        onClick={() => {
                          setOpen(true);
                          setCur({ key: value.id, ...event });
                        }}
                        key={event.id}
                      >
                        {`${event.day} ${event.month} ${event.year}`}
                      </Button>
                    ))}
                  </Grid>
                ))}
              </Grid>
              <div className={classes.bottomButtons}>
                <DatePicker
                  value={date[value.id]}
                  onChange={handleDate(value.id)}
                  format="d MMM yyyy"
                  className={classes.calendar}
                  inputVariant="outlined"
                />
                <Button
                  onClick={handleAddDate({ key: value.id, ...value.events[0] })}
                  style={{
                    color: light,
                    margin: '1rem',
                  }}
                  variant="contained"
                  color="primary"
                >
                  Add date
                </Button>
                <Button
                  onClick={() => {
                    setCur({ key: value.id, ...value.events[0] });
                    setOpenEdit(true);
                  }}
                  className={classes.button}
                  style={{
                    margin: '1rem',
                  }}
                  disabled={value.events.length === 0}
                  variant="contained"
                  color="primary"
                >
                  Edit All
                </Button>
                <Button
                  onClick={handleDeleteAll(value.id)}
                  className={classes.button}
                  style={{
                    margin: '1rem',
                  }}
                  disabled={value.events.length === 0}
                  variant="contained"
                  color="primary"
                >
                  Delete All
                </Button>
                <Button
                  onClick={handleDeleteActivity(value.id)}
                  style={{
                    color: light,
                    margin: '1rem',
                  }}
                  variant="contained"
                  color="primary"
                >
                  Delete Activity
                </Button>
              </div>
            </Paper>
          ))}
          <Paper className={classes.paperActivity}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                float: 'left',
                alignItems: 'flex-start',
              }}
            >
              <Typography variant="h5" style={{ color: dark }}>
                Add Activity
              </Typography>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: '1rem',
                }}
              >
                <TextField
                  required
                  onChange={(e) => setRepName(e.target.value)}
                  value={repName}
                />
                <Button
                  className={classes.button}
                  onClick={handleRepName}
                  variant="contained"
                  color="primary"
                  disabled={repName === ''}
                >
                  Add
                </Button>
              </div>
            </div>
          </Paper>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            style={{ zIndex: 1401 }}
          >
            <div
              style={{
                backgroundColor: light,
                color: dark,
                display: 'flex',
                justifyContent: 'space-between',
                padding: '2rem 1.5rem 0.5rem 1.5rem',
              }}
            >
              <Typography variant="h5" style={{ color: dark }}>
                Edit Event
              </Typography>
              <IconButton
                onClick={() => setOpen(false)}
                style={{ paddingTop: 0, paddingRight: 0 }}
              >
                <Close />
              </IconButton>
            </div>
            <DialogContent style={{ backgroundColor: light }}>
              <Typography variant="body2" style={{ color: dark }}>
                Title:
              </Typography>
              <TextField
                fullWidth
                defaultValue={cur.title}
                onChange={handleChange('title')}
                variant="outlined"
              />
              <Typography
                variant="body2"
                style={{
                  paddingTop: '1rem',
                  color: dark,
                }}
              >
                Description:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                rowsMax={5}
                defaultValue={cur.description}
                onChange={handleChange('description')}
                variant="outlined"
              />
              <Typography
                variant="body2"
                style={{
                  paddingTop: '1rem',
                  color: dark,
                }}
              >
                Start Time:
              </Typography>
              <TimePicker
                fullWidth
                value={cur.start}
                onChange={handleDateChange('start')}
                inputVariant="outlined"
                DialogProps={{ style: { zIndex: 1500 } }}
              />
              <Typography
                variant="body2"
                style={{
                  paddingTop: '1rem',
                  color: dark,
                }}
              >
                End Time:
              </Typography>
              <TimePicker
                fullWidth
                value={cur.end}
                onChange={handleDateChange('end')}
                inputVariant="outlined"
                DialogProps={{ style: { zIndex: 1500 } }}
              />
              <Typography
                variant="body2"
                style={{
                  paddingTop: '1rem',
                  color: dark,
                }}
              >
                Location:
              </Typography>
              <TextField
                fullWidth
                defaultValue={cur.location}
                onChange={handleChange('location')}
                variant="outlined"
              />
              <Typography
                variant="body2"
                style={{ paddingTop: '1rem', color: dark }}
              >
                Color:
              </Typography>
              <TwitterPicker
                triangle="hide"
                colors={colors}
                onChange={handleColorChange}
                styles={styles}
              />
            </DialogContent>
            <DialogActions
              style={{
                backgroundColor: light,
                padding: '0.5rem 1.5rem 2rem 1.5rem',
              }}
            >
              <Button
                onClick={handleSave}
                style={{ color: light }}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
              <Button
                onClick={handleDelete(cur.id, cur.key)}
                style={{ color: light }}
                variant="contained"
                color="primary"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={openEdit}
            onClose={() => setOpenEdit(false)}
            style={{ zIndex: 1401 }}
          >
            <div
              style={{
                backgroundColor: light,
                color: dark,
                display: 'flex',
                justifyContent: 'space-between',
                padding: '2rem 1.5rem 0.5rem 1.5rem',
              }}
            >
              <Typography variant="h5" style={{ color: dark }}>
                Edit All Events
              </Typography>
              <IconButton
                onClick={() => setOpenEdit(false)}
                style={{ paddingTop: 0, paddingRight: 0 }}
              >
                <Close />
              </IconButton>
            </div>
            <DialogContent style={{ backgroundColor: light }}>
              <Typography variant="body2" style={{ color: dark }}>
                Title:
              </Typography>
              <TextField
                fullWidth
                defaultValue={cur.title}
                onChange={handleChange('title')}
                variant="outlined"
              />
              <Typography
                variant="body2"
                style={{
                  paddingTop: '1rem',
                  color: dark,
                }}
              >
                Description:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={2}
                rowsMax={5}
                defaultValue={cur.description}
                onChange={handleChange('description')}
                variant="outlined"
              />
              <Typography
                variant="body2"
                style={{
                  paddingTop: '1rem',
                  color: dark,
                }}
              >
                Start Time:
              </Typography>
              <TimePicker
                fullWidth
                value={cur.start}
                onChange={handleDateChange('start')}
                inputVariant="outlined"
                DialogProps={{ style: { zIndex: 1500 } }}
              />
              <Typography
                variant="body2"
                style={{
                  paddingTop: '1rem',
                  color: dark,
                }}
              >
                End Time:
              </Typography>
              <TimePicker
                fullWidth
                value={cur.end}
                onChange={handleDateChange('end')}
                inputVariant="outlined"
                DialogProps={{ style: { zIndex: 1500 } }}
              />
              <Typography
                variant="body2"
                style={{
                  paddingTop: '1rem',
                  color: dark,
                }}
              >
                Location:
              </Typography>
              <TextField
                fullWidth
                defaultValue={cur.location}
                onChange={handleChange('location')}
                variant="outlined"
              />
              <Typography
                variant="body2"
                style={{ paddingTop: '1rem', color: dark }}
              >
                Color:
              </Typography>
              <TwitterPicker
                triangle="hide"
                colors={colors}
                onChange={handleColorChange}
                styles={styles}
              />
            </DialogContent>
            <DialogActions
              style={{
                backgroundColor: light,
                padding: '0.5rem 1.5rem 2rem 1.5rem',
              }}
            >
              <Button
                onClick={handleSaveAll}
                style={{ color: light }}
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <div className={classes.loader}>
          <Loader type="ThreeDots" color={light} height={80} width={80} />
        </div>
      )}
    </>
  );
};

Customize.propTypes = {
  name: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  numOfEvents: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
  numOfEvents: state.numOfEvents,
});

export default connect(mapStateToProps)(Customize);
