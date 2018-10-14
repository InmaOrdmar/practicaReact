import React from 'react';
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

const AuthorsList = (props) => {
  return (
    <div className="content">
      {props.authors.map(author => <RemoteMiniProfile author={author} key={author.login.uuid}/>)}
    </div>
  );
}


export default AuthorsList;