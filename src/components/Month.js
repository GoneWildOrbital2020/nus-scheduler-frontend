import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import DayTile from './Day/DayTile';
import { monthProperties } from './constant';

const Month = ({ activeMonth }) => {
  const rows = [0, 1, 2, 3, 4];
  return (
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
};

const mapStateToProps = (state) => ({
  activeMonth: state.activeMonth,
});

export default connect(mapStateToProps)(Month);
