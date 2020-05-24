import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import DayTile from './components/DayTile';

function App() {
  const [numOfEvents, setNumOfEvents] = React.useState(0);
  const getNumOfEvents = () => numOfEvents;
  const changeNumOfEvents = (e) => setNumOfEvents(e);
  return (
    <div className="App">
      <Navbar />
      <DayTile
        getNumOfEvents={getNumOfEvents}
        changeNumOfEvents={changeNumOfEvents}
        index={1}
      />
    </div>
  );
}

export default App;
