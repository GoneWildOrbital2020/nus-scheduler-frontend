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
} from '@material-ui/core';
import { Alarm, Edit, Close } from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { light, dark, medium } from '../colors';

const useStyles = makeStyles(() => ({
  container: {
    width: 'calc(85% - 3rem)',
    float: 'right',
    display: 'flex',
    padding: '1.5rem',
  },
  title: {
    fontSize: '1.5rem',
    color: light,
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  column: {
    margin: '0.5rem',
    width: 'calc((100% - 4rem) / 4)',
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 90px - 4rem)',
    backgroundColor: '#384241',
    paddingTop: '2rem',
  },
  drop: {
    height: '100%',
    padding: '0rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    transition: 'color 2s',
    overflowY: 'scroll',
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
    fontSize: '1.5rem',
    color: dark,
    fontWeight: 'bold',
  },
  dialogContent: {
    backgroundColor: light,
  },
  dialogSubtitleFirst: {
    fontWeight: 'bold',
    color: dark,
  },
  dialogSubtitle: {
    fontWeight: 'bold',
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

const Tasks = ({ name }) => {
  const classes = useStyles();
  const [items, setItems] = React.useState({
    [toDo]: [],
    [onHold]: [],
    [inProgress]: [],
    [done]: [],
  });
  const [curItem, setCurItem] = React.useState({});
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

    const item = { ...items[source.droppableId][source.index] };

    if (source.droppableId === destination.droppableId) {
      const newSource = [...items[source.droppableId]];
      newSource[source.index] = newSource[destination.index];
      newSource[destination.index] = item;
      setItems((state) => ({
        ...state,
        [source.droppableId]: newSource,
      }));
      return;
    }
    const newSource = [
      ...items[source.droppableId].slice(0, source.index),
      ...items[source.droppableId].slice(
        source.index + 1,
        items[source.droppableId].length,
      ),
    ];
    const newDest = [
      ...items[destination.droppableId].slice(0, destination.index),
      item,
      ...items[destination.droppableId].slice(
        destination.index,
        items[destination.droppableId].length,
      ),
    ];
    setItems((state) => ({
      ...state,
      [source.droppableId]: newSource,
      [destination.droppableId]: newDest,
    }));
  };
  const [open, setOpen] = React.useState(false);
  const handleAdd = (colId) => () => {
    setCurItem({ add: true, date: new Date(), colId });
    setOpen(true);
  };
  const handleEdit = (colId, item) => () => {
    setCurItem({ edit: true, ...item, colId });
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
      setItems((state) => ({
        ...state,
        [curItem.colId]: state[curItem.colId].concat([
          { ...newItem, id: curItem.title },
        ]),
      }));
    }
    setOpen(false);
  };
  const handleDelete = () => {
    setItems((state) => ({
      ...state,
      [curItem.colId]: state[curItem.colId].filter((x) => x.id !== curItem.id),
    }));
    setOpen(false);
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={classes.container}>
        {cols.map((col) => (
          <Paper className={classes.column}>
            <Typography className={classes.title}>{col.title}</Typography>
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
                  {items[col.id].map((item, index) => (
                    <Draggable
                      draggableId={item.id}
                      index={index}
                      key={item.id}
                    >
                      {(prov, snap) => (
                        <Paper
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
                          elevation={snap.isDragging ? 15 : 1}
                          className={classes.item}
                        >
                          <Typography className={classes.itemTitle}>
                            {item.title}
                          </Typography>
                          <div className={classes.itemFooter}>
                            <Alarm className={classes.icon} />
                            <Typography className={classes.itemText}>
                              {item.date.toDateString().substr(4)}
                            </Typography>
                            <IconButton
                              className={classes.iconButton}
                              onClick={handleEdit(col.id, item)}
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
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className={classes.dialog}
      >
        <div className={classes.dialogHeader}>
          <Typography className={classes.dialogTitle}>
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
          <Typography className={classes.dialogSubtitleFirst}>
            Title:
          </Typography>
          <TextField
            variant="outlined"
            onChange={handleChange('title')}
            defaultValue={curItem.title}
            fullWidth
          />
          <Typography className={classes.dialogSubtitle}>
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
          <Typography className={classes.dialogSubtitle}>Due date:</Typography>
          <KeyboardDatePicker
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
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
    username: state.username,
  };
};

export default connect(mapStateToProps)(Tasks);
