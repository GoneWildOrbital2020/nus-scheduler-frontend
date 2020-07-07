import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Tasks = ({ name }) => {
  return <DragDropContext />;
};

Tasks.propTypes = {
  name: PropTypes.string.isRequired,
};
export default connect(Tasks);
