import React, { Component } from 'react';
import './App.css';
import Home from './components/home/Home';
import NotFound from './components/notFound/NotFound';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';



class App extends Component {

  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path="/404" component={NotFound} />
          <Redirect from="*" to="/404" />
        </Switch>
      </div>
    );
  }
}

export default App;
