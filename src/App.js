import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Calendar from './components/Calendar';
import reducer from './redux/reducers';
import Login from './components/login';
import Signup from './components/signup';
import Footer from './components/footer';

const store = createStore(reducer);
function App() {
  const [numOfEvents, setNumOfEvents] = React.useState(0);
  const getNumOfEvents = () => numOfEvents;
  const changeNumOfEvents = (e) => setNumOfEvents(e);
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route
              path="/"
              exact
              component={() => (
                <Calendar
                  monthIdx={0}
                  getNumOfEvents={getNumOfEvents}
                  changeNumOfEvents={changeNumOfEvents}
                />
              )}
            />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
