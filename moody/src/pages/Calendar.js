import React from "react";
import Calendar from '../components/Calendar';
import {Container, CircularProgress,Paper,Grid,Box,Chip, Card, Divider, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import '../components/Calendar.css'



class App extends React.Component {
  
  render() {
    return (
      <div className="App">
        <main className="main-calendar">
          <Calendar />
        </main>
      </div>
    );
  }
}

export default App;