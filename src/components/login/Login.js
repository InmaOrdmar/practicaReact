import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LOGIN, LOGIN_ERROR } from '../../actionTypes';


class Login extends Component {

  render() {
    return (
      <div>
        <form className="App-login" onSubmit={this.props.handleSubmit}>
          <span><input type="text" value={this.props.user} placeholder="user" name="user" size="15" onChange={this.props.handleChange}/></span>
          <span><input type="password" value={this.props.password} placeholder="password" name="password" size="15" onChange={this.props.handleChange}/></span>
          <span><button type="submit">Login</button></span>
        </form>
      </div>
    
    );
  }
}
const changeActionCreator = dispatch => (event) => {
  dispatch({
    type: `CHANGE_${event.target.name.toUpperCase()}`, 
    payload: event.target.value
  });
}

const findMatch = (users, user, password) => {
  const match = users.find(profile => profile.login.username === user && profile.login.password === password);
  if(match) {
    return {type: LOGIN, payload: match.login.username};
  } else {
    return {type: LOGIN_ERROR};
  }  
};

const loginActionCreator = (event) => (users, user, password) => {
  return dispatch => {
    event.preventDefault();
    dispatch(findMatch(users, user, password));
  }
}

const mapStateToProps = state => ({
  activeUser: state.loginData.user,
  loginError: state.loginData.loginError,
  user: state.loginForm.user,
  password: state.loginForm.password,
  users: state.users
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleChange: (event) => dispatch(changeActionCreator(event)),
  handleSubmit: (event) => dispatch(loginActionCreator(event)(ownProps.users, ownProps.user, ownProps.password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
