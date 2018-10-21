import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Welcome from './components/welcome/Welcome';
import Login from './components/login/Login';
import AuthorsList from './components/authorsList/authorsList';
import { API } from './utils';
import { FETCH_USERS } from './actionTypes';


class App extends Component {

  componentDidMount() {
    this.props.saveUsers();
  }

  render() {
    return (
      <div className="App">
        <Header loggedIn={this.props.loggedIn} />
        <AuthorsList authors={this.props.users}/>
      </div>
    );
  }
}

const Header = ({loggedIn, users}) => {
  return(
    <header className="App-header">
      <div className="App-title">FollowMe!</div>
      <Greeting loggedIn={loggedIn} />
    </header>
  );
}

const Greeting = ({loggedIn, users}) => {
  if (loggedIn) {
    return <Welcome />
  } else {
    return <Login />
  }
}

const fetchUsers = () => {
  return dispatch => {
    API()
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

const mapStateToProps = state => ({
  users: state.users,
  loggedIn: state.loginData.loggedIn
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
