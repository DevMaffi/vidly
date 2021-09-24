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
    const { currentTarget: input } = e;
    account[input.name] = input.value;

    this.setState({ account });
  };

  render() {
    const { account } = this.state;

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
              value={account.username}
              name="username"
              className="form-control"
              id="username"
              type="text"
            />
          </div>
          <div className="form-group">
            <label className="clickable" htmlFor="password">
              Password
            </label>
            <input
              onChange={this.handleChange}
              value={account.password}
              name="password"
              className="form-control"
              id="password"
              type="text"
            />
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
