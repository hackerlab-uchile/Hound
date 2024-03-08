import React, { useEffect, useState, useReducer } from "react";
import api from "../api/api";

function Accelerometer() {
  // mock data //
  const [mockX, setMockX] = useState(null);
  const [mockY, setMockY] = useState(null);
  const [mockZ, setMockZ] = useState(null);
  // mock data //

  const [permissionGranted, setPermissionGranted] = useState(false);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [z, setZ] = useState(null);

  // data made to calculate positions, all of them are trouples
  const [currentAcceleration, setCurrentAcceleration] = useState([0,0,0]);
  const [lastAcceleration, setLastAcceleration] = useState([0,0,0]);
  const [accelerationSum, setAccelerationSum] = useState([0,0,0]);
  const [lastPosition, setLastPosition] = useState([0,0,0]);
  const [timeElapsed, setTimeElapsed] = useState(null);

  const [currentPosition, setCurrentPosition] = useState([0,0,0]);

  const [firstInterval, setFirstInterval] = useState(Date.now());
  const [currentTime, setCurrentTime] = useState(Date.now()); 
  const [currentNetworkScanId, setCurrentNetworkScanId] = useState(null);
  const [locationData, setLocationData] = useState({
    network_scan_id: '',
    x: '',
    y: '',
    z: ''
  });



  ////////////General use functions/////////////

  //multiplication of arrays with constants
  function mult(arr, constant){
    const multiplication = arr.map((x) => constant * x);
    return multiplication;
  }

  //addition of 3 dimensional arrays
  // usage example: sum3d(...[1,2,3], ...[1,2,3]) -> [2,4,6]
  function sum3d(...args){
    let s = [0,0,0];
    for (let i = 0; i<args.length; i++) {
      s[i%3] += args[i];
    }
    return s;
  }

  ////////// Endpoints connections ///////////

  // // Gets the data of the last Network scan id and sets the current nw scan
  // useEffect(() => {
  //   const fetchLastNetworkScanId = async () => {
  //     // const response = await fetch('http://localhost:8000/networks/get_last_id/');
  //     const response = await fetch('https://10.42.0.1/api/networks/get_last_id/');
  //     const responseData = await response.json();
  //     setCurrentNetworkScanId(responseData+1);
  //   };
  //   fetchLastNetworkScanId();
    
  // }, []);

  /////// MOCK DATA GENERATOR ///////
  function newRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;  
  }

  function generateRandomNumber(){
    setTimeout(() => {
      setMockX(newRandomNumber(-10, 10));
      setMockY(newRandomNumber(-10, 10));
      setMockZ(newRandomNumber(-10, 10));
    }, 5000)
  }
  /////// MOCK DATA GENERATOR ///////

  // console.log("x, y, z:", mockX, mockY, mockZ);

  // Sends the location data to the fastapi endpoints
  const sendLocationData = async () => {
    try {
      // fetch uses the RPI's Caddy URL, to avoid problems with the lack of HTTPS
      const response = await fetch('https://10.42.0.1/api/locations/create/', {
      // const response = await fetch('http://localhost:8000/locations/create/', {
      method: "POST",  
      body: JSON.stringify(locationData),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      });
      if (!response.ok) {
        throw new Error('Failed to send data');
      }

      const responseData = await response.json();
      console.log('Response from FastAPI:', responseData);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  

  //Integrating the solution for displacement offered in the paper 'Deriving Displacement from a 3 axis Accelerometer'
  // https://cris.brighton.ac.uk/ws/portalfiles/portal/219655/Displacement+from+Accelerometer+(1).pdf

  //the function receives the acceleration at that point on x, y and z, provided by the accelerometer and the last calculated position both as an array
  // acc_sum: the sum of all the accelerations minus the last one
  function toPosition(current_acc, last_acc, acc_sum, last_pos, time_elapsed) {
    const current_pos = sum3d(...mult(sum3d(...mult(current_acc, 1/2), ...mult(last_acc, 3/2), ...mult(acc_sum, 2)), (time_elapsed^2)/2), ...last_pos);
    return(current_pos);
  }

  

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
      return(acc.toFixed(1));
    }
    else{
      return(0);
    }
  }

  function handleMotionEvent(event) {
    setX(roundAcc(event.acceleration.x));
    setY(roundAcc(event.acceleration.y));
    setZ(roundAcc(event.acceleration.z));
    setFirstInterval(currentTime);
    setCurrentTime(Date.now());
    setTimeElapsed((currentTime - firstInterval)/1000);
  }



function handleLocationChanges(){
  //CAMBIAR MOCK DATA!! (mockX, mockY, mockZ por x,y,z. Borrar generateRandomNumber y todos los set para el calculo de posicion
  // generateRandomNumber();
  setLastPosition(currentPosition);
  setLastAcceleration(currentAcceleration);
  setCurrentAcceleration([x, y, z]);
  setAccelerationSum(sum3d(...accelerationSum, ...currentAcceleration));
  setCurrentPosition(toPosition(currentAcceleration,lastAcceleration,accelerationSum,lastPosition, timeElapsed));
  console.log("position", currentPosition);
  setLocationData({
    network_scan_id: currentNetworkScanId,
    x: currentPosition[0],
    y: currentPosition[1],
    z: currentPosition[2]
  });
  // sendLocationData();
}

  //everytime the acceleration changes we get the interval to calculate each of the positions
  useEffect (() => {
    handleLocationChanges();
  },
  // [mockX, mockY, mockZ]
  [x, y, z]
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
          <p>X: {x}</p>
          <p>Y: {y}</p>
          <p>Z: {z}</p>
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