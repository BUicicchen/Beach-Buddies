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
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useTheme } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Grid from '@mui/material/Grid';
import beachBall from '../public/assets/beach-ball_NEW.svg';

const TOKEN = 'pk.eyJ1IjoiY2hyaXN0aWFudG1hcmsiLCJhIjoiY2wwNXQ4aDM0MGNydzNpcWo4dWY5MGJkeSJ9.YTP08GGbccsCzCripTYICw'; // Set your mapbox token here

export default function MapComponent() {
  const [openIntroPopup, setOpenIntroPopup] = useState(true);
  const handleCloseIntroPopup = () => {
    setOpenIntroPopup(false);
  };
  const [beachPopup, setBeachPopup] = useState(null);
  const [beaches, setBeaches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState({});
  const { search } = window.location;

  // first thing that pops up when user first enter the app
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const turnOnLocation = () => {
    if (navigator.geolocation) {
      alert('GeoLocation is Available!');
    } else {
      alert('Please try again to enable location!');
      turnOnLocation();
    }
    handleCloseIntroPopup()
    console.log("here")
  };

  // display beaches
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
              <Pin size='60' color='green' onClick={() => setBeachPopup(beach)} />
            }
            {(beach.lastCleaned.seconds <= weekAgo && beach.lastCleaned.seconds > monthAgo) &&
              <Pin size='60' color='yellow' onClick={() => setBeachPopup(beach)} />
            }
            {beach.lastCleaned.seconds <= monthAgo &&
              <Pin size='60' color='red' onClick={() => setBeachPopup(beach)} />
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
      <div style={{maxHeight:'calc(100vh)'}}>
        {/* first thing that pops up when user first enter the app */}
        <Dialog
          open={openIntroPopup}
          onClose={handleCloseIntroPopup}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{style:{backgroundColor: "#355598", borderRadius: 20, maxWidth: 400} }}
        >
          {activeStep === 0 ?
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Grid container spacing={2}>
                <Grid item xs={9}>
                  <h1 style={{color: '#FFF1CA', marginBottom:10}} >Welcome to Beach Buddy!</h1>
                </Grid>
                <Grid item xs={3}>
                  <img src={beachBall} style={{width:70, marginLeft:-25}} />
                </Grid>
              </Grid>
              <p style={{color: '#FFF1CA', marginBottom:30}} >Your favorite beach cleaning tool.</p>
              <h2 style={{color: '#FFF1CA'}} >Are you a new user?</h2>
              <Button onClick={handleNext} style={{color: '#FFF1CA', marginBottom:20, fontSize:25, textTransform:'none'}} >Yes</Button>
              <Button onClick={handleCloseIntroPopup} style={{color: '#FFF1CA', marginBottom:20, fontSize:25, textTransform:'none'}} >No</Button>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Box style={{backgroundColor: '#ABBBDF', width:50, height:50, textAlign:'center'}} borderRadius="50%" > 
                  <ArrowForwardIcon onClick={handleNext} style={{color: '#35559B', textAlign: 'center', marginBottom:10, fontSize:40, paddingTop:10}}></ArrowForwardIcon>
                </Box>
              </div>
            </DialogContentText>
          </DialogContent>
          : activeStep === 1 ?
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <h1 style={{color: '#FFF1CA', marginBottom:10}} >We can help you with all your beach cleaning needs.</h1>
              <p style={{color: '#FFF1CA', marginBottom:20}} >Help us help you help the environment.</p>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <img src={beachBall} style={{width:100, transform:`rotate(${20}deg)`}} />
                  </Grid>
                  <Grid item xs={9}>
                    <Box style={{backgroundColor: '#ABBBDF', width:50, height:50, textAlign:'center', marginLeft: 70, marginTop: 40}} borderRadius="50%" > 
                      <ArrowForwardIcon onClick={handleNext} style={{color: '#35559B', textAlign: 'center', marginBottom:10, fontSize:40, paddingTop:10}}></ArrowForwardIcon>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </DialogContentText>
          </DialogContent>
          : activeStep === 2 ?
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <h1 style={{color: '#FFF1CA', marginBottom:10}} >Find a beach to get started!</h1>
              <p style={{color: '#FFF1CA', marginBottom:20}} >You can either search or swipe through the map!</p>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <img src={beachBall} style={{width:100, transform:`rotate(${-20}deg)`}} />
                  </Grid>
                  <Grid item xs={9}>
                    <Box style={{backgroundColor: '#ABBBDF', width:50, height:50, textAlign:'center', marginLeft: 70, marginTop: 40}} borderRadius="50%" > 
                      <ArrowForwardIcon onClick={handleNext} style={{color: '#35559B', textAlign: 'center', marginBottom:10, fontSize:40, paddingTop:10}}></ArrowForwardIcon>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </DialogContentText>
          </DialogContent>
          :
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <h1 style={{color: '#FFF1CA', marginBottom:10}} >Allow location access?</h1>
              <p style={{color: '#FFF1CA', marginBottom:20}} >Beach Buddy uses location services to credit cleaning hours, as well as to keep track of what trash is picked up where.</p>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <img src={beachBall} style={{width:100, transform:`rotate(${20}deg)`}} />
                  </Grid>
                  <Grid item xs={9}>
                    <Box style={{backgroundColor: '#ABBBDF', width:50, height:50, textAlign:'center', marginLeft: 70, marginTop: 40}} borderRadius="50%" > 
                    <ArrowForwardIcon onClick={turnOnLocation} style={{color: '#35559B', textAlign: 'center', marginBottom:10, fontSize:40, paddingTop:10}}></ArrowForwardIcon>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </DialogContentText>
          </DialogContent>
          }
        </Dialog>



        {/* Map */}
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

          {beachPopup && (
            <Popup
              anchor="top"
              longitude={Number(beachPopup.coordinate._long)}
              latitude={Number(beachPopup.coordinate._lat)}
              closeOnClick={false}
              onClose={() => setBeachPopup(null)}
            >
              <div style={{backgroundColor:"#355598", borderRadius:20, padding:10, maxWidth:180}}>
                  <h2 style={{paddingBottom: 10, color:"#ffffff"}}> {beachPopup.name} </h2>
                  <img width="100%" src={beachPopup.photoURL} padding="10" />
                  <div style={{textAlign: 'left', color:"#ffffff", paddingBottom: 10}}> <b>Last cleaned:</b> {convertTime(beachPopup.lastCleaned.seconds).toString().substring(0,15)} </div>
                  <div style={{textAlign: 'left', color:"#ffffff", paddingBottom: 20}}> <b>Marine Life:</b> { beachPopup.marineLife } </div>
                  <Button component={Link} to="/beach" state={beachPopup} style={{marginBottom: 15, backgroundColor:'#355598', border:"2px white solid",}} variant="contained" >Get Cleaning!</Button>
              </div>
            </Popup>
          )}
        </Map>

        <BottomNavbar></BottomNavbar>
      </div>
  );
}