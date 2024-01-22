import React, {useState, useEffect} from 'react';
import api from './api/api'
import './App.css';
import Accelerometer from './position/accelerometer';
import MovementPlot from './components/movement_graph';


const App = () => {

  return (
    <div className="App">
      <MovementPlot/>
      <Accelerometer/>
    </div>
  );
}

export default App;
