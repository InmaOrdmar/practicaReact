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

  constructor(props) {
    super(props);
    this.state = {
      authors: []
    }
  }

  componentWillMount() {
    fetch('https://randomuser.me/api/?results=100&seed=abc')
    .then(response => response.json())
    .then(json => this.setState({ authors: json.results }));
  }

  render() {
    const profiles = this.state.authors.map(author => <RemoteMiniProfile author={author} key={author.login.uuid}/>);
    return (
      <div className="content">
        {profiles}
      </div>
    )
  }
}

const MiniProfile = ({user}) => {
  return (
    <div className="profile">
      <img className="avatar" src={user.picture} alt={user.name}/>
      <div className="name">{user.name}</div>
    </div>
  );
}

const RemoteMiniProfile = ({author}) => {
  const user = {
    name: fullname(author),
    picture: author.picture.medium
  }
  return <MiniProfile user={user} />
}

export default App;
