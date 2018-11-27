import React, { Component } from "react"
import "./Weather.css"
import axios from "axios"
import { geolocated } from "react-geolocated";

class Weather extends Component {
	constructor(props) {
		super(props);
		this.state = {
			weatherData: "",
			latitude: "",
			longitude: "",
			loading: true
		};
		this.getWeatherData = this.getWeatherData.bind(
			this);
	}

	componentDidMount() {

	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		console.log(this.props);

		if (nextProps.isGeolocationEnabled) {
			if (nextProps.coords !== null) {
				if ((nextProps.coords.latitude !== this.state.latitude) && (nextProps.coords.longitude !== this.state.longitude)) {
					this.setState({longitude: nextProps.coords.longitude, latitude: nextProps.coords.latitude}, () => {
						console.log(this.state);
						this.getWeatherData();
					});
				}
				console.log("test");
			}
		}
	}

	getWeatherData() {
		let apiURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + this.state.latitude + "&lon=" + this.state.longitude + "&appid=ca39c68815edbaae5b601563aa4bc6c7";
		console.log(apiURL);
		axios.get(apiURL)
			.then((res) => {
				console.log("response weather data: ", res);
				this.setState({
					weatherData: res.data,
					loading: false
				})
			}).catch((err) => {
			console.log(err);//todo we don't show the user the error in console. we remove this in the future
		});
	}

	render() {
		setTimeout(() => {
			this.getWeatherData();
		}, 5000);
		return (
			<div>
				{this.state.loading ? <div>getting weather data please wait...</div> :
					<div><p>{this.state.weatherData.weather[ 0 ].description}</p></div>}
      </div>
		)
	}
}

export default geolocated({
	positionOptions: {
		enableHighAccuracy: true,
	},
	userDecisionTimeout: 100000,
})(Weather);
