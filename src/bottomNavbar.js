import React from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import logo from './public/assets/new_BB_logo.svg';

const BottomNavbar = () => {
    return (
        <Box sx={{ flexGrow: 1, height: '70px', bgcolor: "#355598" }} position="static" >
            <Toolbar style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <img src={logo} style={{width:200, transform:`rotate(${20}deg)`}} />
            </Toolbar>
        </Box>
	);
};
export default BottomNavbar;
