import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      repos: [],
      myRepos: []
    }
  }

  componentDidMount() {
    axios.get(`https://api.github.com/users/ahmedeldessouki/repos`).then((res) => {
      console.log(res.data);
      this.setState({
        repos: res.data
      }, function () {
        console.log(this.state);
      })
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="pageContainer">
        <ul className="reposContainer">
          {
            this.state.repos.map((item, i) => (
              <div key={i}>
                <a href={item.html_url}>
                  <li>{item.name}</li>
                </a>
              </div>
            ))

          }
        </ul>
      </div >
    )
  }
}
