import React, { Component } from 'react';

export class LoginForm extends Component {
  state = {
    account: {
      username: '',
      password: '',
    },
  };

  handleSubmit = e => {
    e.preventDefault();

    console.log('Submitted');
  };

  handleChange = e => {
    const account = { ...this.state.account };
    account.username = e.currentTarget.value;
    this.setState({ account });
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
            <input
              autoFocus
              onChange={this.handleChange}
              value={this.state.account.username}
              className="form-control"
              id="username"
              type="text"
            />
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
