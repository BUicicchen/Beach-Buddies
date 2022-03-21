import * as React from 'react';
import {useState, useMemo, useEffect} from 'react';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import Pin from './pin.js';
import firebase from '../firebase/firebase';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';


export default function Beach() {
  const location = useLocation();
  const selectedBeach = location.state;

  return (
    <div style={{textAlign:'center'}}>
        <h1>{selectedBeach.name}</h1>
        <img style={{marginBottom: 15}} width="70%" src={selectedBeach.photoURL} />
        {/* <div><Button style={{marginBottom: 15}} variant="outlined" onClick={() => {setCurrentPage('map')}}>Back</Button></div> */}
    </div>
  );
}