import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import ReactAccelerometer from 'react-accelerometer'
 
const AccComponent = () => (
  <ReactAccelerometer>
    {(position, rotation) => (
      <ul>
        <li>x: {position.x}</li>
        <li>y: {position.y}</li>
        <li>z: {position.z}</li>
        <li>rotation alpha: {rotation.alpha}</li>
        <li>rotation beta: {rotation.beta}</li>
        <li>rotation gamma: {rotation.gamma}</li>
      </ul>
    )}
  </ReactAccelerometer>
)

class Localization extends Component{
render(){
    return {AccComponent}
}
}


export default Localization