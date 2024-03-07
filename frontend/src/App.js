import React, {useState, useEffect} from 'react';
import api from './api/api'
import './App.css';

import BeginScan from './components/begin_scan';
import Accelerometer from './position/accelerometer';


const App = () => {

  return (
    <div className="App">
      <h1>Hound</h1>
      <Accelerometer/>
    </div>
  );
}

export default App;
