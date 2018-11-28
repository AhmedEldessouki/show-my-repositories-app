import React, { Component } from "react";
import "./Home.css";
import axios from "axios";


class Home extends Component {
	constructor() {
		super();

		this.state = {
			repos: [],
			profile: '',
			name: '',
			isLoading: true
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		axios.get(`https://api.github.com/users/${this.state.name}/repos`).then((res) => {
			this.setState({
				repos: res.data
			})
		}).catch((err) => {
			console.log(err);//todo we don't show the user the error in console. we remove this in the future
		});
		axios.get(`https://api.github.com/users/${this.state.name}`)
			.then((res) => {
				this.setState({
					profile: res.data,
					isLoading: false
				})
			}).catch((err) => {
				console.log(err);//todo we don't show the user the error in console. we remove this in the future
			});
					event.preventDefault();
	}
	handleChange = e => {
		this.setState({
			name: e.target.value
		})
	}
	
	render() {
		const { profile, repos, name } = this.state
		return (
			<div className="Home">
				{this.state.isLoading ?
					<form className="form-container" onSubmit={this.handleSubmit}>
						<div className="username-fetcher">
							<label className="" htmlFor="name">
								Please Enter A Github Username:
							</label>
							<input type="text" onChange={this.handleChange} value={name} id="name" placeholder="Enter Your Username on Github" />
							<input type="submit" className="submit-button" />
						</div>
					</form>
					:
					<div>
						<h1>Welcome {profile.name}</h1>
						{/* <form onSubmit={e => this.handleSubmit(e)} > */}
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
					</div>
				}
			</div>
		)
	}
}

export default Home;