import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Icons from './components/Icons';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home'
import Register from './pages/Register'
import SignUp from './pages/SignUp'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/register' exact component={Register}/>
          <Route path='/signup' exact component={SignUp}/>
        </Switch>
        <Icons /> 
      </Router> 
      
    </>
  );
}

export default App;
