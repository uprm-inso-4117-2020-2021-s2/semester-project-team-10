import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    marginTop:1000,
    width:540,
    height:660,
    background:'rgba(0,0,0,0)',
    
  },
  media: {
    height:430,
    width:480,
    postion:'absolute',
    alignItems:'center',
    textAlign:'center',
    marginTop:50,
    marginLeft:20,
  },

  title:{
    fontWeight:'bold',
    fontSize:'2rem',
  },


});



export default function ImageCard({place}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h1"className={classes.title}>
           {place.title}
          </Typography>
        </CardContent>
        <CardMedia
          className={classes.media}
          image={place.imageUrl}
        />
    </Card>
  );
}
