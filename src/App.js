import React, { Component } from 'react';

import './App.css';
import { fullname } from './utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }
  render() {
    return (
      <div className="App">
        <Header />
        <AuthorList />
      </div>
    );
  }
}

const Header = () => {
  return(
    <header className="App-header">
      <div className="App-title">FollowMe!</div>
      <LoginForm />
    </header>
  );
}

class LoginForm extends Component {

  state = {
    user: '',
    password: ''
  };
  
  handleChange = (field) => (event) => {
    this.setState({
      [field]: event.target.value
    });
  };

  render() {
    return(
      <div className="App-login">
      <span>Login:</span>
      <span><input type="text" value={this.state.user} placeholder="user" size="15" onChange={this.handleChange('user')}/></span>
      <span><input type="password" value={this.state.password} placeholder="password" size="15" onChange={this.handleChange('password')}/></span>
      </div>
    );
  }
}

class AuthorList extends Component {
  getProfiles = (n) => {
    let profiles = [];
    for(let i = 1; i <= n; i++) {
      profiles.push(<RemoteMiniProfile n={i} key={i}/>);
    }
    return profiles;
  }

  render() {
    return (
      <div className="content">
        {this.getProfiles(100)}
      </div>
    )}
}

const MiniProfile = ({user}) => {
  return (
    <div className="profile">
      <img className="avatar" src={user.picture} alt={user.name}/>
      <div className="name">{user.name}</div>
    </div>
  );
}

class RemoteMiniProfile extends Component {
  state = {
    ...this.props,
    user: {
      name: 'name',
      picture: '//placehold.it/80x80'
    }
  }

  componentDidMount() {
    fetch(`https://randomuser.me/api/?page=${this.state.n}&results=1&seed=abc&inc=name,picture`)
    .then(response => response.json())
    .then(json => {
      const result = json.results[0];
      this.setState({
        user: {
          name: fullname(result),
          picture: result.picture.medium
        }
      });
    });
  }
  
  render() {
    const author = this.state.user;
    return (
      <MiniProfile user={author} />
    );
  }
}

export default App;
