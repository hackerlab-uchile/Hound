import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function MovementPlot() {
    const [data, setData] = useState([]);


    useEffect(() => {
        fetch('http://localhost:8000/locations/get/')
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const plotData = [{
        x: data.map((element)=> element.x),
        y: data.map((element)=> element.y),
        type: 'scatter'
    }];

    return (
        <div className="MovementPlot">
          <h1>Positions</h1>
          <Plot
            data={plotData}
            layout={{ title: 'Posiciones' }}
          />
        </div>
      ); 
}

export default MovementPlot;

