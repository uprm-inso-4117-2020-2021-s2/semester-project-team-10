import React from 'react';
import '../App.css';
import { Box } from '@material-ui/core'
// import Image from '../images/4391855.png';

// const useStyles = makeStyles(theme => ({
//   marginAutoContainer: {
//     width: 500,
//     height: 80,
//     display: 'flex',
//     backgroundColor: 'gold',
//   },
//   marginAutoItem: {
//     margin: 'auto'
//   },
//   alignItemsAndJustifyContent: {
//     width: 500,
//     height: 80,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'pink',
//   },
// }))

// TODO
const Home = () => {
  // const classes = useStyles()
  return (
    <React.Fragment>
      <Box
        display="flex" 
        width={1980} height={450} 
        // bgcolor="lightblue"
        // image= 'url(${Image})'
      >
        <Box m="auto">
          Foto
        </Box>
      </Box>
      <Box 
        display="flex" 
        width={1980} height={400} 
        bgcolor="lightgreen"
        alignItems="center"
        justifyContent="center"
      >
        Texto
      </Box>
    </React.Fragment>
  )
}
export default Home

