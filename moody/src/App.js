import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Icons from './components/Icons'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home'
import Register from './pages/Register'
import SignUp from './pages/SignUp'
import Calendar from './pages/Calendar'
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <Router>
        <QueryClientProvider client={queryClient}>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/register' exact component={Register}/>
          <Route path='/signup' exact component={SignUp}/>
          <Route path='/calendar' exact component={Calendar}/>
        </Switch>
        <Icons/>
        </QueryClientProvider>
      </Router>
    </>
  );
}

export default App;