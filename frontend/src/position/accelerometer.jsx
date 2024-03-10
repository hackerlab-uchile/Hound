import React, { useEffect, useState } from "react";
import { toPosition, sum3d, locationMean } from './posCalculation';
import { sendLocationData } from './endpoints';

function Accelerometer() {

  // max data load after sending the data 
  const dataInterval = 1000;

  // scan state: 0 -> finished ; 1 -> on progress
  const [scanState, setScanState] = useState([0]);

  // accelerometer consts
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);

  // data made to calculate positions, all of them are trouples
  const [currentAcceleration, setCurrentAcceleration] = useState([0,0,0]);
  const [lastAcceleration, setLastAcceleration] = useState([0,0,0]);
  const [accelerationSum, setAccelerationSum] = useState([0,0,0]);
  const [lastPosition, setLastPosition] = useState([0,0,0]);
  const [timeElapsed, setTimeElapsed] = useState(null);

  const [currentPosition, setCurrentPosition] = useState([0,0,0]);

  const [firstInterval, setFirstInterval] = useState(Date.now());
  const [currentTime, setCurrentTime] = useState(Date.now()); 
  const [currentNetworkScanId, setCurrentNetworkScanId] = useState(0);
  const [locationData, setLocationData] = useState({
    network_scan_id: '',
    x: '',
    y: '',
    z: ''
  });
  const [xAxisList, setXAxisList] = useState([]);
  const [yAxisList, setYAxisList] = useState([]);
  const [zAxisList, setZAxisList] = useState([]);


  //adds the Axis to an array
  const addAxisDataList = (x, y, z) => {
    setXAxisList(lastArrayX => [...lastArrayX, x]);
    setYAxisList(lastArrayY => [...lastArrayY, y]);
    setZAxisList(lastArrayZ => [...lastArrayZ, z]);
  }

  // gets the network scan id to assign the new location instance to a new network scan. 
  // Gets the data of the last Network scan id and sets the current nw scan
  useEffect(() => {
    const fetchLastNetworkScanId = async () => {
      // const response = await fetch('http://localhost:8000/networks/get_last_id/');
      const response = await fetch('https://10.42.0.1/api/networks/get_last_id/');
      const responseData = await response.json();
      // console.log('response', response);
      setCurrentNetworkScanId(responseData+1);
    };

    fetchLastNetworkScanId();
    
  }, []);

  useEffect(() => {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
      DeviceMotionEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            setPermissionGranted(true);
            window.addEventListener("devicemotion", handleMotionEvent);
          }
        })
        .catch(console.error);
    } else {
      setPermissionGranted(true);
      window.addEventListener("devicemotion", handleMotionEvent);
    }

    return () => {
      window.removeEventListener("devicemotion", handleMotionEvent);
    };
  }, []);

  function roundAcc(acc){
    if ((acc !== undefined) ||(acc !== null)){
      return(parseFloat(acc.toFixed(2)));
    }
    else{
      return(0);
    }
  }

  function handleMotionEvent(event) {
    setX(roundAcc(event.acceleration.x));
    setY(roundAcc(event.acceleration.y));
    setZ(roundAcc(event.acceleration.z));
    setXAxisList(xAxisList => [...xAxisList, x]);
    setYAxisList(yAxisList => [...yAxisList, y]);
    setZAxisList(zAxisList => [...zAxisList, z]);
    console.log('first xaxis', xAxisList);
    // setFirstInterval(currentTime);
    // setCurrentTime(Date.now());
    // setTimeElapsed((currentTime - firstInterval)/1000);
  }



function handleLocationChanges(xMean, yMean, zMean){
  //CAMBIAR MOCK DATA!! (mockX, mockY, mockZ por x,y,z. Borrar generateRandomNumber y todos los set para el calculo de posicion
  // generateRandomNumber();
  console.log ('x after:', xMean, 'y after:', yMean );
  setLastPosition(currentPosition);
  setLastAcceleration(currentAcceleration);
  setCurrentAcceleration([xMean, yMean, zMean]);
  setAccelerationSum(sum3d(...accelerationSum, ...currentAcceleration));
  setCurrentPosition(toPosition(currentAcceleration,lastAcceleration,accelerationSum,lastPosition, 1000));
  console.log("position", currentPosition);
  setLocationData({
    network_scan_id: currentNetworkScanId,
    x: currentPosition[0],
    y: currentPosition[1],
    z: currentPosition[2]
  });
  console.log('location_data', locationData);
  sendLocationData(locationData);
}
  
  //everytime the timer changes we get the interval to calculate each of the positions
  useEffect (() => {
    const interval = setInterval(() => {
      console.log('xAxis:', xAxisList);
      let xMean = locationMean(xAxisList);
      let yMean = locationMean(yAxisList);
      let zMean = locationMean(zAxisList);
      handleLocationChanges(xMean, yMean, zMean);
      console.log ('x before:', xMean, 'y before:', yMean );
    }, 1000); // 1000 milliseconds = 1 second
    return () => clearInterval(interval);

  },[]
  );


  
  function handlePermissionGranted() {
    DeviceMotionEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          setPermissionGranted(true);
          window.addEventListener("devicemotion", handleMotionEvent);
        }
      })
      .catch(console.error);
  }
  
  return (
    <>
      {permissionGranted ? (
        <>
          <p>X: {currentPosition[0]}</p>
          <p>Y: {currentPosition[1]}</p>
          <p>Z: {currentPosition[2]}</p>
        </>
      
      ) : (
        <div className="modal" id="modal">
          <div className="modal-content">
            <h2>Allow access to device motion and orientation</h2>
            <p>
              This app requires access to device motion and orientation to
              function properly.
            </p>
            <button className="btn" onClick={handlePermissionGranted}>
              Grant Permission
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Accelerometer;