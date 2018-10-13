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
      <div className="App-login">Login</div>
    </header>
  );
}

class AuthorList extends Component {
  getProfiles = (n) => {
    let profiles = [];
    for(let i = 1; i <= n; i++) {
      profiles.push(<RemoteMiniProfile n={i.toString()} key={i}/>);
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
      picture: '//placehold.it/100x100'
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
