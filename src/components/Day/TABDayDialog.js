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
  makeStyles,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { TwitterPicker } from 'react-color';
import { connect } from 'react-redux';
import { TimePicker } from '@material-ui/pickers';
import { addNumOfEvents } from '../../redux/actions';
import { dark, light, accent, medium } from '../../colors';
import { colors } from '../constant';

const useStyles = makeStyles(() => ({
  closeButton: {
    float: 'right',
    paddingTop: '0',
  },
  dialogItem: {
    flex: '1',
    padding: '0rem 2rem',
    overflow: 'scroll',
  },
  dialogTitle: {
    display: 'flex',
    padding: '2rem',
    paddingBottom: '1rem',
    justifyContent: 'space-between',
  },
  buttonContainer2: {
    padding: '2rem',
  },
  panelSummary: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    minHeight: '0',
    height: '3rem',
  },
  container: {
    padding: '2rem',
    paddingTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const DayDialog = ({
  events,
  saveEvents,
  handleClose,
  open,
  numOfEvents,
  dispatch,
}) => {
  const classes = useStyles();

  const [newEvents, setNewEvents] = React.useState(
    events.map((x) => ({ ...x })),
  );

  React.useEffect(() => setNewEvents(events.map((x) => ({ ...x }))), [events]);

  const [count, setCount] = React.useState(0);

  const [value, setValue] = React.useState(0);

  const [tab, setTab] = React.useState(true);

  const ref = React.useCallback((node) => {
    if (node && tab) {
      // eslint-disable-next-line no-param-reassign
      node.scrollTop = 0;
    }
  });

  const handleChange = (index, type) => (e) => {
    const tmp = newEvents.map((x) => ({ ...x }));
    tmp.forEach((event) => {
      // eslint-disable-next-line no-param-reassign
      if (event.index === index) event[type] = e.target.value;
    });
    setTab(false);
    setNewEvents(tmp);
  };

  const handleDateChange = (index, type) => (e) => {
    const tmp = newEvents.map((x) => ({ ...x }));
    tmp.forEach((event) => {
      // eslint-disable-next-line no-param-reassign
      if (event.index === index) event[type] = e;
    });
    setTab(false);
    setNewEvents(tmp);
  };

  const handleColorChange = (index) => (e) => {
    const tmp = newEvents.map((x) => ({ ...x }));
    tmp.forEach((event) => {
      // eslint-disable-next-line no-param-reassign
      if (event.index === index) event.color = e.hex;
    });
    setTab(false);
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
    tmp.push({
      index: numOfEvents + count,
      title: 'New Event',
      color: accent,
      start: null,
      end: null,
    });
    setNewEvents(tmp);
    setCount(count + 1);
  };
  console.log(newEvents);
  React.useEffect(() => {
    if (newEvents.length === 0) addEvent();
  }, []);

  const deleteEvent = (index) => () => {
    const tmp = newEvents
      .filter((x) => x.index !== index)
      .map((x) => ({ ...x }));
    setNewEvents(tmp);
  };

  const handleValueChange = (event, newValue) => {
    setValue(newValue);
    setTab(true);
  };

  const styles = {
    card: {
      backgroundColor: `${light} !important`,
    },
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth="lg"
      style={{ zIndex: 1401 }}
    >
      <div className={classes.dialogTitle} style={{ backgroundColor: medium }}>
        <Typography
          style={{
            fontWeight: 'bold',
            fontSize: '2.5rem',
            color: light,
          }}
        >
          Events
        </Typography>
        <IconButton onClick={shouldSave(false)} className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
      </div>
      <div
        className={classes.dialogItem}
        style={{ backgroundColor: medium }}
        ref={ref}
      >
        {newEvents.length > 0 ? (
          <AppBar position="sticky" color="default">
            <Tabs
              value={value}
              onChange={handleValueChange}
              variant="scrollable"
              TabIndicatorProps={{ style: { background: accent } }}
            >
              {newEvents.map((event) => {
                const label = (
                  <Typography
                    style={{ fontWeight: 'bold', color: event.color }}
                  >
                    {event.title}
                  </Typography>
                );
                return <Tab label={label} disableRipple />;
              })}
            </Tabs>
          </AppBar>
        ) : null}
        {newEvents.map(
          (event, index) =>
            value === index && (
              <Box
                boxShadow={2}
                className={classes.container}
                style={{ backgroundColor: light }}
              >
                <Typography style={{ fontWeight: 'bold', color: dark }}>
                  Title:
                </Typography>
                <TextField
                  fullWidth
                  defaultValue={event.title}
                  onChange={handleChange(event.index, 'title')}
                  variant="outlined"
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
                  rows={3}
                  defaultValue={event.description}
                  onChange={handleChange(event.index, 'description')}
                  variant="outlined"
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
                <TimePicker
                  fullWidth
                  value={event.start}
                  onChange={handleDateChange(event.index, 'start')}
                  inputVariant="outlined"
                  DialogProps={{ style: { zIndex: 1500 } }}
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
                <TimePicker
                  fullWidth
                  value={event.end}
                  onChange={handleDateChange(event.index, 'end')}
                  inputVariant="outlined"
                  DialogProps={{ style: { zIndex: 1500 } }}
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
                  variant="outlined"
                />
                <Typography
                  style={{
                    fontWeight: 'bold',
                    paddingTop: '1rem',
                    color: dark,
                  }}
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
      <div
        className={classes.buttonContainer2}
        style={{ backgroundColor: medium }}
      >
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
