import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
	return (
		<div className="Navigation">
			<ul>
				<li><NavLink exact to="/" activeClassName="selected">GitHub API Page</NavLink></li>
				<li><NavLink exact to="/weather" activeClassName="selected">Weather API page</NavLink></li>
			</ul>
		</div>

	);
};

export default Navigation;
