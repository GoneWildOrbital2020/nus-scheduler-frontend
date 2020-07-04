import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavbarDrawer />
          <div className="content" style={{ marginTop: '75px' }}>
            <Switch>
              <Route
                path="/"
                exact
                component={() => <Calendar monthIdx={0} />}
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
              <Route
                path={`/profile/${store.getState().username}`}
                exact
                render={() => <Profile />}
              />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
