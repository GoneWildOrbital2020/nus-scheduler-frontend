export const CHANGE_ACTIVE_MONTH = 'CHANGE_ACTIVE_MONTH';

export const changeActiveMonth = (diff) => ({
  type: CHANGE_ACTIVE_MONTH,
  diff,
});

export const CHANGE_ACTIVE_YEAR = 'CHANGE_ACTIVE_YEAR';

export const changeActiveYear = (year) => ({
  type: CHANGE_ACTIVE_YEAR,
  year,
});

export const CHANGE_ACTIVE_DATE = 'CHANGE_ACTIVE_DATE';

export const changeActiveDate = (year, month) => ({
  type: CHANGE_ACTIVE_DATE,
  year,
  month,
});

export const ADD_NUM_OF_EVENTS = 'ADD_NUM_OF_EVENTS';

export const addNumOfEvents = (val) => ({
  type: ADD_NUM_OF_EVENTS,
  val,
});

export const TOGGLE_LOGIN = 'TOGGLE_LOGIN';

export const toggleLogin = (email, token, username, avatar, logoutTime) => ({
  type: TOGGLE_LOGIN,
  email,
  token,
  username,
  avatar,
  logoutTime,
});

export const TOGGLE_LOGOUT = 'TOGGLE_LOGOUT';

export const toggleLogout = () => ({
  type: TOGGLE_LOGOUT,
});

export const IS_LOADING_TRUE = 'IS_LOADING_TRUE';

export const isLoadingTrue = () => ({
  type: IS_LOADING_TRUE,
});

export const IS_LOADING_FALSE = 'IS_LOADING_FALSE';

export const isLoadingFalse = () => ({
  type: IS_LOADING_FALSE,
});
