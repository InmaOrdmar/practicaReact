import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findUser } from '../../utils';
import RemoteMiniProfile from '../remoteMiniProfile/RemoteMiniProfile';
import { LOGOUT } from '../../actionTypes';

class Welcome extends Component {

  state = {
    users: []
  }

  componentDidUpdate(prevProps) {
    if(prevProps.users.length < 1) {
      this.setState({
        users: this.props.users
      });
      this.render();
    }
  }

  handleLogOut = () => {
    this.props.logOut();
    localStorage.removeItem('activeUser');
  }

  render() {
    if (this.state.users.length > 0) {
      return (
        <div>
          <span><RemoteMiniProfile msg={'Welcome, '} author={findUser(this.state.users, this.props.username)} /></span>
          <span><LogOutButton onLogOut={this.handleLogOut}/></span>
        </div>
      );
    } else {
      return <div>Welcome, you are logged in!</div>
    }
    
  }
}

const LogOutButton = (props) => {
  return (
    <button onClick={props.onLogOut}>Logout</button>
  );
}

const mapStateToProps = state => ({
    username: state.loginData.activeUser,
    users: state.users
});

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch({type: LOGOUT})
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
  