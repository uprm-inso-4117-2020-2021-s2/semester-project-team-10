import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home'
import Register from './pages/SignIn'
import SignUp from './pages/SignUp'
import Calendar from './pages/Calendar'
import TextEditor from './pages/TextEditor'
import { QueryClient, QueryClientProvider } from "react-query";
import {AuthProvider} from './components/AuthContext';

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <Router>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Navbar />
            <Switch>
              <Route path='/' exact component={Home}/>
              <Route path='/signin' exact component={Register}/>
              <Route path='/signup' exact component={SignUp}/>
              <Route path='/calendar' exact component={Calendar}/>
              <Route path='/text' exact component={TextEditor}/>
            </Switch>
          </AuthProvider>
        </QueryClientProvider>
      </Router>
    </>
  );
}

export default App;