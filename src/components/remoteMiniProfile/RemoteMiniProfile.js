import React from 'react';
import { fullname } from '../../utils';

const MiniProfile = ({user, msg}) => {
  return (
    <div className="profile">
      <img className="avatar" src={user.picture} alt={user.name}/>
      <div className="name">{msg ? msg : ''}{user.name}</div>
    </div>
  );
}
    
const RemoteMiniProfile = ({author, msg}) => {
  const user = {
    name: fullname(author),
    picture: author.picture.medium
  }
  return <MiniProfile user={user} msg={msg}/>
}

export default RemoteMiniProfile;