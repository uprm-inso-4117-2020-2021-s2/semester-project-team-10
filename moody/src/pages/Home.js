import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Icons from '../components/Icons';

import '../App.css';

const useStyles=makeStyles((theme) => ({
  root: {
    height: '100vh',
    display:'flex',
    justifyContent:"center",
    alignItems:'center'
  
  }, 
  // myimage: {
  //      backgroundSize:'cover',
  //      position:'center',
  // //   backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/journal.png"})`,
  // //   backgroundRepeat: 'no-repeat',
  // //   backgroundSize: 'cover',
  // //   backgroundPosition: 'center',
  //  },

  container:{
    textAlign:'center',
  },
  // title:{
  //   color:'#030303',
  //   fontSize:'3rem',
  //   height:540

  container2:{
    position:'center',
    marginTop:1700

  },

  // },

  sentence1:{
    background:'none',
    textAlign:'center',
    position:'absolute',
    height:238,
    left:160,
    top:820,
    

  },

  sentence2:{
    background:'none',
    textAlign:'center',
    position:'absolute',
    height: 238,
    left:160,
    top:860,

  },

  sentence3:{
    background:'none',
    textAlign:'center',
    position:'absolute',
    height: 238,
    left:160, 
    top:900,
  },

  container3:{
    background:'none',
    textAlign:'center',
    position:'absolute',
    height:238,
    left:600,
    top: 1000,
    fontSize:'3rem',
    marginBottom:'50px',

  },

  // step1:{
  //   background:'none',
  //   position:'absolute',
  //   height:238,
  //   left:160,
  //   top: 1060,

  // },


}));

export default function Home(){
  const classes=useStyles();
  return (
    
    <div className={classes.root}>
      <CssBaseline />
      
    <div className={classes.container}>
      {/* <h1 className={classes.title}>About Moody</h1> */}
      <h1 className={classes.sentence1}>
        Moody is a personal journaling application that helps you express your inner feelings and thoughts.
      </h1>
      <h1 className={classes.sentence2}> Don’t feel shy to remember past mistakes or feelings, Moody has got your back keeping your secrets 
      </h1>
    
      <h1 className={classes.sentence3}> secure and only for your eyes.
      </h1>
      <div className={classes.container2}>
      <img className="image2"
        src={`${process.env.PUBLIC_URL}/assets/moodylogo4.png`}
        alt="image2"
        width="560"
        height="560"
        />
      </div>

      <h1 className={classes.container3}> 
       Getting started!
      </h1>
      <Icons/>
      
    </div>
    </div>
     
  );
}
