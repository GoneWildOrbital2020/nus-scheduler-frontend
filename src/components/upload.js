import React, { useState } from 'react';
import { makeStyles, Button, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {},
  input: {
    display: 'none',
  },
}));

const Upload = (props) => {
  const { token } = props;
  const classes = useStyles();
  const [name, setName] = useState('');
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleUploadImage = (event) => {
    event.preventDefault();
    console.log(event.target.files[0]);
    const data = new FormData();
    data.append('name', name);
    data.append('image', event.target.files[0]);
    console.log(data);
    fetch('http://localhost:8000/calendars/upload/image/CS1101S', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleUploadFile = (event) => {
    event.preventDefault();
    console.log(event.target.files[0]);
    const data = new FormData();
    data.append('name', name);
    data.append('file', event.target.files[0]);
    console.log(data);
    fetch('http://localhost:8000/calendars/upload/file/CS1101S', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={classes.root}>
      <label htmlFor="image-upload">
        <input
          className={classes.input}
          id="image-upload"
          type="file"
          onChange={handleUploadImage}
        />
        <Button variant="contained" color="primary" component="span">
          Upload Image
        </Button>
      </label>
      <label htmlFor="file-upload">
        <input
          className={classes.input}
          id="file-upload"
          type="file"
          onChange={handleUploadFile}
        />
        <Button variant="contained" color="primary" component="span">
          Upload File
        </Button>
      </label>
      <TextField
        label="name"
        variant="outlined"
        value={name}
        onChange={handleChangeName}
      />
    </div>
  );
};

Upload.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps)(Upload);
