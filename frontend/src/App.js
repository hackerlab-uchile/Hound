import './App.css';
import styled from "styled-components";
import GeolocationComponent from './position/geolocation';
import BeginScan from './components/begin_scan';
// import Accelerometer from './position/accelerometer';

const Title = styled.h1`
  font-family: Helvetica;
  text-align: center;
  color: white; 
  background-color: #7d4a96;
  margin-top: 0;
  padding: 15px;
`;

const App = () => {

  return (

    <div  className="App">
      <Title>Hound</Title>
      <BeginScan/>
    </div>

  );
}

export default App;
