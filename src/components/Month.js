import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import Loader from 'react-loader-spinner';
import DayTile from './Day/DayTile';
import { monthProperties, monthPropertiesLeap, url } from './constant';
import Notification from './notification';
import { light } from '../colors';

const Month = ({ activeMonth, activeYear, username, token }) => {
  const [isLeap, setIsLeap] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [currEvents, setCurrEvents] = React.useState({ empty: true });

  const fetchEvents = async () => {
    const response = await fetch(
      `${url}/calendars/${username}/${activeYear}/${activeMonth}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) throw new Error('Failed to fetch events!');
    const json = await response.json();
    return json;
  };

  React.useEffect(() => {
    setCurrEvents({ empty: true });
    const getEvents = () => {
      fetchEvents()
        .then((data) => {
          setCurrEvents(groupBy(data, 'day'));
        })
        .catch((err) => {
          setCurrEvents([]);
          setSeverity('error');
          setOpen(true);
          setMessage(err.message);
        });
    };
    getEvents();
  }, [activeMonth]);
  const rows = [0, 1, 2, 3, 4];

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    fetch(`${url}/calendars/checkleap/${activeYear}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setIsLeap(json.leap);
      })
      .catch(() => {
        setSeverity('error');
        setOpen(true);
        setMessage('Failed to check leap year!');
      });
  }, [activeYear]);

  return (
    <>
      {!currEvents.empty ? (
        <>
          <Grid container direction="column" style={{ width: 'max-content' }}>
            {rows.map((row) => {
              const cols = [];
              let upperBound = monthProperties[activeMonth].len;
              if (isLeap) {
                upperBound = monthPropertiesLeap[activeMonth].len;
              }
              for (let i = 1; i <= 7 && row * 7 + i <= upperBound; i += 1) {
                cols.push(row * 7 + i);
              }
              return (
                <Grid container item style={{ width: 'max-content' }}>
                  {cols.map((col) => (
                    <DayTile
                      index={col}
                      key={col}
                      propEvents={currEvents[col]}
                    />
                  ))}
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
        </>
      ) : (
        <Loader type="ThreeDots" color={light} height={80} width={80} />
      )}
    </>
  );
};

Month.propTypes = {
  activeMonth: PropTypes.number.isRequired,
  activeYear: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  activeMonth: state.activeMonth,
  activeYear: state.activeYear,
  username: state.username,
  token: state.token,
});

export default connect(mapStateToProps)(Month);
