import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home'
import Register from './pages/Register'
import SignUp from './pages/SignUp'
import Calendar from './pages/Calendar'
import TextEditor from './pages/TextEditor'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/register' exact component={Register}/>
          <Route path='/signup' exact component={SignUp}/>
          <Route path='/calendar' exact component={Calendar}/>
          <Route path='/text' exact component={TextEditor}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;