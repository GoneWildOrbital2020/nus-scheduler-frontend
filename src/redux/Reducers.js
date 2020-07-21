import {
  CHANGE_ACTIVE_MONTH,
  CHANGE_ACTIVE_YEAR,
  CHANGE_ACTIVE_DATE,
  ADD_NUM_OF_EVENTS,
  TOGGLE_LOGIN,
  TOGGLE_LOGOUT,
  IS_LOADING_TRUE,
  IS_LOADING_FALSE,
} from './Actions';

const date = new Date();

const initalState = {
  username: window.localStorage.getItem('username'),
  numOfEvents: 0,
  activeMonth: date.getUTCMonth(),
  activeYear: date.getUTCFullYear(),
  isLoggedIn: window.localStorage.getItem('isLoggedIn'),
  token: window.localStorage.getItem('token'),
  email: window.localStorage.getItem('email'),
  avatar: window.localStorage.getItem('avatar'),
  logoutTime: window.localStorage.getItem('logoutTime'),
  isLoading: 0,
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
        activeYear: action.year,
      };
    case CHANGE_ACTIVE_DATE:
      return {
        ...state,
        activeYear: action.year,
        activeMonth: action.month,
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
        email: action.email,
        token: action.token,
        username: action.username,
        avatar: action.avatar,
        logoutTime: action.logoutTime,
      };
    case TOGGLE_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        username: '',
        email: '',
        avatar: '',
        logoutTime: null,
      };
    case IS_LOADING_TRUE:
      return {
        ...state,
        isLoading: state.isLoading + 1,
      };
    case IS_LOADING_FALSE:
      return {
        ...state,
        isLoading: state.isLoading - 1,
      };
    default:
      return state;
  }
};

export default reducer;
