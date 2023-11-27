import React, {useState, useEffect} from 'react';
import api from './api/api'
import './App.css';
import Accelerometer from './accelerometer/accelerometer'


const App = () => {
  const [networkScan, setNetworkScan] = useState({
    status: '',
    signal_started_at: '',
    location_started_at: ''
  });

  const [locationData, setLocationData] = useState({
    network_scan_id: '',
    x: '',
    y: '',
    z: '',
    location_started_at: ''
  });

  return (
    <div className="App">
      <Accelerometer />
    </div>
  );
}

export default App;
