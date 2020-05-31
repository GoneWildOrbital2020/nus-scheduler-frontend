import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextField,
  Typography,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { TwitterPicker } from 'react-color';
import './ACCDayDialog.css';
import { connect } from 'react-redux';
import { addNumOfEvents } from '../../redux/actions';

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

  const [count, setCount] = React.useState(0);

  React.useEffect(() => setNewEvents(events.map((x) => ({ ...x }))), [events]);

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

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="lg">
      <div className="dialogTitle">
        <Typography
          style={{
            fontWeight: 'bold',
            fontSize: '2.5rem',
          }}
        >
          Events
        </Typography>
        <IconButton onClick={shouldSave(false)} className="closeButton">
          <CloseIcon />
        </IconButton>
      </div>
      {newEvents.map((event) => (
        <div className="dialogItem">
          <ExpansionPanel>
            <ExpansionPanelSummary
              className="panelSummary"
              style={{
                background: event.color,
              }}
            >
              <Typography style={{ opacity: '50%', fontWeight: 'bold' }}>
                {event.title}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div className="container">
                <Typography style={{ fontWeight: 'bold' }}>Title:</Typography>
                <TextField
                  fullWidth
                  defaultValue={event.title}
                  onChange={handleChange(event.index, 'title')}
                />
                <Typography style={{ fontWeight: 'bold', paddingTop: '1rem' }}>
                  Description:
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  defaultValue={event.description}
                  onChange={handleChange(event.index, 'description')}
                />
                <Typography style={{ fontWeight: 'bold', paddingTop: '1rem' }}>
                  Start Time:
                </Typography>
                <TextField
                  fullWidth
                  defaultValue={event.start}
                  onChange={handleChange(event.index, 'start')}
                />
                <Typography style={{ fontWeight: 'bold', paddingTop: '1rem' }}>
                  End Time:
                </Typography>
                <TextField
                  fullWidth
                  defaultValue={event.end}
                  onChange={handleChange(event.index, 'end')}
                />
                <Typography style={{ fontWeight: 'bold', paddingTop: '1rem' }}>
                  Location:
                </Typography>
                <TextField
                  fullWidth
                  defaultValue={event.location}
                  onChange={handleChange(event.index, 'location')}
                />
                <Typography style={{ fontWeight: 'bold', padding: '1rem 0' }}>
                  Color:
                </Typography>
                <TwitterPicker
                  triangle="hide"
                  colors={colors}
                  onChange={handleColorChange(event.index)}
                />
                <Button
                  autoFocus
                  variant="contained"
                  onClick={deleteEvent(event.index)}
                  color="primary"
                  style={{ float: 'right' }}
                >
                  Delete Event
                </Button>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      ))}
      <div className="buttonContainer2">
        <Button
          autoFocus
          variant="contained"
          onClick={shouldSave(true)}
          color="primary"
          style={{ float: 'right', position: 'relative', marginLeft: '2rem' }}
        >
          Save Changes
        </Button>
        <Button
          autoFocus
          variant="contained"
          onClick={addEvent}
          color="primary"
          style={{ float: 'right' }}
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
