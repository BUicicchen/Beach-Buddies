import React from "react";
import { useLocation } from 'react-router-dom';
import Confetti from "react-confetti";
import {useState, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import firebase from '../firebase/firebase';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import BottomNavBar from '../bottomNavbar.js'
import { Link } from "react-router-dom";
//Name Pop-Up
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { styled } from "@mui/material/styles";
// new imports
//import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

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
    const totalCount = trashList.reduce(function(sum, item) {
      const updatedSum = sum + item.count;
      return updatedSum;
    }, 0);
    const [name, setName] = useState("");
    console.log("/congratulations")
    console.log(beach)
    console.log(trashList)
    console.log(totalCount)
    const currTime = new Date()
    console.log(currTime)
    
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

    //Button Download funcionality
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    //Pop-up Styling 
    const StyledTextField = styled(TextField)({
      "& label": {
        color: "#FFF1CA"
      },
      "&:hover label": {
        fontWeight: 700
      },
      "& label.Mui-focused": {
        color: "#FFF1CA"
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#FFF1CA"
      },
      
      "& .MuiOutlinedInput-root": {
        color: "#FFF1CA",
        "& fieldset": {
          borderColor: "#FFF1CA"
        },
        "&:hover fieldset": {
          borderColor: "#FFF1CA",
          borderWidth: 2
        },
        "&.Mui-focused fieldset": {
          borderColor: "#FFF1CA"
        }
      }
    });
    
    // new imports
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    }


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
    <Card sx={{ minWidth: 275 }} style={{borderRadius: 50, width:"80%",minHeight:"80%", backgroundColor: "#ABBBDF", borderColor:"#35559B"}}>
      <CardContent>
        <Typography style={{fontFamily: "Poppins", color: "#FFF1CA", display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: "bold", fontSize:25}} sx={{ mb: 2.5 }} color="text.secondary">
          Clean Up Statistics
        </Typography>
        <Typography style={{fontFamily: "Poppins", color: "#FFF1CA", fontWeight: "bold"}} sx={{ mb: 2.5 }} variant="body2">
          Time
        </Typography>
        <Typography style={{fontFamily: "Poppins", color: "#FFF1CA", fontWeight: "bold"}} variant="body2">
          Amount Cleaned: {totalCount}
        </Typography>
      </CardContent>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: "#ABBBDF", marginLeft:5, marginLRight:5 }}>
        {trashList.map((value) => {
          const labelId = `checkbox-list-label-${value.id}`;
          return (
            value.count != 0 ?
              <ListItem key={value} disablePadding>
                <ListItemText role={undefined} onClick={handleToggle(value)} dense style={{fontFamily: "Poppins", color: "#FFF1CA", fontWeight: "bold"}}>
                  <ListItemText id={labelId} primary={`${value.name}: ${value.count}`} />
                </ListItemText>
              </ListItem>
            : <div></div>
          );
        })}
      </List>
      <CardActions style={{fontFamily: "Poppins", color: "#35559B", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {/**Download Certificate  */}
        <Button style={{textTransform: 'none', fontSize:18, fontWeight:600, color: "#35559B"}} onClick={handleClickOpen}>
          Download Certificate
        </Button>
        <Dialog 
          open={open} 
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{style:{backgroundColor: "#355598", borderRadius: 20, maxWidth: 400} }}
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <Grid>
                <Grid>
                  <h1 style={{color: '#FFF1CA', marginBottom:20, textAlign: 'center'}}>Download Results</h1>
                  <p style={{color: '#FFF1CA', marginBottom:30, fontSize:20, textAlign: 'center'}}>Enter your full name to be on certificate.</p>
                </Grid>
              </Grid>
            </DialogContentText>
            <StyledTextField fullWidth label="Name" value={name} onChange={() => setName(name)} />
          </DialogContent>
          <DialogActions>
            <Button component={Link} to="/certificate"  state={{beach:beach,trashList:trashList,name:name}} style={{color: '#FFF1CA', marginBottom:20, fontSize:25, textTransform:'none'}}>Continue</Button>

          </DialogActions>
        </Dialog>
      </CardActions>
    </Card>
    {/* {trashList.map((item, index) => (
                <Grid item xs={2} sm={4} md={4} key={item.id}>
                    <h4>{item.name}</h4>
                    <img src={item.img} style={{width:100}} />
                    <div></div>
                    <div style={{textAlign:'center', display:'inline-flex'}}>
                    </div>
                </Grid>
            ))} */}
    </div>
    
    
    <BottomNavBar></BottomNavBar>
  </div>
  )
  };
