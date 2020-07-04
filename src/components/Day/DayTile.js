/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import DayButton from './DayButton';
import DayDialog from './TABDayDialog';
import { url } from '../constant';
import Notification from '../notification';
import { isLoadingTrue, isLoadingFalse } from '../../redux/actions';
import { light } from '../../colors';

const DayTile = ({
  index,
  username,
  activeMonth,
  token,
  dispatch,
  isLoading,
}) => {
  const [currEvents, setCurrEvents] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState('success');

  const fetchEvents = async (month, day) => {
    const response = await fetch(
      `${url}/calendars/${username}/${month}/${day}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok)
      throw new Error('Failed to fetch events, please reload the page!');
    const json = await response.json();
    return json.map((data) => data.fields);
  };

  const saveEventsToDB = (month, day, events) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ events }),
    };
    fetch(`${url}/calendars/${username}/${month}/${day}`, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to save changes, please try again!');
        } else {
          setSeverity('success');
          setOpenAlert(true);
          setMessage('Save changes successful!');
        }
      })
      .catch((err) => {
        setSeverity('error');
        setOpenAlert(true);
        setMessage(err.message);
      });
  };

  React.useEffect(() => {
    const getEvents = () => {
      dispatch(isLoadingTrue());
      fetchEvents(activeMonth, index)
        .then((data) => {
          setCurrEvents(data);
        })
        .then(() => dispatch(isLoadingFalse()))
        .catch((err) => {
          setCurrEvents([]);
          setSeverity('error');
          setOpen(true);
          setMessage(err.message);
        });
    };
    getEvents();
  }, [activeMonth]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const saveEvents = (e) => {
    saveEventsToDB(activeMonth, index, e);
    setCurrEvents(e);
  };
  return (
    <>
      {isLoading === 0 ? (
        <>
          <DayButton
            index={index}
            events={currEvents}
            handleOpen={handleOpen}
          />
          <DayDialog
            events={currEvents}
            saveEvents={saveEvents}
            handleClose={handleClose}
            open={open}
          />
          <Notification
            open={openAlert}
            handleClose={handleCloseAlert}
            severity={severity}
            message={message}
          />
        </>
      ) : index === 11 ? (
        <Loader type="ThreeDots" color={light} height={80} width={80} />
      ) : null}
    </>
  );
};

DayTile.propTypes = {
  index: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  activeMonth: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  isLoading: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeMonth: state.activeMonth,
  username: state.username,
  token: state.token,
  isLoading: state.isLoading,
});

export default connect(mapStateToProps)(DayTile);
