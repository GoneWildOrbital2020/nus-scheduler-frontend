import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import Navbar from './components/navbar';
import Calendar from './components/Calendar';
import reducer from './redux/reducers';

const store = createStore(reducer);
function App() {
  const [numOfEvents, setNumOfEvents] = React.useState(0);
  const getNumOfEvents = () => numOfEvents;
  const changeNumOfEvents = (e) => setNumOfEvents(e);
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <Calendar
          monthIdx={0}
          getNumOfEvents={getNumOfEvents}
          changeNumOfEvents={changeNumOfEvents}
        />
      </div>
    </Provider>
  );
}

export default App;
