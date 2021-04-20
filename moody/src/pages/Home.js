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
    alignItems:'center',
  
  }, 
  // myimage: {
  //      position:'center',
  // //   backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/journal.png"})`,
  // //   backgroundRepeat: 'no-repeat',
  // //   backgroundSize: 'cover',
  // //   backgroundPosition: 'center',
  //  },

  container:{
    width:1300,
    border: 'black',
    position: 'absolute',
    textAlign:'center',
    top: 700,
  },
  // title:{
  //   color:'#030303',
  //   fontSize:'3rem',
  //   height:540

  container2:{
    background: "none",
    top: 100,
    position: 'center',
    textAlign: 'center',
    position:'absolute',
    // left:360,
  },

  container3:{
    background:'none',
    textAlign:'left',
    width: 350,
    left: (window.innerWidth/2) - 175,
    position:'absolute',
    
    top: 950,
    fontSize:'3rem',
  },

  about:{
    background:'white',
    textAlign:'center',
    left: 200,
    // position:'absolute',
    height:150,


  },
  Icons:{
    position: 'absolute',
    top: 100,
  },

  // sentence2:{
  //   background:'white',
  //   textAlign:'center',
  //   height: 50,
  //   left:160,
  //   top:860,

  // },

  // sentence3:{
  //   background:'white',
  //   textAlign:'center',
  //   height: 50,
  //   left:160, 
  //   top:900,
  // },



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
        <h1 className={classes.about}>
          <p>Moody is a personal journaling application that helps you
           express your inner feelings and thoughts.</p>
          <p>Don’t feel shy to remember past mistakes or feelings, 
          Moody has got your back keeping your secrets secure and only for your eyes.</p>
        </h1>
        {/* <h1 className={classes.sentence2}> Don’t feel shy to remember past mistakes or feelings, Moody has got your back keeping your secrets 
        </h1>
    
        <h1 className={classes.sentence3}> secure and only for your eyes.
        </h1> */}
      </div>

      <div className={classes.container2}>
        <img className="image2"
          src={`${process.env.PUBLIC_URL}/assets/moodylogo4.png`}
          alt="image2"
          width="560"
          height="560"
          />
      </div>

      <div>
        <h1 className={classes.container3}> 
          Getting started!
        </h1>    
      </div>
      <div className= {classes.Icons}><Icons/></div>
    </div>

  );
}

