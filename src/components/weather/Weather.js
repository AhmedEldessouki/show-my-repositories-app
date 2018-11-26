import React, { Component } from 'react'
import './Weather.css'
import axios from 'axios'
import { geolocated } from 'react-geolocated';

class Weather extends Component {
  constructor() {
    super();
    this.state = {
      lat: null,
      lon: null
    }
  }
  // getUser(cityName) {
  //   return axios.get(`api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=1a79373e32ce9808d51c9e9a961ab8a0`)
  //     .then(response => response.json())
  //     .then(response => {
  //       return response
  //     })
  // }
  componentDidMount() {
    console.log(this.props)

  }
  componentDidUpdate() {
    if (this.props.coords !== null) {
    
      console.log('coords : ', this.props.coords)

      axios.get(`https://samples.openweathermap.org/data/2.5/forecast?lat=41.036415000000005&lon=28.9813751&APPID=1a79373e32ce9808d51c9e9a961ab8a0`)
        .then((res) => {
          console.log('response weather data: ', res);
          this.setState({
            repos: res.data
          })
        }).catch((err) => {
          console.log(err);//todo we don't show the user the error in console. we remove this in the future
        });

    }
  }
  render() {
    return (
      <div>

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