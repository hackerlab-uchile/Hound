import React, {useState, useEffect} from 'react';
import api from './api/api'
import './App.css';
import Accelerometer from './position/accelerometer';
import MovementPlot from './components/movement_graph';
import BeginScan from './components/begin_scan';


const App = () => {

  return (
    <div className="App">
      <MovementPlot/>
      <BeginScan/>
    </div>
  );
}

export default App;
