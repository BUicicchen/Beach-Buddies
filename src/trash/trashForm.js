import React, { useState } from 'react';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import firebase from '../firebase/firebase';
import Button from '@mui/material/Button';
import { Link, useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { experimentalStyled as styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function TrashForm() {
    //   const location = useLocation();
    //   const selectedBeach = location.state;

    const [trashList, setTrashList] = useState([
        {"id":"can", "name": "Can", "count": 0},
        {"id":"cigarette", "name": "Cigarette", "count": 0},
    ])
    function removeItem(item) {
        item.count-=1
        setTrashList([...trashList]);
    }
    function addItem(item) {
        item.count+=1
        setTrashList([...trashList]);
    }

  return (
    <div style={{textAlign:'center', margin: 30}}>
        <h1>Collected Trash Form!</h1>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {trashList.map((item, index) => (
                <Grid item xs={2} sm={4} md={4} key={item.id}>
                    <h4>{item.name}</h4>
                    <div style={{textAlign:'center', display:'inline-flex'}}>
                        <Button variant="outlined" onClick={() => {removeItem(item)}}><RemoveIcon/></Button>
                        <p style={{margin:10}} >{item.count}</p>
                        <Button variant="outlined" onClick={() => {addItem(item)}}><AddIcon/></Button>
                    </div>
                </Grid>
            ))}
            </Grid>
        </Box>
    </div>
  );
}