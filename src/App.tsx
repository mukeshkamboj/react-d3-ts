import React, { useState } from 'react';
import './App.css';
import ScatterPlot from './examples/scatterplot';
import HeatMap from './examples/heatmap';

const charts = ['ScatterPlot', 'HeatMap'];

const getChart = (chart: string) => {
  switch (chart) {
    case charts[0]: return <ScatterPlot />
    case charts[1]: return <HeatMap />
  }
}

function App() {

  const [selectedChart, setSelectedChart] = useState(charts[1]);

  return (
    <div className="App">
      <div className="options">
        {charts.map(c =>
          c === selectedChart ?
            (<div className='option' key={c}><div key={c} className="selectedOption"> {c} </div><div className="right-arrow" /></div>)
            : (<div className='option' key={c} onClick={() => setSelectedChart(c)}> {c} </div>)
        )}
      </div>
      <div className="view-section">
        {getChart(selectedChart)}
      </div>
    </div >
  );
}

export default App;
