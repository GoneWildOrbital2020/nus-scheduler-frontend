import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import reducer from './redux/reducers';
import AutomaticLogout from './components/AutomaticLogout';
import LandingPage from './components/LandingPage';
import Pages from './Pages';
import { themeLandingPage } from './theme';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route
              path="/page"
              exact
              component={() => (
                <ThemeProvider theme={themeLandingPage}>
                  <ScopedCssBaseline>
                    <LandingPage />
                  </ScopedCssBaseline>
                </ThemeProvider>
              )}
            />
            <Route path="/" component={Pages} />
          </Switch>
          <AutomaticLogout />
        </Router>
      </Provider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
