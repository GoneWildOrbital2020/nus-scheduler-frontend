import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import DayTile from './Day/DayTile';
import { monthProperties, monthPropertiesLeap, url } from './constant';

const Month = ({ activeMonth, activeYear, token }) => {
  const [isLeap, setIsLeap] = useState(false);
  const rows = [0, 1, 2, 3, 4];

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
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
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
              <DayTile index={col} key={col} />
            ))}
          </Grid>
        );
      })}
    </Grid>
  );
};

Month.propTypes = {
  activeMonth: PropTypes.number.isRequired,
  activeYear: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  activeMonth: state.activeMonth,
  activeYear: state.activeYear,
  token: state.token,
});

export default connect(mapStateToProps)(Month);
