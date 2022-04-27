import * as React from 'react';
import { useLocation } from 'react-router-dom';
import Timer from './timer';
import "../index.css";
import { blue } from '@mui/material/colors';

export default function Beach() {
  const location = useLocation();
  const selectedBeach = location.state.selectedBeach;
  
  return (
    <div style={{textAlign:'center'}}>
        <h1>{selectedBeach.name}</h1>
        <div>
          <Timer beachInfo={selectedBeach}></Timer>       
        </div>
    </div>
  );
}
