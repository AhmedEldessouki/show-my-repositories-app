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
  
  componentDidMount() {
    console.log(this.props)

  }
  componentDidUpdate() {
    if (this.props.coords !== null) {

      console.log('coords : ', this.props.coords)

      axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.latitude}&lon=${this.state.longitude}&APPID=1a79373e32ce9808d51c9e9a961ab8a0`)
        .then((res) => {
          console.log('response weather data: ', res);
          this.setState({
            weath: res.data.list
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
  userDecisionTimeout: 7.2e+6,
})(Weather);