import React, { Component } from "react"
import "./Weather.css"
import axios from "axios"
import { geolocated } from "react-geolocated";
import kelvinToCelsius from "kelvin-to-celsius"; //todo this is how you import libraries

class Weather extends Component {
  constructor() {
    super();
    this.state = {
      lon: null,
      lat: null,
      weatherData: null,
      isLoading: true
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.coords !== this.props.coords) {
      this.setState({
        lat: nextProps.coords.latitude,
        lon: nextProps.coords.longitude,
      }, function () {
        let self = this; // save object reference
        self.fetchData(this.state.lat, this.state.lon)
      })
    }
  }

  fetchData(lat, lon) {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=ca39c68815edbaae5b601563aa4bc6c7`)
      .then((res) => {
        this.setState({
          weatherData: res.data,
          isLoading: false
        })
      })
      .catch((error) => this.setState({ error, isLoading: false }));//todo please handle errors correctly
  }

  // weatherData = () => {
  //   const weatherData = this.state;
  //   // let arrTemp = [];
  //   // for (let i = 0; i < weatherData.list.length; i += 8) {
  //   //   arrTemp.push(
  //   //     <div className="display-conditions">
  //   //       <p className="display-conditions-item">Location : {weatherData.city.name}, {weatherData.city.country}</p>
  //   //       <p className="display-conditions-item">Temperature: {kelvinToCelsius(weatherData.list[i].main.temp)} C</p>
  //   //       <p className="weather-condition-container display-conditions-item">
  //   //         <img className="img-fluid" alt="icon" src={`http://openweathermap.org/img/w/${weatherData.list[i].weather[0].icon}.png`} />
  //   //         Weather Condition: <em>{weatherData.list[i].weather[0].description}</em>
  //   //       </p>
  //   //       <p className="display-conditions-item">Humidity: {weatherData.list[i].main.humidity}</p>
  //   //       <p className="display-conditions-item">Wind Speed: {weatherData.list[i].wind.speed}</p>
  //   //     </div>
  //   //   )
  //   // }
  //   return weatherData
  // }; //todo please remove this shit and make it how it shown below
  render() {
    const {weatherData} = this.state;
    return (
      <div className="Weather">
        {this.state.isLoading ? <p>loading data</p> :
          <div className="display-conditions">
            <p className="display-conditions-item">Location : {weatherData.city.name}, {weatherData.city.country}</p>
            <ul>
              {weatherData.list.map(function (list, index) {
                return <li className="display-conditions-item" key={index}>Temperature: {kelvinToCelsius(list.main.temp)} C</li>;
              })}
            </ul>
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
