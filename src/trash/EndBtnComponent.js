import React from 'react';
import { Link } from 'react-router-dom';

function EndBtnComponent(props){
    return (
        <button className='endBtn' component={Link} to="/blank">Finish Clean!</button>
    );
}

export default EndBtnComponent;