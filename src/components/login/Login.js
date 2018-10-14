import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LOGIN, LOGIN_ERROR } from '../../actionTypes';
import { loginApi } from '../../utils';


class Login extends Component {

  state = {
    user: '',
    password: ''
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleLogIn(this.state.user, this.state.password);
  }

  render() {
    return (
      <div>
        <form className="App-login" onSubmit={this.handleSubmit}>
          <span><input type="text" value={this.state.user} placeholder="user" name="user" size="15" onChange={this.handleChange}/></span>
          <span><input type="password" value={this.state.password} placeholder="password" name="password" size="15" onChange={this.handleChange}/></span>
          <span><button type="submit">Login</button></span>
        </form>
        <div>{(this.props.activeUser) && 'Logged in!'}</div>
      </div>
    
    );
  }
}

const findUser = (user, password) => loginApi(this.props.users)(user, password);

const logIn = (user, password) => dispatch => {
  const activeUser = findUser(user, password);
  if (activeUser) {
    localStorage.setItem('activeUser', activeUser);
    dispatch({type: LOGIN, payload: activeUser});
  } else {
    dispatch({type: LOGIN_ERROR});
  }
}

const mapStateToProps = state => ({
  activeUser: state.loginData.user,
  loginError: state.loginData.loginError,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  handleLogIn: (user, password) => dispatch(logIn(user, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
