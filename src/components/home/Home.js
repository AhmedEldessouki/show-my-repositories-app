import React, { Component } from "react";
import "./Home.css";
import axios from "axios";

class Home extends Component {
	constructor() {
		super();
		this.state = {
			repos: [],
			profile: ''
		}
	}

	componentDidMount() {
		axios.get(`https://api.github.com/users/ahmedeldessouki/repos`).then((res) => {
			this.setState({
				repos: res.data
			}, function () {
				console.log('my repos: ', this.state.repos)
			})
		}).catch((err) => {
			console.log(err);//todo we don't show the user the error in console. we remove this in the future
		});
		axios.get(`https://api.github.com/users/ahmedeldessouki`)
			.then((res) => {
				this.setState({
					profile: res.data
				}, function () {
					console.log('this is the profile data: ', this.state.profile);
				})
			}).catch((err) => {
				console.log(err);//todo we don't show the user the error in console. we remove this in the future
			});
	}

	render() {
		const { profile, repos } = this.state
		return (
			<div className="Home">
				<header>
					<h1>Welcome {profile.name}</h1>
				</header>
				<main>
					<div className="user-components">
						<div className="left-container">
							<img src={profile.avatar_url} alt="profilePicture" />
						</div>
						<ul className="right-container">
							<li>{profile.login}</li>
							<li className="follow-container">
								<h5>Followers</h5>
								{profile.followers}
							</li>
							<li className="follow-container">
								<h5>Following</h5>
								{profile.following}
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