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
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { groupBy, chunk, isEmpty } from 'lodash';
import { TwitterPicker } from 'react-color';
import Loader from 'react-loader-spinner';
import { url, monthIdx, colors } from './constant';
import { dark, light, accent, medium } from '../colors';
import { addNumOfEvents } from '../redux/actions';
import './Customize.css';

const Customize = ({ name, username, token, numOfEvents, dispatch }) => {
  const styles = {
    card: {
      backgroundColor: `${light} !important`,
    },
  };

  const [isLoading, setIsLoading] = React.useState(false);
  const [events, setEvents] = React.useState({});
  const fetchEvents = () =>
    fetch(`${url}/events/${username}/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

  React.useEffect(() => {
    setIsLoading(true);
  }, [name]);

  React.useEffect(() => {
    if (isLoading) {
      fetchEvents()
        .then((response) => response.json())
        .then((data) =>
          setEvents(
            groupBy(data.events, (event) =>
              event.repeated_event ? event.repeated_event.id : 0,
            ),
          ),
        );
    }
  }, [isLoading]);

  React.useEffect(() => {
    if (!isEmpty(events)) setIsLoading(false);
  }, [events]);

  const [open, setOpen] = React.useState(false);
  const [cur, setCur] = React.useState({});

  const handleChange = (type) => (e) => {
    const val = e.target.value;
    setCur((state) => ({ ...state, [type]: val }));
  };

  const handleColorChange = (e) => {
    setCur((state) => ({ ...state, color: e.hex }));
  };

  const handleSave = () => {
    setEvents((state) => ({
      ...state,
      [cur.key]: state[cur.key].map((event) =>
        event.id === cur.id ? cur : event,
      ),
    }));
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
    setEvents((state) => ({
      ...state,
      [repId]: state[repId].filter((event) => event.id !== id),
    }));
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
    setEvents((state) => ({
      ...state,
      [cur.key]: state[cur.key].map((event) => ({
        ...event,
        title: cur.title,
        description: cur.description,
        start: cur.start,
        end: cur.end,
        location: cur.location,
        color: cur.color,
      })),
    }));
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
    fetch(`${url}/events/${username}/${name}/${cur.key}`, options);
    setOpenEdit(false);
  };

  const handleDeleteAll = (key) => () => {
    setEvents((state) => {
      const newState = { ...state };
      delete newState[key];
      return newState;
    });
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(`${url}/events/${username}/${name}/${key}`, options);
  };

  const [date, setDate] = React.useState(new Date());

  const handleDateChange = (value) => setDate(value);

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
        day: date.getUTCDate() + 1,
        month: date.getUTCMonth(),
      }),
    };
    fetch(`${url}/events/${username}/${name}/${add.key}`, options)
      .then((response) => response.json())
      .then((data) => {
        setEvents((state) => ({
          ...state,
          [add.key]: state[add.key].concat(data),
        }));
      });
    dispatch(addNumOfEvents(1));
  };
  return (
    <>
      {!isLoading ? (
        <>
          {Object.entries(events).map(([key, value]) => (
            <Paper
              style={{
                backgroundColor: light,
                width: 'calc(85% - 8rem)',
                float: 'right',
                margin: '1rem 2rem',
                padding: '2rem',
              }}
            >
              <Typography
                align="left"
                style={{ fontSize: '2rem', color: dark, fontWeight: 'bold' }}
              >
                {value[0].repeated_event.name}
              </Typography>

              <Grid container direction="column" style={{ margin: '1rem 0' }}>
                {chunk(
                  value.sort((a, b) =>
                    monthIdx[a.day.month.month_name] !==
                    monthIdx[b.day.month.month_name]
                      ? monthIdx[a.day.month.month_name] -
                        monthIdx[b.day.month.month_name]
                      : a.day.index - b.day.index,
                  ),
                  8,
                ).map((row) => (
                  <Grid container item style={{ margin: '0 -0.5rem' }}>
                    {row.map((event) => (
                      <Button
                        variant="contained"
                        style={{
                          color: light,
                          backgroundColor: event.color,
                          width: 'calc((100% - 8rem) / 8)',
                          margin: '0.5rem',
                        }}
                        onClick={() => {
                          setOpen(true);
                          setCur({ key, ...event });
                        }}
                      >
                        {`${event.day.index} ${event.day.month.month_name} 2020`}
                      </Button>
                    ))}
                  </Grid>
                ))}
              </Grid>
              <div
                style={{ float: 'right', display: 'flex', marginTop: '1rem' }}
              >
                <KeyboardDatePicker
                  value={date}
                  onChange={handleDateChange}
                  format="d MMM yyyy"
                  style={{ alignSelf: 'center' }}
                />
                <Button
                  onClick={handleAddDate({ key, ...value[0] })}
                  style={{
                    color: light,
                    backgroundColor: accent,
                    margin: '1rem',
                  }}
                  variant="contained"
                >
                  Add date
                </Button>
                <Button
                  onClick={() => {
                    setCur({ key, ...value[0] });
                    setOpenEdit(true);
                  }}
                  style={{
                    color: light,
                    backgroundColor: accent,
                    margin: '1rem',
                  }}
                  variant="contained"
                >
                  Edit All
                </Button>
                <Button
                  onClick={handleDeleteAll(key)}
                  style={{
                    color: light,
                    backgroundColor: accent,
                    margin: '1rem',
                  }}
                  variant="contained"
                >
                  Delete All
                </Button>
              </div>
            </Paper>
          ))}
          <Paper
            style={{
              width: 'max-width',
              display: 'flex',
              float: 'left',
              margin: '2rem',
              marginLeft: 'calc(2rem + 15%)',
              padding: '2rem',
              backgroundColor: light,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                float: 'left',
                alignItems: 'flex-start',
              }}
            >
              <Typography
                style={{ fontSize: '1.5rem', color: dark, fontWeight: 'bold' }}
              >
                Add Recurring Events
              </Typography>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: '1rem',
                }}
              >
                <TextField />
                <Button
                  style={{
                    color: light,
                    backgroundColor: accent,
                    marginLeft: '1rem',
                  }}
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
            <DialogTitle style={{ backgroundColor: light }}>
              Edit Event
            </DialogTitle>
            <DialogContent style={{ backgroundColor: light }}>
              <Typography style={{ fontWeight: 'bold', color: dark }}>
                Title:
              </Typography>
              <TextField
                fullWidth
                defaultValue={cur.title}
                onChange={handleChange('title')}
              />
              <Typography
                style={{
                  fontWeight: 'bold',
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
              />
              <Typography
                style={{
                  fontWeight: 'bold',
                  paddingTop: '1rem',
                  color: dark,
                }}
              >
                Start Time:
              </Typography>
              <TextField
                fullWidth
                defaultValue={cur.start}
                onChange={handleChange('start')}
              />
              <Typography
                style={{
                  fontWeight: 'bold',
                  paddingTop: '1rem',
                  color: dark,
                }}
              >
                End Time:
              </Typography>
              <TextField
                fullWidth
                defaultValue={cur.end}
                onChange={handleChange('end')}
              />
              <Typography
                style={{
                  fontWeight: 'bold',
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
              />
              <Typography
                style={{ fontWeight: 'bold', padding: '1rem 0', color: dark }}
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
              style={{ backgroundColor: light, padding: '1.5rem' }}
            >
              <Button
                onClick={handleSave}
                style={{ color: light, backgroundColor: accent }}
                variant="contained"
              >
                Save
              </Button>
              <Button
                onClick={handleDelete(cur.id, cur.key)}
                style={{ color: light, backgroundColor: accent }}
                variant="contained"
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
            <DialogTitle style={{ backgroundColor: light }}>
              Edit All Events
            </DialogTitle>
            <DialogContent style={{ backgroundColor: light }}>
              <Typography style={{ fontWeight: 'bold', color: dark }}>
                Title:
              </Typography>
              <TextField
                fullWidth
                defaultValue={cur.title}
                onChange={handleChange('title')}
              />
              <Typography
                style={{
                  fontWeight: 'bold',
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
              />
              <Typography
                style={{
                  fontWeight: 'bold',
                  paddingTop: '1rem',
                  color: dark,
                }}
              >
                Start Time:
              </Typography>
              <TextField
                fullWidth
                defaultValue={cur.start}
                onChange={handleChange('start')}
              />
              <Typography
                style={{
                  fontWeight: 'bold',
                  paddingTop: '1rem',
                  color: dark,
                }}
              >
                End Time:
              </Typography>
              <TextField
                fullWidth
                defaultValue={cur.end}
                onChange={handleChange('end')}
              />
              <Typography
                style={{
                  fontWeight: 'bold',
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
              />
              <Typography
                style={{ fontWeight: 'bold', padding: '1rem 0', color: dark }}
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
              style={{ backgroundColor: light, padding: '1.5rem' }}
            >
              <Button
                onClick={handleSaveAll}
                style={{ color: light, backgroundColor: accent }}
                variant="contained"
              >
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <div
          style={{
            width: '85%',
            float: 'right',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Loader type="ThreeDots" color={light} height={80} width={80} />
        </div>
      )}
    </>
  );
};

Customize.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  numOfEvents: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.username,
  token: state.token,
  numOfEvents: state.numOfEvents,
});

export default connect(mapStateToProps)(Customize);
