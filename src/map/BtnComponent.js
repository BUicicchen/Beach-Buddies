import React, {useState,useEffect} from 'react';
import TrashForm from '../trash/trashForm'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Warning from '../map/warning'
import firebase from '../firebase/firebase';

function BtnComponent(props) {
    // --- check location ---
    async function getUserLocation() {
      console.log(props.beachInfo)
      const beachData = await firebase.firestore().collection("beaches_MA_array_temp").where('id', '==', props.beachInfo.id).get();
      const fbeachData = beachData.docs[0].data();
      console.log("Beach Data", fbeachData.boundry)
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log("test")
        const lat_max = Math.min(fbeachData.boundry)+.01;
        const lat_min = Math.min(fbeachData.boundry)-.01;
        const long_max = Math.max(fbeachData.boundry)+.01;
        const long_min = Math.max(fbeachData.boundry)-.01;
        console.log(long_min, long_max, lat_min, lat_max);
        if (!(pos.coords.latitude >= lat_min && pos.coords.latitude <= lat_max) && (pos.coords.longitude > long_min && pos.coords.longitude <= long_max)) {
          handleClickOpen()
          document.getElementById("stopBtn").click();
        }
      });
    }
    const ms = 10000; // 1 minute: 60000, 10 seconds: 10000
    useEffect(() => {
      const interval = setInterval(() => {
        getUserLocation()
      }, ms);
      return () => clearInterval(interval);
    }, [])
      
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <div>
      {(props.status === 0)? 
        <button className="stopwatch-btn stopwatch-btn-gre"
        onClick={props.start}>Start</button> : ""
      }

      {(props.status === 1)? 
        <div>
          <button className="stopwatch-btn stopwatch-btn-red" id="stopBtn"
                  onClick={props.stop}>Stop</button>
          <button className="stopwatch-btn stopwatch-btn-yel"
                  onClick={props.finish}>Finish</button>
        </div> : ""
      }

     {(props.status === 2)? 
        <div>
          <button className="stopwatch-btn stopwatch-btn-gre"
                  onClick={props.resume}>Resume</button>
          <button className="stopwatch-btn stopwatch-btn-yel"
                  onClick={props.finish}>Finish</button>
        </div> : ""
      }
      {(props.status === 1 || props.status === 2) ?
        <Warning></Warning>:""
      }

      {(props.status === 1 || props.status === 2) ?
        <TrashForm></TrashForm>:""
      }
     

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
  );
}

export default BtnComponent;