/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import {
  Paper,
  makeStyles,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Grid,
} from '@material-ui/core';
import { Alarm, Edit, Close } from '@material-ui/icons';
import { DatePicker } from '@material-ui/pickers';
import { groupBy } from 'lodash';
import { light, dark, medium } from '../colors';
import { url } from './constant';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '85%',
    [theme.breakpoints.down('md')]: {
      width: '75%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    float: 'right',
    display: 'flex',
    padding: '1.5rem',
  },
  title: {
    color: light,
    marginBottom: '0.5rem',
  },
  column: {
    margin: '0.5rem',
    width: 'calc((100% - 4rem) / 4)',
    [theme.breakpoints.down('md')]: {
      width: 'calc((100% - 2rem) / 2)',
    },
    [theme.breakpoints.down('xs')]: {
      width: 'calc(100% - 1rem)',
    },
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#384241',
    paddingTop: '2rem',
    height: 'fit-content',
    maxHeight: '100vh',
  },
  drop: {
    padding: '0rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    transition: 'color 2s',
    overflowY: 'scroll',
    minHeight: '2rem',
  },
  item: {
    margin: '0.5rem 0',
    backgroundColor: light,
    color: dark,
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '&:hover': {
      backgroundColor: '#EDEAE6',
      transition: 'color 2s',
    },
  },
  itemTitle: {
    color: dark,
  },
  itemText: {
    marginLeft: '0.5rem',
    color: medium,
  },
  itemFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: '0.5rem',
  },
  icon: {
    color: medium,
  },
  iconButton: {
    padding: 0,
    marginLeft: 'auto',
  },
  addButton: {
    marginTop: '1rem',
    color: light,
  },
  dialog: {
    zIndex: 1401,
  },
  dialogHeader: {
    backgroundColor: light,
    color: dark,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '2rem 1.5rem 0.5rem 1.5rem',
  },
  dialogTitle: {
    color: dark,
  },
  dialogContent: {
    backgroundColor: light,
  },
  dialogSubtitleFirst: {
    color: dark,
  },
  dialogSubtitle: {
    color: dark,
    marginTop: '1rem',
  },
  dialogAction: {
    padding: '0.5rem 1.5rem 2rem 1.5rem',
    backgroundColor: light,
  },
  button: {
    color: light,
  },
}));

const toDo = 'todo';
const onHold = 'onhold';
const inProgress = 'inprogress';
const done = 'done';
const cols = [
  { id: toDo, title: 'To Do' },
  { id: onHold, title: 'On Hold' },
  { id: inProgress, title: 'In Progress' },
  { id: done, title: 'Done' },
];

const Tasks = ({ name, token }) => {
  const classes = useStyles();
  const [items, setItems] = React.useState({
    [toDo]: [],
    [onHold]: [],
    [inProgress]: [],
    [done]: [],
  });
  const fetchTasks = () =>
    fetch(`${url}/tasks/${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  React.useEffect(() => {
    fetchTasks()
      .then((response) => response.json())
      .then((data) =>
        setItems((state) => ({
          ...state,
          ...groupBy(
            data
              .map((task) => ({ ...task.fields, id: task.pk }))
              .map((x) => ({
                id: x.id.toString(),
                title: x.title,
                description: x.description,
                date: x.due_date ? new Date(x.due_date) : null,
                colId: x.column_id,
                index: x.index,
              })),
            'colId',
          ),
        })),
      );
  }, [name]);
  const [curItem, setCurItem] = React.useState({});
  console.log(items);
  const updatePos = (item) => {
    fetch(`${url}/tasks/${name}/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: { index: item.index, column_id: item.colId },
      }),
    });
  };
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    console.log(result);
    const item = {
      ...items[source.droppableId][source.index],
      index: destination.index,
      colId: destination.droppableId,
    };
    updatePos(item);

    if (source.droppableId === destination.droppableId) {
      if (source.index < destination.index) {
        const newSource = [
          ...items[source.droppableId].slice(0, source.index),
          ...items[source.droppableId]
            .slice(source.index + 1, destination.index + 1)
            .map((x) => {
              const newItem = { ...x, index: x.index - 1 };
              updatePos(newItem);
              return newItem;
            }),
          item,
          ...items[source.droppableId].slice(
            destination.index + 1,
            items[source.droppableId].length,
          ),
        ];
        setItems((state) => ({
          ...state,
          [source.droppableId]: newSource,
        }));
      } else {
        const newSource = [
          ...items[source.droppableId].slice(0, destination.index),
          item,
          ...items[source.droppableId]
            .slice(destination.index, source.index)
            .map((x) => {
              const newItem = { ...x, index: x.index + 1 };
              updatePos(newItem);
              return newItem;
            }),
          ...items[source.droppableId].slice(
            source.index + 1,
            items[source.droppableId].length,
          ),
        ];
        setItems((state) => ({
          ...state,
          [source.droppableId]: newSource,
        }));
      }
      return;
    }
    const newSource = [
      ...items[source.droppableId].slice(0, source.index),
      ...items[source.droppableId]
        .slice(source.index + 1, items[source.droppableId].length)
        .map((x) => {
          const newItem = { ...x, index: x.index - 1 };
          updatePos(newItem);
          return newItem;
        }),
    ];
    const newDest = [
      ...items[destination.droppableId].slice(0, destination.index),
      item,
      ...items[destination.droppableId]
        .slice(destination.index, items[destination.droppableId].length)
        .map((x) => {
          const newItem = { ...x, index: x.index + 1 };
          updatePos(newItem);
          return newItem;
        }),
    ];
    setItems((state) => ({
      ...state,
      [source.droppableId]: newSource,
      [destination.droppableId]: newDest,
    }));
  };
  const [open, setOpen] = React.useState(false);
  const handleAdd = (colId) => () => {
    setCurItem({
      add: true,
      date: null,
      colId,
      index: items[colId].length,
    });
    setOpen(true);
  };
  const handleEdit = (item) => () => {
    setCurItem({ edit: true, ...item });
    setOpen(true);
  };
  const handleChange = (type) => (e) => {
    const val = e.target.value;
    setCurItem((state) => ({ ...state, [type]: val }));
  };
  const handleDateChange = (value) => {
    setCurItem((state) => ({ ...state, date: value }));
  };
  const handleSave = () => {
    if (curItem.add) {
      const { add, ...newItem } = curItem;
      fetch(`${url}/tasks/${name}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            title: newItem.title,
            description: newItem.description,
            due_date: newItem.date,
            column_id: newItem.colId,
            index: newItem.index,
          },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setItems((state) => ({
            ...state,
            [curItem.colId]: state[curItem.colId].concat([
              { ...newItem, id: data.id.toString() },
            ]),
          }));
        });
    } else {
      const { edit, ...newItem } = curItem;
      fetch(`${url}/tasks/${name}/${curItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            title: newItem.title,
            description: newItem.description,
            due_date: newItem.date,
          },
        }),
      });

      setItems((state) => ({
        ...state,
        [curItem.colId]: state[curItem.colId].map((item) =>
          item.id === curItem.id ? { ...newItem } : item,
        ),
      }));
    }
    setOpen(false);
  };
  const handleDelete = () => {
    fetch(`${url}/tasks/${name}/${curItem.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    setItems((state) => ({
      ...state,
      [curItem.colId]: state[curItem.colId].filter((x) => x.id !== curItem.id),
    }));
    setOpen(false);
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Grid container item className={classes.container}>
        {cols.map((col) => (
          <Paper className={classes.column}>
            <Typography variant="h5" className={classes.title}>
              {col.title}
            </Typography>
            <Droppable droppableId={col.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className={classes.drop}
                  style={{
                    backgroundColor: snapshot.isDraggingOver
                      ? 'rgba(107, 127, 130, 0.2)'
                      : 'rgba(107, 127, 130, 0)',
                  }}
                  {...provided.droppableProps}
                >
                  {items[col.id]
                    .sort((a, b) => a.index - b.index)
                    .map((item) => (
                      <Draggable
                        draggableId={item.id}
                        index={item.index}
                        key={item.id}
                      >
                        {(prov, snap) => (
                          <Paper
                            ref={prov.innerRef}
                            {...prov.draggableProps}
                            {...prov.dragHandleProps}
                            elevation={snap.isDragging ? 15 : 1}
                            className={classes.item}
                            style={{
                              backgroundColor: snap.isDragging
                                ? '#EDEAE6'
                                : light,
                              ...prov.draggableProps.style,
                            }}
                          >
                            <Typography className={classes.itemTitle}>
                              {item.title}
                            </Typography>
                            <div className={classes.itemFooter}>
                              <Alarm className={classes.icon} />
                              <Typography className={classes.itemText}>
                                {item.date
                                  ? item.date.toDateString().substr(4)
                                  : null}
                              </Typography>
                              <IconButton
                                className={classes.iconButton}
                                onClick={handleEdit(item)}
                              >
                                <Edit className={classes.icon} />
                              </IconButton>
                            </div>
                          </Paper>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Button className={classes.addButton} onClick={handleAdd(col.id)}>
              Add New Task
            </Button>
          </Paper>
        ))}
      </Grid>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className={classes.dialog}
      >
        <div className={classes.dialogHeader}>
          <Typography variant="h5" className={classes.dialogTitle}>
            {`${curItem.add ? 'Add' : 'Edit'} Task`}
          </Typography>
          <IconButton
            onClick={() => setOpen(false)}
            className={classes.iconButton}
          >
            <Close className={classes.icon} />
          </IconButton>
        </div>
        <DialogContent className={classes.dialogContent}>
          <Typography variant="body2" className={classes.dialogSubtitleFirst}>
            Title:
          </Typography>
          <TextField
            variant="outlined"
            onChange={handleChange('title')}
            defaultValue={curItem.title}
            fullWidth
          />
          <Typography variant="body2" className={classes.dialogSubtitle}>
            Description:
          </Typography>
          <TextField
            variant="outlined"
            onChange={handleChange('description')}
            multiline
            rows={2}
            rowsMax={5}
            defaultValue={curItem.description}
            fullWidth
          />
          <Typography variant="body2" className={classes.dialogSubtitle}>
            Due date:
          </Typography>
          <DatePicker
            inputVariant="outlined"
            onChange={handleDateChange}
            value={curItem.date}
          />
        </DialogContent>
        <DialogActions className={classes.dialogAction}>
          {curItem.edit ? (
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={handleDelete}
            >
              Delete
            </Button>
          ) : null}
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </DragDropContext>
  );
};

Tasks.propTypes = {
  name: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps)(Tasks);
