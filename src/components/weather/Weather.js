import React, { Component } from 'react'
import './Weather.css'
import axios from 'axios'
import { geolocated } from 'react-geolocated';

class Weather extends Component {
  constructor() {
    super();
    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
    }
    this.fetchData = this.fetchData.bind(this);
    this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
  }

  async fetchData(a) {

    const result = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${a.coords.latitude}&lon=${a.coords.longitude}&APPID=ca39c68815edbaae5b601563aa4bc6c7`)
      .then((res) => {
        console.log('response weather data: ', res);
        // this.setState({
        //   weatherData: res.data,
        //   isLoading: false,
        // })
        this.setState({
          temperature: res.data.list[0].main.temp,
          city: res.data.city.name,
          country: res.data.city.country,
          humidity: res.data.list[0].main.humidity,
          windSpeed: res.data.list[0].wind.speed,
          error: ""
        })
      })
      // Catch any errors we hit and update the app
      .catch((error => this.setState({ error, isLoading: false })));
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
  handleChange(e) {
    this.setState({ 
      city: e.target.city, 
      country: e.target.country, 
    })
  }

  handleSubmit(e) {
    alert('A name was submitted: ' + this.state.value);
    e.preventDefault();
  }

  // displayWeatherData() {
  //   setTimeout(() => {
  //     <p>{this.state.weatherData.city.name}</p>
  //   }, 5000);
  // }
  render() {
    console.log('in the render:', this.state.weatherData)
    return (
      <div>
        <h1>You Country {this.state.city}, {this.state.country}</h1>
        <form onSubmit={e => this.handleSubmit(e)} >
          <label className="username-fetcher">
            Weahter Situatuin:
						<input type="text" value={this.state.city} name="city" placeholder="Enter Your city" />
						<input type="text" value={this.state.country} name="city" placeholder="Enter Your city" />
						<input type="text" value={this.state.temperature} name="city" placeholder="Enter Your city" />
            <input type="text" value={this.state.humidity} name="country" placeholder="Enter Your country" />
            <input type="text" value={this.state.windSpeed} name="country" placeholder="Enter Your country" />
          </label>
        </form>
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