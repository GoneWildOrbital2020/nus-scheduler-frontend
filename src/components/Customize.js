import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { groupBy } from 'lodash';
import { url } from './constant';

const Customize = ({ name, username, token }) => {
  const [events, setEvents] = React.useState({});
  const fetchEvents = fetch(`${url}/events/${username}/${name}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(events);

  React.useEffect(() => {
    fetchEvents
      .then((response) => response.json())
      .then((data) =>
        setEvents(
          groupBy(
            data.map((x) => x.fields),
            'repeated_event',
          ),
        ),
      );
  }, []);

  return (
    <>
      {Object.entries(events).map(([_key, value]) => (
        <Typography>{value[0].title}</Typography>
      ))}
    </>
  );
};

Customize.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.username,
  token: state.token,
});

export default connect(mapStateToProps)(Customize);
