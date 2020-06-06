export const CHANGE_ACTIVE_MONTH = 'CHANGE_ACTIVE_MONTH';

export const changeActiveMonth = (diff) => ({
  type: CHANGE_ACTIVE_MONTH,
  diff,
});

export const ADD_NUM_OF_EVENTS = 'ADD_NUM_OF_EVENTS';

export const addNumOfEvents = (val) => ({
  type: ADD_NUM_OF_EVENTS,
  val,
});

export const TOGGLE_LOGIN = 'TOGGLE_LOGIN';

export const toggleLogin = (token) => ({
  type: TOGGLE_LOGIN,
  token,
});

export const TOGGLE_LOGOUT = 'TOGGLE_LOGOUT';

export const toggleLogout = () => ({
  type: TOGGLE_LOGOUT,
});