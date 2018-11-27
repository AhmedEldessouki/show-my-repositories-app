import React, { Component } from "react"
import "./Weather.css"
import axios from "axios"
import { geolocated } from "react-geolocated";

class Weather extends Component {
	constructor() {
		super();
		this.state = {
			weatherData: "",
			isWeatherData: false,
			latitude: "",
			longitude: "",
			error: false
		};
		this.fetchData = this.fetchData.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		console.log(this.props);
		console.log(nextProps);
		if (nextProps.coords !== this.props.coords) {
			this.setState({
				latitude: nextProps.coords.latitude,
				longitude: nextProps.coords.longitude
			}, () => {
				this.fetchData(this.state.latitude, this.state.longitude);
			})
		}
	}

	fetchData(latitude, longitude) {
		axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=ca39c68815edbaae5b601563aa4bc6c7`)
			.then((res) => {
				this.setState({
					weatherData: res,
					isWeatherData: true
				}, () => {
					console.log("weatherData: ", this.state.weatherData);
				})
			})
			// Catch any errors we hit and update the app
			.catch((error) => {
				console.log("something wrong happened:( ", error);
				this.setState({
					error: true
				})
			})
	}

	render() {
		return (
			<div>
				{this.state.error ? <p>we are so sorry we have error</p> : !this.state.isWeatherData ?
					<p>we are getting data...</p> :
					<div>
					<p>{this.state.weatherData.data.city.name}</p>
					<p>{this.state.weatherData.data.city.country}</p>
					</div>}
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
