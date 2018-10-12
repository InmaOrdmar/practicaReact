import React, { Component } from 'react';

import './App.css';

class App extends Component {
  
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

const AuthorList = () => {
  return (
  <div className="content">AuthorList</div>
  );
}

export default App;
