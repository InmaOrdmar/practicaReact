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

const logIn = async (user, password) => {
  console.log(user, password, 'from logIn before trying match');
  try {
    const match = await loginApi(user, password); // aquí está el error pero no consigo averiguar qué falla, siempre manda al catch
    const activeUser = match.login.username;
    console.log(activeUser, 'from logIn after successful match');
    localStorage.setItem('activeUser', activeUser);
    return {type: LOGIN, payload: activeUser};
  } catch {
    console.log('User not found');
    return {type: LOGIN_ERROR};
  }
}

const mapStateToProps = state => ({
  activeUser: state.loginData.user,
  loginError: state.loginData.loginError,
  users: state.users
});

const mapDispatchToProps = dispatch => ({
  handleLogIn: async (user, password) => {
    const loginAction = await logIn(user, password);
    dispatch(loginAction);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
