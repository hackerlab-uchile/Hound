import React, { useEffect, useState } from "react";
import api from "../api/api";

function Accelerometer() {
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

  // const fetchLocationData = async () => {
  //   const response = await api.get('/locations/')
  //   setLocationData(response.data)
  // }


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

  function handleMotionEvent(event) {
    setX(event.acceleration.x);
    console.log("x:", x)
    setY(event.acceleration.y);
    console.log("y:", y)
    setZ(event.acceleration.z);
    console.log("z:", z)
    setCurrentTime((new Date()).toJSON())
    console.log("date:", currentTime);

    // setTimeout(async() => {
    //   await api.post('/locations', locationData);
    //   setLocationData({
    //     x: x,
    //     y: y,
    //     z: z, 
    //     location_started_at: currentTime
    //   });
    // }, 1)
  }

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