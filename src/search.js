import firebase from './firebase/firebase';
import React, {useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
function Search({ searchQuery, setSearchQuery }) {
    // const history = useHistory();
    // const onSubmit = e => {
    //     history.push('/beach')
    //     e.preventDefault()
    // };
    // const beachData = await firebase.firestore().collection("beaches_MA").where('name', '==', searchQuery).get();
    // const fbeachData = beachData.docs[0].data();
    // console.log(fbeachData)
    console.log(searchQuery)
    return <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden"></span>
        </label>
        <input
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="Search for Beach"
            name="s" 
        />
        {/* <Button component={Link} to="/beach" style={{marginBottom: 15}} variant="outlined" state={searchQuery}>Search</Button> */}
        {/* <button type="submit" onSubmit>Search</button> */}
    </form>
    
}

export default Search;