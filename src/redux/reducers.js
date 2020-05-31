import { CHANGE_ACTIVE_MONTH, ADD_NUM_OF_EVENTS } from './actions';

const initalState = {
  userId: 0,
  numOfEvents: 0,
  activeMonth: 0,
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case CHANGE_ACTIVE_MONTH:
      return {
        ...state,
        activeMonth: (((state.activeMonth + action.diff) % 12) + 12) % 12,
      };
    case ADD_NUM_OF_EVENTS:
      return {
        ...state,
        numOfEvents: state.numOfEvents + action.val,
      };
    default:
      return state;
  }
};

export default reducer;
