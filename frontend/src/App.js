import React, {useState, useEffect} from 'react';
import api from './api/api'
import './App.css';
import Accelerometer from './accelerometer/accelerometer'


const App = () => {

  return (
    <div className="App">
      <Accelerometer />
    </div>
  );
}

export default App;
