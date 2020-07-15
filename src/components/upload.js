/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, forwardRef, useEffect } from 'react';
import {
  makeStyles,
  Button,
  TextField,
  Paper,
  IconButton,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import MaterialTable, { MTableToolbar } from 'material-table';
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
import { light, dark } from '../colors';
import Notification from './notification';
import { url, monthProperties } from './constant';

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '85%',
    [theme.breakpoints.down('md')]: {
      width: '75%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
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
    backgroundColor: `${light}`,
    margin: '2rem',
    padding: '2rem',
    textAlign: 'left',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      flexDirection: 'column',
      width: 'max-content',
    },
  },
  buttons: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'space-around',
    },
  },
  button: {
    color: `${light}`,
  },
  textField: {
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  typography: {
    fontSize: '1.5rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
    fontWeight: 'bold',
    color: dark,
  },
  typography2: {
    fontSize: '1.5rem',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1rem',
    },
    fontWeight: 'bold',
    marginBottom: '1rem',
    alignSelf: 'flex-start',
  },
  gutters: {
    paddingLeft: '0',
    paddingRight: '0',
    [theme.breakpoints.up('md')]: {
      paddingLeft: '1rem',
    },
  },
  searchField: {
    paddingLeft: '0',
  },
}));

const Upload = (props) => {
  const { token, name: groupName } = props;
  const classes = useStyles();
  const extraSmall = useMediaQuery((theme) => theme.breakpoints.down('xs'));
  const [name, setName] = useState('');
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  useEffect(() => {
    const fetchFile = fetch(`${url}/upload/get/file/${groupName}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.json();
    });

    const fetchImage = fetch(`${url}/upload/get/image/${groupName}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      return res.json();
    });

    const fetchTotal = fetch(`${url}/upload/get/totalfiles/`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    Promise.all([fetchFile, fetchImage, fetchTotal])
      .then((values) => {
        const file = values[0];
        const image = values[1];
        const newTableData = [];
        file.forEach((element) => {
          const obj = {};
          const currFile = element.fields.file;
          const time = Date.parse(element.fields.created_date);
          const date = new Date(time);
          const day = date.getUTCDate();
          const month = monthProperties[date.getUTCMonth()].name;
          const year = date.getUTCFullYear();
          const hourMinuteSecond = date.toTimeString().substring(0, 8);
          obj.identifier = element.fields.identifier;
          obj.name = element.fields.name;
          obj.date = `${day} ${month} ${year} ${hourMinuteSecond}`;
          obj.fileType = currFile.substring(
            currFile.lastIndexOf('.') + 1,
            currFile.length,
          );
          obj.download = `${url}/media/${currFile}`;
          newTableData.push(obj);
        });
        image.forEach((element) => {
          const obj = {};
          const currImage = element.fields.image;
          const time = Date.parse(element.fields.created_date);
          const date = new Date(time);
          const day = date.getUTCDate();
          const month = monthProperties[date.getUTCMonth()].name;
          const year = date.getUTCFullYear();
          const hourMinuteSecond = date.toTimeString().substring(0, 8);
          obj.identifier = element.fields.identifier;
          obj.name = element.fields.name;
          obj.date = `${day} ${month} ${year} ${hourMinuteSecond}`;
          obj.fileType = currImage.substring(
            currImage.lastIndexOf('.') + 1,
            currImage.length,
          );
          obj.download = `${url}/media/${currImage}`;
          newTableData.push(obj);
        });
        setTableData(newTableData);
        setTotal(values[2].total);
        setSeverity('success');
        setOpen(true);
        setMessage('Fetch files and images successful!');
      })
      .catch(() => {
        setSeverity('error');
        setOpen(true);
        setMessage('Failed to fetch files and images!');
      });
  }, []);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleUploadImage = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('identifier', total + 1);
    data.append('name', name);
    data.append('image', event.target.files[0]);
    fetch(`${url}/upload/image/${groupName}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((res) => {
        if (res.status !== 201) {
          throw new Error('Upload image failed!');
        } else {
          setTotal(total + 1);
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
    data.append('identifier', total + 1);
    data.append('name', name);
    data.append('file', event.target.files[0]);
    fetch(`${url}/upload/file/${groupName}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((res) => {
        if (res.status !== 201) {
          throw new Error('Upload file failed!');
        } else {
          setTotal(total + 1);
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

  const handleDelete = (rowData) => {
    const data = {
      identifier: rowData.identifier,
    };
    fetch(`${url}/upload/delete/files/${groupName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Delete files failed!');
        } else {
          const newTableData = [...tableData];
          const index = newTableData.findIndex(
            (element) => element.name === rowData.name,
          );
          if (index === -1) {
            throw new Error('File not found!');
          }
          newTableData.splice(index, 1);
          setTableData(newTableData);
          setSeverity('success');
          setOpen(true);
          setMessage('Delete files successful!');
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
            padding: '2rem 1rem',
          }}
          icons={tableIcons}
          title={(
            <Typography className={classes.typography}>
              Files & Images
            </Typography>
          )}
          columns={
            !extraSmall
              ? [
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
                        <>
                          <IconButton onClick={handleRedirect}>
                            <GetAppIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              handleDelete(rowData);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      );
                    },
                  },
                ]
              : [
                  {
                    title: 'Name',
                    field: 'name',
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
                        <>
                          <IconButton
                            onClick={handleRedirect}
                            style={{ padding: '0.25rem' }}
                          >
                            <GetAppIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              handleDelete(rowData);
                            }}
                            style={{ padding: '0.25rem' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      );
                    },
                  },
                ]
          }
          components={{
            Toolbar: (propsTable) => (
              <MTableToolbar
                classes={{
                  root: classes.gutters,
                  searchField: classes.searchField,
                }}
                {...propsTable}
              />
            ),
          }}
          data={[...tableData]}
        />
      </div>
      <Paper className={classes.paper}>
        <Typography className={classes.typography2}>
          Upload Files & Images
        </Typography>
        <div className={classes.buttons}>
          <TextField
            label="name"
            required
            value={name}
            onChange={handleChangeName}
            className={classes.textField}
          />
          <label htmlFor="image-upload">
            <input
              className={classes.input}
              id="image-upload"
              type="file"
              onChange={handleUploadImage}
              disabled={!name}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              component="span"
              disabled={!name}
              style={
                extraSmall
                  ? {
                      margin: '1rem 0',
                      display: 'block',
                      width: '75%',
                      textAlign: 'center',
                    }
                  : { margin: '0 1rem' }
              }
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
              disabled={!name}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              component="span"
              disabled={!name}
              style={extraSmall ? { width: '75%', textAlign: 'center' } : {}}
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
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps)(Upload);
