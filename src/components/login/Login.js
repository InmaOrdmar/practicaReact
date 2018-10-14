import React from 'react';
import { connect } from 'react-redux';
import { LOGIN, LOGIN_ERROR } from '../../actionTypes';


const LoginView = ({user, password, loggedIn, activeUser, loginError, handleChange, handleSubmit}) => {
  return(
    <div>
      <form className="App-login" onSubmit={handleSubmit(user, password)}>
        <span><input type="text" value={user} placeholder="user" name="user" size="15" onChange={handleChange}/></span>
        <span><input type="password" value={password} placeholder="password" name="password" size="15" onChange={handleChange}/></span>
        <span><button type="submit">Login</button></span>
      </form>
      <div>
        Logged in: {loggedIn}. Active user: {activeUser}. Login error: {loginError}.
      </div>
    </div>
  );
}

const changeActionCreator = (event) => {
  return({
    type: `CHANGE_${event.target.name.toUpperCase()}`, 
    payload: event.target.value
  });
}

const loginActionCreator = (event) => (user, password) => {
  event.preventDefault();
    fetch('https://randomuser.me/api/?results=100&seed=abc')
    .then(response => response.json())
    .then(json => {
      const match = json.results.find(profile => profile.login.username === user && profile.login.password === password);
      if(match) {
        return {type: LOGIN, payload: match.login.username};
      } else {
        return {type: LOGIN_ERROR};
      }  
    });
}

const mapStateToProps = state => ({
  loggedIn: state.loginData.loggedIn,
  activeUser: state.loginData.user,
  loginError: state.loginData.loginError,
  user: state.loginForm.user,
  password: state.loginForm.password
});

const mapDispatchToProps = dispatch => ({
  handleChange: () => dispatch(changeActionCreator()),
  handleSubmit: () => (user, password) => dispatch(loginActionCreator(user, password))
});

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginView);

export default Login;
