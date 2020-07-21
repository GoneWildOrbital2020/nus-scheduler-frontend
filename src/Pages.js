import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles, ThemeProvider } from '@material-ui/core';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import Authenticate from './components/Authenticate';
import AutomaticLogout from './components/AutomaticLogout';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import EventGroup from './components/EventGroup';
import Profile from './components/profile';
import Upload from './components/upload';
import NotesGrid from './components/notesGrid';
import Login from './components/login';
import Signup from './components/signup';
import Calendar from './components/Calendar';
import Footer from './components/footer';
import NavbarDrawer from './components/NavbarDrawer';
import { theme } from './theme';

const useStyles = makeStyles(() => ({
  app: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
}));

const Pages = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <ScopedCssBaseline>
        <div className={classes.app}>
          <NavbarDrawer elevation={4} />
          <div className="content" style={{ marginTop: '75px' }}>
            <Switch>
              <Route path="/calendar" exact component={Calendar} />
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
              <Route path="/forgotPassword" exact component={ForgotPassword} />
            </Switch>
          </div>
          <Footer />
        </div>
        <AutomaticLogout />
      </ScopedCssBaseline>
    </ThemeProvider>
  );
};

export default Pages;
