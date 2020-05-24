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
          { id: 0, color: '#EFBC9B', title: 'MA1101R Lecture' },
          { id: 1, color: '#546A7B', title: 'CS1231 Tutorial' },
          { id: 2, color: '#96897B', title: 'MA1521 Lecture' },
          { id: 3, color: '#896978', title: 'CS1101S Recitation' },
        ]}
        index={1}
      />
    </div>
  );
}

export default App;
