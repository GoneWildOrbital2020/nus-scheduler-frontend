import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { TwitterPicker } from 'react-color';
import './TABDayDialog.css';
import { connect } from 'react-redux';
import { addNumOfEvents } from '../../redux/actions';
import { dark, light, accent, medium } from '../../colors';

const colors = [
  '#EFBC9B',
  '#896978',
  '#C6C5B9',
  '#62929E',
  '#546A7B',
  '#667761',
  '#96897B',
  '#DFD5A5',
];
const DayDialog = ({
  events,
  saveEvents,
  handleClose,
  open,
  numOfEvents,
  dispatch,
}) => {
  const [newEvents, setNewEvents] = React.useState(
    events.map((x) => ({ ...x })),
  );

  React.useEffect(() => setNewEvents(events.map((x) => ({ ...x }))), [events]);

  const [count, setCount] = React.useState(0);

  const [value, setValue] = React.useState(0);

  const handleChange = (index, type) => (e) => {
    const tmp = newEvents.map((x) => ({ ...x }));
    tmp.forEach((event) => {
      // eslint-disable-next-line no-param-reassign
      if (event.index === index) event[type] = e.target.value;
    });
    setNewEvents(tmp);
  };

  const handleColorChange = (index) => (e) => {
    const tmp = newEvents.map((x) => ({ ...x }));
    tmp.forEach((event) => {
      // eslint-disable-next-line no-param-reassign
      if (event.index === index) event.color = e.hex;
    });
    setNewEvents(tmp);
  };

  const shouldSave = (save) => () => {
    if (save) {
      dispatch(addNumOfEvents(count));
      saveEvents(newEvents);
    } else {
      setNewEvents(events.map((x) => ({ ...x })));
    }
    handleClose();
  };

  const addEvent = () => {
    const tmp = newEvents.map((x) => ({ ...x }));
    tmp.push({ index: numOfEvents + count, title: 'New Event' });
    setNewEvents(tmp);
    setCount(count + 1);
  };

  const deleteEvent = (index) => () => {
    const tmp = newEvents
      .filter((x) => x.index !== index)
      .map((x) => ({ ...x }));
    setNewEvents(tmp);
  };

  const handleValueChange = (event, newValue) => setValue(newValue);

  if (!newEvents.length) addEvent();

  const styles = {
    card: {
      backgroundColor: `${light} !important`,
    },
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="lg">
      <div className="dialogTitle" style={{ backgroundColor: medium }}>
        <Typography
          style={{
            fontWeight: 'bold',
            fontSize: '2.5rem',
            color: light,
          }}
        >
          Events
        </Typography>
        <IconButton onClick={shouldSave(false)} className="closeButton">
          <CloseIcon />
        </IconButton>
      </div>
      <div className="dialogItem" style={{ backgroundColor: medium }}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleValueChange}
            variant="scrollable"
            TabIndicatorProps={{ style: { background: accent } }}
          >
            {newEvents.map((event) => {
              const label = (
                <Typography style={{ fontWeight: 'bold', color: event.color }}>
                  {event.title}
                </Typography>
              );
              return <Tab label={label} disableRipple />;
            })}
          </Tabs>
        </AppBar>
        {newEvents.map(
          (event, index) =>
            value === index && (
              <Box
                boxShadow={2}
                className="container"
                style={{ backgroundColor: light }}
              >
                <Typography style={{ fontWeight: 'bold', color: dark }}>
                  Title:
                </Typography>
                <TextField
                  fullWidth
                  defaultValue={event.title}
                  onChange={handleChange(event.index, 'title')}
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
                  defaultValue={event.description}
                  onChange={handleChange(event.index, 'description')}
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
                  defaultValue={event.start}
                  onChange={handleChange(event.index, 'start')}
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
                  defaultValue={event.end}
                  onChange={handleChange(event.index, 'end')}
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
                  defaultValue={event.location}
                  onChange={handleChange(event.index, 'location')}
                />
                <Typography
                  style={{ fontWeight: 'bold', padding: '1rem 0', color: dark }}
                >
                  Color:
                </Typography>
                <TwitterPicker
                  triangle="hide"
                  colors={colors}
                  onChange={handleColorChange(event.index)}
                  styles={styles}
                />
                <Button
                  autoFocus
                  variant="contained"
                  onClick={deleteEvent(event.index)}
                  color="primary"
                  style={{
                    flex: '1',
                    alignSelf: 'flex-end',
                    backgroundColor: accent,
                    color: light,
                  }}
                >
                  Delete Event
                </Button>
              </Box>
            ),
        )}
      </div>
      <div className="buttonContainer2" style={{ backgroundColor: medium }}>
        <Button
          autoFocus
          variant="contained"
          onClick={shouldSave(true)}
          color="primary"
          style={{
            float: 'right',
            position: 'relative',
            marginLeft: '2rem',
            backgroundColor: accent,
            color: light,
          }}
        >
          Save Changes
        </Button>
        <Button
          autoFocus
          variant="contained"
          onClick={addEvent}
          color="primary"
          style={{ float: 'right', backgroundColor: accent, color: light }}
        >
          Add Event
        </Button>
      </div>
    </Dialog>
  );
};

DayDialog.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.int,
      color: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      start: PropTypes.string,
      end: PropTypes.string,
      location: PropTypes.string,
    }),
  ),
  saveEvents: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  numOfEvents: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

DayDialog.defaultProps = {
  events: [],
  open: false,
};

const mapStateToProps = (state) => ({
  numOfEvents: state.numOfEvents,
});

export default connect(mapStateToProps)(DayDialog);
