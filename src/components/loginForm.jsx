import React, { Component } from 'react';

export class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();

    console.log('Submitted');
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="clickable" htmlFor="username">
              Username
            </label>
            <input id="username" type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label className="clickable" htmlFor="password">
              Password
            </label>
            <input id="password" type="text" className="form-control" />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;