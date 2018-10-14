import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Login from './components/login/Login';
import AuthorsList from './components/authorsList/authorsList';
import { FETCH_USERS } from './actionTypes';


class App extends Component {
  
  componentDidMount() {
    this.props.saveUsers();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <AuthorsList authors={this.props.users}/>
      </div>
    );
  }
}

const Header = () => {
  return(
    <header className="App-header">
      <div className="App-title">FollowMe!</div>
      <Login />
    </header>
  );
}

const mapStateToProps = state => ({
  users: state.users
});

const fetchUsers = () => {
  return dispatch => {
    fetch('https://randomuser.me/api/?results=100&seed=abc')
    .then(response => response.json())
    .then(json => {
      const users = json.results;
      dispatch ({
        type: FETCH_USERS,
        payload: users
      });
    });
  }
}
const mapDispatchToProps = dispatch => ({
  saveUsers: () => dispatch(fetchUsers())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
