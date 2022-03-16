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

const TOKEN = 'pk.eyJ1IjoiY2hyaXN0aWFudG1hcmsiLCJhIjoiY2wwNXQ4aDM0MGNydzNpcWo4dWY5MGJkeSJ9.YTP08GGbccsCzCripTYICw'; // Set your mapbox token here

export default function MapComponent() {
  const [popupInfo, setPopupInfo] = useState(null);
  const [beaches, setBeaches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('map');

  // for timer page
  const [selectedBeach, setSelectedBeach] = useState('');
  
  useEffect(() => {
		const getBeaches = async () => {
      setLoading(true);
      const beachesRef = await firebase.firestore().collection("beaches");
      await beachesRef.onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        })
        setBeaches(items);
        setLoading(false);
      })
    }
    getBeaches();
	}, []);
  console.log(beaches)

  var weekAgo = new Date();
  var monthAgo = new Date();
  weekAgo.setDate(weekAgo.getDate()-7);
  monthAgo.setMonth(monthAgo.getMonth()-1);
  console.log(weekAgo.getTime()/1000);
  console.log(monthAgo.getTime()/1000);
  const pins = useMemo(
    () => 
      beaches.map((beach, index) => (
        <Marker
            key={`marker-${index}`}
            longitude={beach.coordinate._long}
            latitude={beach.coordinate._lat}
            anchor="bottom"
            color='#3FB1CE'
        >
            {beach.lastCleaned > weekAgo &&
              <Pin size='40' color='green' onClick={() => setPopupInfo(beach)} />
            }
            {beach.lastCleaned < weekAgo &&
              <Pin size='40' color='yellow' onClick={() => setPopupInfo(beach)} />
            }
            {beach.lastCleaned < monthAgo &&
              <Pin size='40' color='red' onClick={() => setPopupInfo(beach)} />
            }
            
            
        </Marker>
    )), [beaches]
  );

  function convertTime(time) {
    var newDate = new Date(time*1000);
    return newDate
  }

  if (loading || beaches.toString() === "[]") {
    return "Loading..."
  }

  console.log(beaches)

  return (
    currentPage === 'map' ?
      <div>
        <Map
          initialViewState={{
              longitude: -70.9,
              latitude: 42.35,
              zoom: 10
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={TOKEN}
          style={{height: '100vh'}}
        >
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          <ScaleControl />

          {pins}

          {popupInfo && (
            <Popup
              anchor="top"
              longitude={Number(popupInfo.coordinate._long)}
              latitude={Number(popupInfo.coordinate._lat)}
              closeOnClick={false}
              onClose={() => setPopupInfo(null)}
            >
              <div>
                <h2> {popupInfo.name} </h2>
                <Button style={{marginBottom: 15}} variant="outlined" onClick={() => {setCurrentPage('timer'); setSelectedBeach(popupInfo)}}>Start!</Button>
                <div style={{textAlign: 'left', paddingBottom: 10}}> <b>Last cleaned:</b> {convertTime(popupInfo.lastCleaned.seconds).toString().substring(0,15)} </div>
                <div style={{textAlign: 'left', paddingBottom: 10}}> <b>Marine Life:</b> { popupInfo.marineLife } </div>
              </div>
              <img width="100%" src={popupInfo.photoURL} />
            </Popup>
          )}
        </Map>
      </div>
  : currentPage === 'timer' ?
  <div>
    <h1>{selectedBeach.name}</h1>
    <img style={{marginBottom: 15}} width="70%" src={selectedBeach.photoURL} />
    <div><Button style={{marginBottom: 15}} variant="outlined" onClick={() => {setCurrentPage('map')}}>Back</Button></div>
  </div>
  : <div></div>
  );
}