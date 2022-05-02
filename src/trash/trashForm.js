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
import Can from '../public/assets/can_NEW.svg';
import Cigarette from '../public/assets/cigarette_NEW.svg';
import SodaBottle from '../public/assets/plastic-bottle_NEW.svg';
import WineBottle from '../public/assets/glass-bottle_NEW.svg';
import FaceMask from '../public/assets/mask_NEW.svg';
import Food from '../public/assets/food_NEW.svg';
import Nail from '../public/assets/metal_scrap_NEW.svg';
import PlasticBag from '../public/assets/plastic-bag_NEW.svg';
import Needle from '../public/assets/needle_NEW.svg';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function TrashForm(props) {

    const [trashList, setTrashList] = useState([
        {"id":"can", "name": "Can", "count": 0, "img": Can},
        {"id":"cigarette", "name": "Cigarette", "count": 0, "img": Cigarette},
        {"id":"needle", "name": "Needle", "count": 0, "img": Needle},
        {"id":"facemask", "name": "Face Mask", "count": 0, "img": FaceMask},
        {"id":"sodaBottle", "name": "Soda Bottle", "count": 0, "img": SodaBottle},
        {"id":"wineBottle", "name": "Wine Bottle", "count": 0, "img": WineBottle},
        {"id":"food", "name": "Food", "count": 0, "img": Food},
        {"id":"plasticbag", "name": "Plastic Bag", "count": 0, "img": PlasticBag},
        {"id":"nail", "name": "Nail", "count": 0, "img": Nail},
    ])
    // console.log(props)
    props.getTrash(trashList);
    const [totalCount, setTotalCount] = useState(0)
    function removeItem(item) {
        if (item.count > 0) {
            item.count-=1
            setTrashList([...trashList]);
            let total = totalCount - 1
            setTotalCount(total)
        }
    }
    function addItem(item) {
        item.count+=1
        setTrashList([...trashList]);
        let total = totalCount + 1
        setTotalCount(total)
    }

  return (
    <div style={{textAlign:'center', backgroundColor:'#ABBBDF'}}>
        <h1 style={{marginBottom:10}}>Collected Trash Form!</h1>
        <h4 style={{marginBottom:20}}>Total Count = {totalCount} </h4>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {trashList.map((item, index) => (
                <Grid item xs={2} sm={4} md={4} key={item.id}>
                    <h4>{item.name}</h4>
                    <img src={item.img} style={{width:100}} />
                    <div></div>
                    <div style={{textAlign:'center', display:'inline-flex'}}>
                        <Button variant="outlined" style={{width:2}} onClick={() => {removeItem(item)}}><RemoveIcon /></Button>
                        <p style={{margin:10}} >{item.count}</p>
                        <Button variant="outlined" style={{width:2}} onClick={() => {addItem(item)}}><AddIcon /></Button>
                    </div>
                </Grid>
            ))}
            </Grid>
        </Box>
        <div style={{paddingBottom:50}}></div>
    </div>
  );
}