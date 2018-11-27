import React, { Component } from "react"
import "./Weather.css"
import axios from "axios"
import { geolocated } from "react-geolocated";

class Weather extends Component {
  constructor() {
    super();
    this.state = {
      lon: '',
      lat: '',
      weatherData: undefined,
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      isLoading: true
    }
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidUpdate() {
    // this.fetchData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.coords !== this.props.coords) {
      console.log('coords : ', this.props.coords)
      this.setState({
        lat: nextProps.coords.latitude,
        lon: nextProps.coords.longitude,
      }, function () {
        this.fetchData(this.state.lat, this.state.lon)
      })
    }
  }

  fetchData(lat, lon) {

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=ca39c68815edbaae5b601563aa4bc6c7`)
      .then((res) => {
        console.log('response weather data: ', res);
        // this.setState({
        //   weatherData: res.data,
        // })
        this.setState({
          weatherData: res.data,
          temperature: res.data.list[0].main.temp,
          city: res.data.city.name,
          country: res.data.city.country,
          humidity: res.data.list[0].main.humidity,
          windSpeed: res.data.list[0].wind.speed,
          isLoading: false,
        })
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  }


  render() {
    console.log('in the render:', this.state.weatherData)
    const { city, country, windSpeed, temperature, humidity, weatherData } = this.state
    const kelvinToCelsius = require('kelvin-to-celsius');
    return (
      <div>
        {this.state.isLoading ? <p>loading data</p> :
          <div className="display-conditions">
            <p>Location : {city}, {country}</p>
            <p>Temperature: {kelvinToCelsius(temperature)} C</p>
            <p>Weather Condition: <em>{weatherData.list[0].weather[0].description}</em></p>
            <p>Humidity: {humidity}</p>
            <p>Wind Speed: {windSpeed}</p>
          </div>
        }
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
