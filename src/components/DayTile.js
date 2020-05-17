import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Button } from '@material-ui/core';
import './DayTile.css';

class DayTile extends React.Component {
  constructor(props) {
    super(props);
    this.index = props.index;
    this.events = props.events;
  }

  render() {
    return (
      <Button
        variant="outlined"
        classes={{
          root: 'tileRoot',
          outlined: 'tileOutlined',
          label: 'tileContainer',
        }}>
        <div className="tileNumber">{this.index}</div>
        <div className="tileEvents">
          {this.events.map((event) => (
            <Paper
              className="tileEvent"
              square={true}
              style={{ background: event.color }}>
              {event.title}
            </Paper>
          ))}
        </div>
      </Button>
    );
  }
}

export default DayTile;

DayTile.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      title: PropTypes.string,
      desc: PropTypes.string,
      start: PropTypes.string,
      end: PropTypes.string,
      location: PropTypes.string,
    }),
  ),
  index: PropTypes.number.isRequired,
};

DayTile.defaultProps = {
  events: [],
};
