import React from 'react';
import './App.css';
import MapComponent from './map/map.js';
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
// eslint-disable-next-line import/no-webpack-loader-syntax
// mapboxgl.workerClass = require("mapbox-gl/dist/mapbox-gl-csp-worker").default;

function App() {
  return (
    <div className="App">
        <div style={{alignItems: 'center'}}>
          <MapComponent></MapComponent>
        </div>
    </div>
  );
}

export default App;
