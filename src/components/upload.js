/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, forwardRef, useEffect } from 'react';
import { makeStyles, Button, TextField, Paper } from '@material-ui/core';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { accent, light } from '../colors';
import Notification from './notification';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const useStyles = makeStyles(() => ({
  root: {
    width: '85%',
    margin: '1em auto',
    float: 'right',
  },
  table: {
    padding: '0 2rem',
  },
  input: {
    display: 'none',
  },
  paper: {
    height: '300px',
    backgroundColor: `${light}`,
    margin: '2rem auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '50%',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: `${accent}`,
    color: `${light}`,
  },
  textField: {
    width: '50%',
    margin: '0 auto',
  },
}));

const Upload = (props) => {
  const { token, username, name: groupName } = props;
  const classes = useStyles();
  const [name, setName] = useState('');
  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  useEffect(() => {
    const fetchFile = fetch(
      `http://localhost:8000/upload/get/file/${username}/${groupName}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).then((res) => {
      return res.json();
    });
    const fetchImage = fetch(
      `http://localhost:8000/upload/get/image/${username}/${groupName}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).then((res) => {
      return res.json();
    });
    Promise.all([fetchFile, fetchImage])
      .then((values) => {
        const file = values[0];
        const image = values[1];
        console.log(file);
        const newTableData = [];
        file.forEach((element) => {
          const obj = {};
          const currFile = element.fields.file;
          const date = element.fields.created_date;
          obj.name = element.fields.name;
          obj.date = `${date.substring(0, 10)} ${date.substring(11, 19)}`;
          obj.fileType = currFile.substring(
            currFile.lastIndexOf('.') + 1,
            currFile.length,
          );
          obj.download = `http://localhost:8000/media/${currFile}`;
          newTableData.push(obj);
        });
        image.forEach((element) => {
          const obj = {};
          const currImage = element.fields.image;
          const date = element.fields.created_date;
          obj.name = element.fields.name;
          obj.date = `${date.substring(0, 10)} ${date.substring(11, 19)}`;
          obj.fileType = currImage.substring(
            currImage.lastIndexOf('.') + 1,
            currImage.length,
          );
          obj.download = `http://localhost:8000/media/${currImage}`;
          newTableData.push(obj);
        });
        setTableData(newTableData);
      })
      .catch(() => {
        setSeverity('error');
        setOpen(true);
        setMessage('Failed to get files and images, please reload the page!');
      });
  }, []);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleUploadImage = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('name', name);
    data.append('image', event.target.files[0]);
    fetch(`http://localhost:8000/upload/image/${username}/${groupName}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((res) => {
        if (res.status !== 201) {
          throw new Error('Upload image failed, please try again!');
        } else {
          setSeverity('success');
          setOpen(true);
          setMessage('Upload image successful!');
          window.location.reload();
        }
      })
      .catch((err) => {
        setSeverity('error');
        setOpen(true);
        setMessage(err.message);
      });
  };

  const handleUploadFile = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('name', name);
    data.append('file', event.target.files[0]);
    fetch(`http://localhost:8000/upload/file/${username}/${groupName}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((res) => {
        if (res.status !== 201) {
          throw new Error('Upload file failed, please try again!');
        } else {
          setSeverity('success');
          setOpen(true);
          setMessage('Upload file successful!');
          window.location.reload();
        }
      })
      .catch((err) => {
        setSeverity('error');
        setOpen(true);
        setMessage(err.message);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.table}>
        <MaterialTable
          style={{
            backgroundColor: `${light}`,
          }}
          icons={tableIcons}
          title="CS1101S Files"
          columns={[
            {
              title: 'Name',
              field: 'name',
              headerStyle: {
                backgroundColor: `${light}`,
                fontWeight: 'bold',
              },
            },
            {
              title: 'Date',
              field: 'date',
              headerStyle: {
                backgroundColor: `${light}`,
                fontWeight: 'bold',
              },
            },
            {
              title: 'File Type',
              field: 'fileType',
              headerStyle: {
                backgroundColor: `${light}`,
                fontWeight: 'bold',
              },
            },
            {
              title: 'Actions',
              field: 'download',
              headerStyle: {
                backgroundColor: `${light}`,
                fontWeight: 'bold',
              },
              render: (rowData) => {
                const handleRedirect = (event) => {
                  event.preventDefault();
                  window.open(rowData.download);
                };
                return (
                  <Button
                    onClick={handleRedirect}
                    component="span"
                    variant="contained"
                    style={{ backgroundColor: `${accent}`, color: `${light}` }}
                  >
                    Download
                  </Button>
                );
              },
            },
          ]}
          data={[...tableData]}
        />
      </div>
      <Paper className={classes.paper}>
        <h1>Upload Files & Images</h1>
        <TextField
          label="name"
          variant="outlined"
          required
          value={name}
          onChange={handleChangeName}
          className={classes.textField}
        />
        <div className={classes.buttons}>
          <label htmlFor="image-upload">
            <input
              className={classes.input}
              id="image-upload"
              type="file"
              onChange={handleUploadImage}
            />
            <Button
              variant="contained"
              className={classes.button}
              component="span"
              disabled={!name}
            >
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
            <Button
              variant="contained"
              className={classes.button}
              component="span"
              disabled={!name}
            >
              Upload File
            </Button>
          </label>
          <Notification
            open={open}
            handleClose={handleClose}
            severity={severity}
            message={message}
          />
        </div>
      </Paper>
    </div>
  );
};

Upload.propTypes = {
  token: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
    username: state.username,
  };
};

export default connect(mapStateToProps)(Upload);
