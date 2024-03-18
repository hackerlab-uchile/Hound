import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function MovementPlot() {
    const [data, setData] = useState([]);
    var x = [1, 2, 3, 4, 5];
    var y = [2, 3, 4, 5, 6];
    var intensity = [10, 20, 80, 40, 50];


    useEffect(() => {
        fetch('https://10.42.0.1/api/locations/get/')
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const plotData = [{
        // x: data.map((element)=> element.x),
        // y: data.map((element)=> element.y),
        x: x,
        y: y,
        type: 'scattergl',
        mode: 'markers',
        mode: 'markers',
        marker: {
          color: intensity, // Set colors based on intensity
          colorscale: 'Viridis', // Set the colorscale ('Viridis' is just an example, you can use other built-in colorscales or define your own)
          cmin: 0, // Set the minimum value for the colorscale
          colorbar: {
            title: 'Intensity' // Add a colorbar title
          }
        },
        color: intensity, 
        colorscale: 'Greens'
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

