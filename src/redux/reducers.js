import {
  CHANGE_ACTIVE_MONTH,
  ADD_NUM_OF_EVENTS,
  TOGGLE_LOGIN,
  TOGGLE_LOGOUT,
} from './actions';

const initalState = {
  username: window.localStorage.getItem('username'),
  numOfEvents: 0,
  activeMonth: 0,
  isLoggedIn: window.localStorage.getItem('isLoggedIn'),
  token: window.localStorage.getItem('token'),
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
    case TOGGLE_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        token: action.token,
        username: action.username,
      };
    case TOGGLE_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        username: '',
      };
    default:
      return state;
  }
};

export default reducer;
