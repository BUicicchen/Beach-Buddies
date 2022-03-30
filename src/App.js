import React from 'react';
import './App.css';
import MapComponent from './map/map.js';
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
// if('serviceWorker' in navigator){
//   navigator.serviceWorker.register('/sw.js')
//   .then((reg) => console.log('service worker registered', reg))
//   .catch((err) => console.log('service worker not registered', err))
// }
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
