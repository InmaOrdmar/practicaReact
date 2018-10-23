import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LOGIN, LOGIN_ERROR, KEEP_SESSION } from '../../actionTypes';
import { loginApi } from '../../utils';


class Login extends Component {

  state = {
    user: '',
    password: ''
  }

  componentDidMount() {
    this.props.keepSession();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleLogIn(this.state.user, this.state.password);
    this.setState({
      user: '',
      password: ''
    });
  }

  render() {
    return (
      <form className="App-greeting" onSubmit={this.handleSubmit}>
        <span><input type="text" value={this.state.user} placeholder="user" name="user" size="15" onChange={this.handleChange}/></span>
        <span><input type="password" value={this.state.password} placeholder="password" name="password" size="15" onChange={this.handleChange}/></span>
        <span><button type="submit">Login</button></span>
      </form>
    );
  }
}

const logIn = async (user, password) => {
  try {
    const match = await loginApi(user, password);
    const activeUser = match.login.username;
    localStorage.setItem('activeUser', activeUser);
    console.log(`Log in success. Active user: ${activeUser}`);
    return {type: LOGIN, payload: activeUser};
  } catch {
    console.log('User not found');
    return {type: LOGIN_ERROR};
  }
}

const checkSession = () => {
  const activeUser = localStorage.getItem('activeUser');
  if (activeUser) {
    return {type: KEEP_SESSION, payload: activeUser}; 
  } else {
    return {type: 'default'};
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
  },
  keepSession: () => dispatch(checkSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
