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
import { Link } from 'react-router-dom';

const TOKEN = 'pk.eyJ1IjoiY2hyaXN0aWFudG1hcmsiLCJhIjoiY2wwNXQ4aDM0MGNydzNpcWo4dWY5MGJkeSJ9.YTP08GGbccsCzCripTYICw'; // Set your mapbox token here

export default function MapComponent() {
  const [popupInfo, setPopupInfo] = useState(null);
  const [beaches, setBeaches] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState('map');
  const [userLocation, setUserLocation] = useState({});
  const SIZE = 12;
  const userIcon = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "blue",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
  };

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

  console.log(userLocation)
  return (
    // currentPage === 'map' ?
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
          {/* Display user's current locatiom */}
          <GeolocateControl
            position="top-left"
            positionOptions={{ enableHighAccuracy: true }}
            showUserLocation={true}
            onGeolocate={(PositionOptions) => {
              console.log("PositionOptions")
              console.log(PositionOptions)
              setUserLocation({
                ...userLocation,
                latitude: PositionOptions["coords"].latitude,
                longitude: PositionOptions["coords"].longitude,
              });
            }}
          />
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
                <Button component={Link} to="/beach" state={popupInfo} style={{marginBottom: 15}} variant="outlined" >Start!</Button>
                <div style={{textAlign: 'left', paddingBottom: 10}}> <b>Last cleaned:</b> {convertTime(popupInfo.lastCleaned.seconds).toString().substring(0,15)} </div>
                <div style={{textAlign: 'left', paddingBottom: 10}}> <b>Marine Life:</b> { popupInfo.marineLife } </div>
              </div>
              <img width="100%" src={popupInfo.photoURL} />
            </Popup>
          )}

        </Map>
      </div>
  // : currentPage === 'timer' ?
  // <div>
  //   <h1>{selectedBeach.name}</h1>
  //   <img style={{marginBottom: 15}} width="70%" src={selectedBeach.photoURL} />
  //   <div><Button style={{marginBottom: 15}} variant="outlined" onClick={() => {setCurrentPage('map')}}>Back</Button></div>
  // </div>
  // : <div></div>
  );
}