import React, { Component } from "react";
import "./Home.css";
import axios from "axios";

class Home extends Component {
	constructor() {
		super();
		this.state = {
			repos: [],
		}
	}

	componentDidMount() {
		axios.get(`https://api.github.com/users/ahmedeldessouki/repos`).then((res) => {
			this.setState({
				repos: res.data
			})
		}).catch((err) => {
			console.log(err);//todo we don't show the user the error in console. we remove this in the future
		});
	}

	render() {
		return (
			<div className="Home">
        <header>
          <h1>My Repos</h1>
        </header>
				<main>
          <ul className="repos-container">
            {
							this.state.repos.map((item, i) => (
								<li key={i} className="item-container">
									<a href={item.html_url}>
										{item.name}
									</a>
                </li>
							))
						}
          </ul>
				</main>
      </div>
		)
	}
}

export default Home;