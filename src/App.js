import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Login from './components/login/Login';
import AuthorsList from './components/authorsList/authorsList';
import { FETCH_USERS } from './actionTypes';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
    componentWillMount() {
      fetch('https://randomuser.me/api/?results=100&seed=abc')
      .then(response => response.json())
      .then(json => {
        const users = json.results;
        this.setState({ users });
        this.props.saveUsers(users);
      });
    }

  render() {
    return (
      <div className="App">
        <Header />
        <AuthorsList />
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




const saveUsersAction = (users) => {
  return ({
    type: FETCH_USERS,
    payload: users
  });
}

const mapDispatchToProps = dispatch => ({
  saveUsers: (users) => dispatch(saveUsersAction(users))
});

export default connect(null, mapDispatchToProps)(App);
