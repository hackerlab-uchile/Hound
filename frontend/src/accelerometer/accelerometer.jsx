import React, { useEffect, useState } from "react";
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
  const [currentTime, setCurrentTime] = useState(null); 
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

  /////// MOCK DATA GENERATOR ///////
  function newRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min; 
  }

  function generateRandomNumber(){
    setTimeout(() => {
      setMockX(newRandomNumber(1, 10));
      setMockY(newRandomNumber(1, 10));
      setMockZ(newRandomNumber(1, 10));
    }, 5000)
  }
  /////// MOCK DATA GENERATOR ///////

  // console.log("x, y, z:", mockX, mockY, mockZ);

  
  const sendLocationData = async () => {
    try {
      const response = await fetch('http://localhost:8000/locations/create/', {
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
  
  
  useEffect(() => {
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      DeviceOrientationEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            setPermissionGranted(true);
            window.addEventListener("devicemotion", handleMotionEvent);
          }
        })
        .catch(console.error);
    } else {
      setPermissionGranted(true);
      window.addEventListener("deviceorientation", handleMotionEvent);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleMotionEvent);
    };
  }, []);

  function handleMotionEvent(event) {
    setX(event.acceleration.x);
    setY(event.acceleration.y);
    setZ(event.acceleration.z);
    
}

function handleLocationChanges(){
  console.log("date:", currentTime);
  //CAMBIAR MOCK DATA!! (mockX, mockY, mockZ por x,y,z. Borrar generateRandomNumber
  // generateRandomNumber();
  setLocationData({
    network_scan_id: 0,
    // x: mockX,
    // y: mockY,
    // z: mockZ,
    x: x,
    y: y,
    z: z,  
    location_started_at: currentTime
  });
  sendLocationData();
}

useEffect (() => {
    setCurrentTime((new Date()).toJSON())
    handleLocationChanges();
  },
  // [mockX, mockY, mockZ]
  [x, y, z]
  );


  
  function handlePermissionGranted() {
    DeviceOrientationEvent.requestPermission()
      .then((permissionState) => {
        if (permissionState === "granted") {
          setPermissionGranted(true);
          window.addEventListener("deviceorientation", handleMotionEvent);
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
            {/* <button className="btn" onClick={handlePermissionGranted}>
              Grant Permission
            </button> */}
          </div>
        </div>
      )}
    </>
  );
}

export default Accelerometer;