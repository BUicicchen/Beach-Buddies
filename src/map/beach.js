import * as React from 'react';
import {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import Timer from './timer';
import LoadingPin from './pin_loading'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import firebase from '../firebase/firebase';
import "../index.css";
import { blue } from '@mui/material/colors';

export default function Beach() {
  const location = useLocation();
  const selectedBeach = location.state;
  const [status, setStatus] = useState('start');

  // --- check location ---
  const [here,setHere] = useState(false);
  const [check,setCheck] = useState(true);
  const [started,setStarted] = useState(false);
  async function getUserLocation() {
    const beachData = await firebase.firestore().collection("beaches_MA_array_temp").where('id', '==', selectedBeach.id).get();
    const fbeachData = beachData.docs[0].data();
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat_max = fbeachData.boundry[0]+.01;
      const lat_min = fbeachData.boundry[0]-.01;
      const long_max = fbeachData.boundry[1]+.01;
      const long_min = fbeachData.boundry[1]-.01;
      if (!((pos.coords.latitude >= lat_min && pos.coords.latitude <= lat_max) && (pos.coords.longitude >= long_min && pos.coords.longitude <= long_max))) {
        setCheck(false);
        handleClickOpen()
      } else {
        setHere(false);
        setCheck(true);
        setStarted(false);
        setStatus('timer')
      }
      setHere(true);
    });
    if (here) {
      window.clearTimeout(checkLocation)
      return check;
    }
  }
  async function checkLocation() {
    setStarted(true);
    if(here === false && check == false && started == true) {
      window.setTimeout(checkLocation, 1000);
    }
  }
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setHere(false);
    setCheck(true);
    setStarted(false);
    setOpen(false);
  };
  
  return (
    <div style={{textAlign:'center'}}>
        <h1>{selectedBeach.name}</h1>
        <div>
          {status == 'start' ? 
              <div>
                <div> 
                    <Button onClick={()=>{getUserLocation(); checkLocation()}} style={{marginBottom: 15}} variant="outlined" >Start!</Button>
                    {
                      started ?
                        <div className="rotate">
                          <LoadingPin size='40' color='green'></LoadingPin>
                        </div>
                      : <div></div>
                    }
                    <div></div>
                    <img style={{marginBottom: 15}} width="70%" src={selectedBeach.photoURL} />
                </div>
                <div>

                {/* open alert if not in region */}
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Location Alert!"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      You are detected to be out of the beach region, please return to the beach!
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                      Continue
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
            :
            <div><Timer beachInfo={selectedBeach}></Timer></div>
          }
        
        </div>
    </div>
  );
}
