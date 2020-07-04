import {
  CHANGE_ACTIVE_MONTH,
  CHANGE_ACTIVE_YEAR,
  ADD_NUM_OF_EVENTS,
  TOGGLE_LOGIN,
  TOGGLE_LOGOUT,
} from './actions';

const initalState = {
  username: window.localStorage.getItem('username'),
  numOfEvents: 0,
  activeMonth: 0,
  activeYear: 2020,
  isLoggedIn: window.localStorage.getItem('isLoggedIn'),
  token: window.localStorage.getItem('token'),
  email: window.localStorage.getItem('email'),
  avatar: window.localStorage.getItem('avatar'),
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case CHANGE_ACTIVE_MONTH:
      return {
        ...state,
        activeMonth: (((state.activeMonth + action.diff) % 12) + 12) % 12,
      };
    case CHANGE_ACTIVE_YEAR:
      return {
        ...state,
        activeYear: action.diff,
      }
    case ADD_NUM_OF_EVENTS:
      return {
        ...state,
        numOfEvents: state.numOfEvents + action.val,
      };
    case TOGGLE_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        email: action.email,
        token: action.token,
        username: action.username,
        avatar: action.avatar,
      };
    case TOGGLE_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        username: '',
        email: '',
        avatar: '',
      };
    default:
      return state;
  }
};

export default reducer;
