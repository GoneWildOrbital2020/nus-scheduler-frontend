/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, forwardRef, useEffect } from 'react';
import { makeStyles, Button, TextField } from '@material-ui/core';
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
    width: '75%',
    margin: '1em auto',
  },
  input: {
    display: 'none',
  },
}));

const Upload = (props) => {
  const { token, username } = props;
  const classes = useStyles();
  const [name, setName] = useState('');
  // const [file, setFile] = useState([]);
  // const [image, setImage] = useState([]);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const fetchFile = fetch(
      `http://localhost:8000/calendars/get/file/${username}/CS1101S`,
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
      `http://localhost:8000/calendars/get/image/${username}/CS1101S`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).then((res) => {
      return res.json();
    });
    Promise.all([fetchFile, fetchImage]).then((values) => {
      const file = values[0];
      const image = values[1];
      const newTableData = [];
      file.forEach((element) => {
        console.log(element);
        const obj = {};
        obj.name = element.fields.name;
        obj.date = '2020/06/17';
        obj.fileType = '.pdf';
        obj.download = `http://localhost:8000/media/${element.fields.file}`;
        newTableData.push(obj);
      });
      image.forEach((element) => {
        console.log(element);
        const obj = {};
        obj.name = element.fields.name;
        obj.date = '2020/06/17';
        obj.fileType = '.jpeg';
        obj.download = `http://localhost:8000/media/${element.fields.image}`;
        newTableData.push(obj);
      });
      setTableData(newTableData);
    });
  }, []);
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
      <MaterialTable
        icons={tableIcons}
        title="CS1101S Files"
        columns={[
          { title: 'Name', field: 'name' },
          { title: 'Date', field: 'date' },
          { title: 'File Type', field: 'fileType' },
          {
            title: 'Actions',
            field: 'download',
            render: (rowData) => {
              return (
                <Button
                  href={rowData.download}
                  color="primary"
                  component="span"
                  variant="contained"
                  style={{ color: 'white' }}
                >
                  Download
                </Button>
              );
            },
          },
        ]}
        data={[...tableData]}
      />
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
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
    username: state.username,
  };
};

export default connect(mapStateToProps)(Upload);
