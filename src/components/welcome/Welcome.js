import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findUser } from '../../utils';
import RemoteMiniProfile from '../remoteMiniProfile/RemoteMiniProfile';

class Welcome extends Component {

  state = {
    users: []
  }
  
  componentDidUpdate(prevProps) {
    if(prevProps.users.length < 1) {
      this.setState({
        users: this.props.users
      });
    }
  }

  render() {
    if (this.state.users.length > 0) {
      return (
        <div>
          <span><RemoteMiniProfile msg={'Welcome, '} author={findUser(this.state.users, this.props.username)} /></span>
          <span><button>Logout</button></span>
        </div>
      );
    } else {
      return <div>Welcome, you are logged in!</div>
    }
    
  }
}

const mapStateToProps = state => ({
    username: state.loginData.activeUser,
    users: state.users
});

export default connect(mapStateToProps)(Welcome);
  