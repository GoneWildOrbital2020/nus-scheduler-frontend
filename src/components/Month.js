import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import Loader from 'react-loader-spinner';
import DayTile from './Day/DayTile';
import { monthProperties, url } from './constant';
import Notification from './notification';
import { light } from '../colors';

const Month = ({ activeMonth, username, token }) => {
  const [openAlert, setOpenAlert] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState('success');

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const [currEvents, setCurrEvents] = React.useState({ empty: true });
  const fetchEvents = async () => {
    const response = await fetch(
      `${url}/calendars/${username}/${activeMonth}`,
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
          setOpenAlert(true);
          setMessage(err.message);
        });
    };
    getEvents();
  }, [activeMonth]);
  const rows = [0, 1, 2, 3, 4];
  return (
    <>
      {!currEvents.empty ? (
        <>
          <Grid container direction="column" style={{ width: 'max-content' }}>
            {rows.map((row) => {
              const cols = [];
              for (
                let i = 1;
                i <= 7 && row * 7 + i <= monthProperties[activeMonth].len;
                i += 1
              ) {
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
            open={openAlert}
            handleClose={handleCloseAlert}
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
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeMonth: state.activeMonth,
  username: state.username,
  token: state.token,
});

export default connect(mapStateToProps)(Month);
