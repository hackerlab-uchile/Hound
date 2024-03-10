import './App.css';

import GeolocationComponent from './position/geolocation';
import BeginScan from './components/begin_scan';
// import Accelerometer from './position/accelerometer';


const App = () => {

  return (
    <div className="App">
      <h1>Hound</h1>
      <BeginScan/>
    </div>
  );
}

export default App;
