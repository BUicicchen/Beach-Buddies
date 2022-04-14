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
import Search from './search.js';
import '../map/map.css'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import BottomNavbar from '../bottomNavbar.js';

const TOKEN = 'pk.eyJ1IjoiY2hyaXN0aWFudG1hcmsiLCJhIjoiY2wwNXQ4aDM0MGNydzNpcWo4dWY5MGJkeSJ9.YTP08GGbccsCzCripTYICw'; // Set your mapbox token here

export default function MapComponent() {
  const [popupInfo, setPopupInfo] = useState(null);
  const [beaches, setBeaches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState({});
  const { search } = window.location;

  const filterBeaches = (beaches, query) => {
      if (!query) {
          return beaches;
      }

      return beaches.filter((beach) => {
          const beachName = beach.name.toLowerCase();
          return beachName.includes(query.toLowerCase());
      });
  };

  const query = new URLSearchParams(search).get('s'); 
  const [searchQuery, setSearchQuery] = useState(query || '');
  const filteredBeaches = filterBeaches(beaches, searchQuery);
  // for timer page
  const [selectedBeach, setSelectedBeach] = useState('');
  
  useEffect(() => {
		const getBeaches = async () => {
      setLoading(true);
      const beachesRef = await firebase.firestore().collection("beaches_MA");
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

  var today = new Date();
  var weekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate()-7);
  var monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  weekAgo = weekAgo.getTime() / 1000
  monthAgo = monthAgo.getTime() / 1000

  const pins = useMemo(
    () => 
      beaches.map((beach, index) => (
        <Marker
            key={`marker-${index}`}
            longitude={beach.coordinate.longitude}
            latitude={beach.coordinate.latitude}
            anchor="bottom"
            color='#3FB1CE'
        >
            {beach.lastCleaned.seconds > weekAgo &&
              <Pin size='60' color='green' onClick={() => setPopupInfo(beach)} />
            }
            {(beach.lastCleaned.seconds <= weekAgo && beach.lastCleaned.seconds > monthAgo) &&
              <Pin size='60' color='yellow' onClick={() => setPopupInfo(beach)} />
            }
            {beach.lastCleaned.seconds <= monthAgo &&
              <Pin size='60' color='red' onClick={() => setPopupInfo(beach)} />
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

  
  return (
      <div>
        <Box sx={{ flexGrow: 1, height: '85px', bgcolor: "#355598" }} position="static" >
          <Toolbar disableGutters>
              <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              {window.innerWidth <= 760 ?
                <ul>
                  {filteredBeaches.slice(0, 1).map((beach) => (
                      <Button style={{borderRadius: 10,backgroundColor: "#FFF1CA", margin: 5}} component={Link} to="/beach" variant="filled" state={beach}>
                        {beach.name}
                      </Button>
                  ))}
                </ul> :
                <ul>
                  {filteredBeaches.slice(0, 5).map((beach) => (
                      <Button style={{borderRadius: 10,backgroundColor: "#FFF1CA", margin: 5}} component={Link} to="/beach" variant="filled" state={beach}>
                        {beach.name}
                      </Button>
                  ))}
                </ul>
              }
          </Toolbar>
        </Box>
        <Map
          initialViewState={{
              longitude: -71.01,
              latitude: 42.35,
              zoom: 10
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={TOKEN}
          style={{height: 'calc(100vh - 85px - 70px)'}}
        >
          
          {/* Display user's current locatiom */}
          <GeolocateControl
            position="top-left"
            positionOptions={{ enableHighAccuracy: true }}
            showUserLocation={true}
            onGeolocate={(PositionOptions) => {
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
              <div style={{backgroundColor:"#355598", borderRadius:20, padding:10, maxWidth:180}}>
                  <h2 style={{paddingBottom: 10, color:"#ffffff"}}> {popupInfo.name} </h2>
                  <img width="100%" src={popupInfo.photoURL} padding="10" />
                  <div style={{textAlign: 'left', color:"#ffffff", paddingBottom: 10}}> <b>Last cleaned:</b> {convertTime(popupInfo.lastCleaned.seconds).toString().substring(0,15)} </div>
                  <div style={{textAlign: 'left', color:"#ffffff", paddingBottom: 20}}> <b>Marine Life:</b> { popupInfo.marineLife } </div>
                  <Button component={Link} to="/beach" state={popupInfo} style={{marginBottom: 15, backgroundColor:'#355598', border:"2px white solid",}} variant="contained" >Get Cleaning!</Button>
              </div>
            </Popup>
          )}
        </Map>

        <BottomNavbar></BottomNavbar>
      </div>
  );
}