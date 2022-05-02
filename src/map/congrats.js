import React from "react";
import { useLocation } from 'react-router-dom';
import Confetti from "react-confetti";
import {useState, useEffect} from 'react';
//new imports
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import firebase from '../firebase/firebase';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import BottomNavBar from '../bottomNavbar.js'
import { Link } from 'react-router-dom';

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
    width: "100%",
    height: "100vh",
    transition: 'white 1s ease-out',
    // opacity: 1,
};

const defaultProps = {
    bgcolor: "background.paper",
    borderColor: "text.primary",
    m: 1,
    border: 1,
    style: { width: "5rem", height: "5rem" }
  };

export default function Congratulations(props) {
    const [animationDone, setAnimationDone] = useState(true)
    const location = useLocation();
    const beach = location.state.beach;
    const trashList = location.state.trashList;
    console.log("/congratulations")
    console.log(beach)
    console.log(trashList)
    const currTime = new Date()
    
    const [fadeProp, setFaceProp] = useState({
        fade : 'fade-out'
    })

    useEffect(() => {
        const currTime = new Date()
        const created = firebase.firestore.Timestamp.fromDate(currTime).toDate();

        updateBeachData();
        async function updateBeachData(){
            console.log(created)
            await firebase.firestore().collection("beaches_MA").doc(beach.doc_id).update({lastCleaned: created});
            console.log(beach, currTime)
            console.log(beach)
        }
       
        
      setTimeout(() => {
        toggleConfetti();
      }, 3000);
    }, []);
    

    const toggleConfetti = () => {
      setAnimationDone(!animationDone)
    };

    return (

    <div>

    <Box sx={{ flexGrow: 1, height: '50px', bgcolor: "#355598" }} position="static" >
          <Toolbar disableGutters></Toolbar>
    </Box>
    
    <style>{'body { background-color: #FFF1CA; }'}</style>
    {animationDone ? 

    <div style={styles}>
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
            }}
            >
            <Confetti
                gravity={0.4}
                run={animationDone}
                numberOfPieces={400}
            />
        </div> 

        <BottomNavBar ></BottomNavBar>
    </div>
    :
    <div>
      <h1 style={{fontFamily: "Poppins", color: "#35559B", paddingTop: "15px", paddingBottom: "15px"}}>
          <center>
          <font>  CONGRATULATIONS! </font>  
          </center>
      </h1>
    </div>
    } 
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}> 
    <Card sx={{ minWidth: 275 }} style={{borderRadius: 50, width:"80%",minHeight:"80%", backgroundColor: "#ABBBDF"}}>
      <CardContent>
        <Typography style={{fontFamily: "Poppins", color: "#FFF1CA", display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: "bold"}} sx={{ mb: 2.5 }} color="text.secondary">
          Clean Up Statistics
        </Typography>
        <Typography style={{fontFamily: "Poppins", color: "#FFF1CA", fontWeight: "bold"}} sx={{ mb: 2.5 }} variant="body2">
          Time
        </Typography>
        <Typography style={{fontFamily: "Poppins", color: "#FFF1CA", fontWeight: "bold"}} variant="body2">
          Amount Cleaned
        </Typography>
      </CardContent>
      <CardActions style={{fontFamily: "Poppins", color: "#35559B", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Button component={Link} to="/certificate"  state={{beach:beach,trashList:trashList, currTime:currTime.getTime()}} style={{textTransform: 'none', fontSize:18, fontWeight:600, color: "#35559B"}}>Download Certificate</Button>
      </CardActions>
    </Card>
    </div>
    
    <BottomNavBar></BottomNavBar>
  </div>
  )
  };
