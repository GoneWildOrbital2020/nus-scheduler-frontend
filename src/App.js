import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import reducer from './redux/Reducers';
import { themeLandingPage } from './Theme';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */
const Pages = React.lazy(() => import('./Pages'));
const LandingPage = React.lazy(() => import('./components/LandingPage'));

function App() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Provider store={store}>
        <Router>
          <React.Suspense fallback={null}>
            <Switch>
              <Route
                path="/"
                exact
                component={() => (
                  <ThemeProvider theme={responsiveFontSizes(themeLandingPage)}>
                    <ScopedCssBaseline>
                      <LandingPage />
                    </ScopedCssBaseline>
                  </ThemeProvider>
                )}
              />
              <Route path="/" component={Pages} />
            </Switch>
          </React.Suspense>
        </Router>
      </Provider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
