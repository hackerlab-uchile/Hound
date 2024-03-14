import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function MovementPlot() {
    const [data, setData] = useState([]);


    useEffect(() => {
        fetch('https://10.42.0.1/api/locations/get/')
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
          <Plot
            data={plotData}
            layout={{ title: 'Positions' }}
          />
        </div>
      ); 
}

export default MovementPlot;

