import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, useMediaQuery } from '@material-ui/core';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import Loader from 'react-loader-spinner';
import DayTile from './Day/DayTile';
import { monthProperties, monthPropertiesLeap, url } from './constant';
import Notification from './notification';
import { light } from '../colors';

const Month = ({ activeMonth, activeYear, username, token }) => {
  const generateRows = (num) => {
    const rows = [];
    for (let i = 0; i < num; i += 1) {
      rows.push(i);
    }
    return rows;
  };

  const [isLeap, setIsLeap] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');
  const [currEvents, setCurrEvents] = useState({ empty: true });
  const [itemsPerRow, setItemsPerRow] = useState(7);
  const medium = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const small = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const extraSmall = useMediaQuery((theme) => theme.breakpoints.down('xs'));

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

  useEffect(() => {
    if (extraSmall) {
      setItemsPerRow(1);
    } else if (!extraSmall && small) {
      setItemsPerRow(2);
    } else if (!small && medium) {
      setItemsPerRow(4);
    } else {
      setItemsPerRow(7);
    }
  }, [medium, small, extraSmall]);

  return (
    <>
      {!currEvents.empty ? (
        <>
          <Grid container direction="column" style={{ width: 'max-content' }}>
            {generateRows(
              isLeap
                ? Math.ceil(monthPropertiesLeap[activeMonth].len / itemsPerRow)
                : Math.ceil(monthProperties[activeMonth].len / itemsPerRow),
            ).map((row) => {
              const cols = [];
              let upperBound = monthProperties[activeMonth].len;
              if (isLeap) {
                upperBound = monthPropertiesLeap[activeMonth].len;
              }
              for (
                let i = 1;
                i <= itemsPerRow && row * itemsPerRow + i <= upperBound;
                i += 1
              ) {
                cols.push(row * itemsPerRow + i);
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
