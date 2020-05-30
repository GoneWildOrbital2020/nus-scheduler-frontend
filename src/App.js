import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Login from './components/login';
import Signup from './components/signup';
import Footer from './components/footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
