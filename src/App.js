import React, { Component } from 'react';
import './App.css';
import Home from './components/home/Home';
import Weather from './components/weather/Weather';



class App extends Component {

  render() {
    return (
      <div>
        {/* <Home /> */}
        <Weather />
      </div>
    );
  }
}

export default App;
