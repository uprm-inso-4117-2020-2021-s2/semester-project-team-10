import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import ImageCard from './ImageCard';
import places from '../static/places';
const useStyles=makeStyles((theme)=>({
    root:{
        minheight:'100vh',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        margin:'30px',
        marginTop:'50px',

    },

}));

export default function Icons(){
    const classes=useStyles();
    return ( 
    <div className={classes.root}>
        <ImageCard place={places[0]}/>
        <ImageCard place={places[1]}/>
        <ImageCard place={places[2]}/>
    </div>);

}