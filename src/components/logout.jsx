import { Component } from 'react';

export class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem('token');
    window.location = '/';
  }

  render() {
    return null;
  }
}

export default Logout;
