import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Calendar from './components/Calendar';
import reducer from './redux/reducers';
import Login from './components/login';
import Signup from './components/signup';
import Footer from './components/footer';
import Upload from './components/upload';
import NotesGrid from './components/notesGrid';
import NavbarDrawer from './components/NavbarDrawer';
import EventGroup from './components/EventGroup';
import Profile from './components/profile';
import AutomaticLogout from './components/AutomaticLogout';
import Authenticate from './components/Authenticate';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import theme from './theme';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <div className="App">
              <NavbarDrawer />
              <div className="content" style={{ marginTop: '75px' }}>
                <Switch>
                  <Route path="/" exact component={Calendar} />
                  <Route
                    path="/activate/:email/:token"
                    render={({ match }) => (
                      <Authenticate
                        email={match.params.email}
                        token={match.params.token}
                      />
                    )}
                  />
                  <Route
                    path="/reset/:email/:token"
                    render={({ match }) => (
                      <ResetPassword
                        email={match.params.email}
                        token={match.params.token}
                      />
                    )}
                  />
                  <Route path="/login" exact component={Login} />
                  <Route path="/signup" exact component={Signup} />
                  <Route
                    path="/events-group/:name"
                    render={({ match }) => (
                      <EventGroup name={match.params.name} path={match.path} />
                    )}
                  />
                  <Route path="/upload" exact component={Upload} />
                  <Route path="/upload/notes" exact component={NotesGrid} />
                  <Route path="/profile" exact render={() => <Profile />} />
                  <Route
                    path="/forgotPassword"
                    exact
                    component={ForgotPassword}
                  />
                </Switch>
              </div>
              <Footer />
            </div>
            <AutomaticLogout />
          </Router>
        </Provider>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
