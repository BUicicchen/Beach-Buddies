import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXN0aWFudG1hcmsiLCJhIjoiY2wwNXQ4aDM0MGNydzNpcWo4dWY5MGJkeSJ9.YTP08GGbccsCzCripTYICw';

function Map() {
  const mapContainer = useRef(null);
const map = useRef(null);
// const [lng, setLng] = useState(-70.9);
// const [lat, setLat] = useState(42.35);
const [zoom] = useState(9);

useEffect(() => {
  if (map.current) return; // initialize map only once
  map.current = new mapboxgl.Map({
  container: mapContainer.current,
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.0582912, 42.3602534],
  zoom: zoom
  });
  });

  return (
    <div className="App">
<div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default Map;
