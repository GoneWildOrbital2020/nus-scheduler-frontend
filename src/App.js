import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import DayTile from './components/DayTile';

function App() {
  return (
    <div className="App">
      <Navbar />
      <DayTile
        events={[
          { color: '#FABCBC', title: 'MA1101R' },
          { color: '#FAB421', title: 'CS1231' },
          { color: '#3FBA65', title: 'MA1521' },
        ]}
        index={1}
      />
    </div>
  );
}

export default App;
