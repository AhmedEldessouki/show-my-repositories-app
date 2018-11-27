import React, { Component } from "react";
import "./Home.css";
import axios from "axios";

class Home extends Component {
	constructor() {
		super();
		this.state = {
			repos: [],
			profile: '',
			value: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		axios.get(`https://api.github.com/users/ahmedeldessouki/repos`).then((res) => {
			this.setState({
				repos: res.data
			})
		}).catch((err) => {
			console.log(err);//todo we don't show the user the error in console. we remove this in the future
		});
		axios.get(`https://api.github.com/users/ahmedeldessouki`)
			.then((res) => {
				this.setState({
					profile: res.data
				})
			}).catch((err) => {
				console.log(err);//todo we don't show the user the error in console. we remove this in the future
			});
	}

	componentDidUpdate() {
		axios.get(`https://api.github.com/users/${this.state.value}/repos`).then((res) => {
			this.setState({
				repos: res.data
			})
		}).catch((err) => {
			console.log(err);//todo we don't show the user the error in console. we remove this in the future
		});
		axios.get(`https://api.github.com/users/${this.state.value}`)
			.then((res) => {
				this.setState({
					profile: res.data
				})
			}).catch((err) => {
				console.log(err);//todo we don't show the user the error in console. we remove this in the future
			});
	}

	handleChange(e) {
		this.setState({ value: e.target.value })
	}

	handleSubmit(e) {
		alert('A name was submitted: ' + this.state.value);
		e.preventDefault();
	}

	render() {
		const { profile, repos, value } = this.state
		return (
			<div className="Home">
				<header>
					<h1>Welcome {profile.name}</h1>
					<form onSubmit={e => this.handleSubmit(e)} >
						<label className="username-fetcher">
							Please Enter A Github Username:
						<input type="text" onChange={this.handleChange} value={value} name="name" placeholder="Enter Your Username on Github" />
						</label>
					</form>
				</header>
				<main>
					<div className="user-components">
						<div className="img-container">
							<img src={profile.avatar_url} alt="profilePicture" />
						</div>
						<ul className="details-container">
							<li>{profile.login}</li>
							<li className="follow-container">
								<h5>Followers</h5>
								{profile.followers}
							</li>
							<li className="follow-container">
								<h5>Following</h5>
								{profile.following}
							</li>
							<li className="follow-container">
								Lives in {profile.location}
							</li>
							<li><a href={profile.url}>
								Profile Link
								</a>
							</li>
						</ul>
					</div>
					<h1>Repos</h1>
					<ul className="repos-container">
						{repos.map((item, i) => (
							<li key={i} className="item-container">
								<a href={item.html_url}>
									{item.name}
								</a>
							</li>
						))}
					</ul>
				</main>
			</div>
		)
	}
}

export default Home;