import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import '../App.css';


// function Home() {
//   return (
//     <>
//     </>
//   );
// }

const useStyles=makeStyles((theme) => ({
  root: {
    height: '100vh',
    justifyContent:"center",
    alignItems:'center'
  
  }, 
  myimage: {
       backgroundSize:'cover',
       backgroundPosition:'center'
  //   backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/journal.png"})`,
  //   backgroundRepeat: 'no-repeat',
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
   },

  container:{
    textAlign:'center',
  },
  title:{
    color:'#030303',
    fontSize:'3rem',
    height:540


  },

  sentence1:{
    background:'none',
    textAlign:'center',
    position:'absolute',
    height: 238,
    left:160,
    top:610,
    

  },

  sentence2:{
    background:'none',
    textAlign:'center',
    position:'absolute',
    height: 238,
    left:160,
    top:660,

  },

  sentence3:{
    background:'none',
    textAlign:'center',
    position:'absolute',
    height: 238,
    left:160,
    top:710,
  },

}));

export default function Home(){
  const classes=useStyles();
  return (
    
    <div className={classes.root}>
      <CssBaseline />
      
      <img className="myimage"
        src={`${process.env.PUBLIC_URL}/assets/journal.png`}
        alt="logo"
        width="1520"
        height="390"
        />
    <div className={classes.container}>
      <h1 className={classes.title}>About Moody</h1>
      <h1 className={classes.sentence1}>
        Moody is a personal journaling application that helps you express your inner feelings and thoughts.
      </h1>
      <h1 className={classes.sentence2}> Don’t feel shy to remember past mistakes or feelings, Moody has got your back keeping your secrets 
      </h1>
    
      <h1 className={classes.sentence3}> secure and only for your eyes.
      </h1>
    </div>
    </div>
     
  );

}

