import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fullname } from '../../utils';

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

class AuthorsList extends Component {

    constructor(props) {
      super(props);
      this.state = {
        profiles: []
      }
    }

    componentWillMount() {
        this.setState({profiles: this.props.authors.map(author => <RemoteMiniProfile author={author} key={author.login.uuid}/>)});
        console.log(this.props.authors);
    }
  
    render() {
      return (
        <div className="content">
          {this.state.profiles}
        </div>
      );
    }
}

const mapStateToProps = (state) => ({
    authors: state.users
});

export default connect(mapStateToProps)(AuthorsList);