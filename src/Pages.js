import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles, ThemeProvider } from '@material-ui/core';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import { theme } from './theme';

const Authenticate = React.lazy(() => import('./components/Authenticate'));
const AutomaticLogout = React.lazy(() =>
  import('./components/AutomaticLogout'),
);
const ForgotPassword = React.lazy(() => import('./components/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./components/ResetPassword'));
const EventGroup = React.lazy(() => import('./components/EventGroup'));
const Profile = React.lazy(() => import('./components/profile'));
const Upload = React.lazy(() => import('./components/upload'));
const NotesGrid = React.lazy(() => import('./components/notesGrid'));
const Login = React.lazy(() => import('./components/login'));
const Signup = React.lazy(() => import('./components/signup'));
const Calendar = React.lazy(() => import('./components/Calendar'));
const Footer = React.lazy(() => import('./components/footer'));
const NavbarDrawer = React.lazy(() => import('./components/NavbarDrawer'));

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
              <React.Suspense fallback={null}>
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
                <Route
                  path="/forgotPassword"
                  exact
                  component={ForgotPassword}
                />
              </React.Suspense>
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
