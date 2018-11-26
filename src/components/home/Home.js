import React, { Component } from 'react';
import './Home.css';
import axios from 'axios';

export default class Home extends Component {
  constructor() {
    super()
    this.state = {
      repos: []
    }
  }

  componentDidMount() {
    axios.get(`https://api.github.com/users/ahmedeldessouki`)
      .then(res => {
        console.log('Data', res)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        {this.state.repos}
      </div>
    )
  }
}
