import React, { Component } from 'react'
import './Weather.css'
import axios from 'axios'
import { geolocated } from 'react-geolocated';

class Weather extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: ''
    }
    this.fetchData = this.fetchData.bind(this)
  }

  async fetchData(a) {

    const result = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${a.coords.latitude}&lon=${a.coords.longitude}&APPID=ca39c68815edbaae5b601563aa4bc6c7`)
      .then((res) => {
        console.log('response weather data: ', res);
        this.setState({
          weatherData: res.data,
          isLoading: false,
        })
      })
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
    console.log('result: ', result)
    return await result;


  }

  componentDidUpdate() {
    // this.fetchData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.coords !== null) {
      console.log('coords : ', this.props.coords)
      this.fetchData(nextProps)
    }
  }
  displayWeatherData() {
    setTimeout(() => {
      <p>{this.state.weatherData.city.name}</p>
    }, 5000);
  }
  render() {
    console.log('in the render:', this.state.weatherData)
    return (
      <div>
        {this.displayWeatherData.bind(this)}
        {/* <h1>{weatherData.city.name}</h1> */}
      </div>
    )
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(Weather);