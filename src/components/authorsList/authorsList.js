import React from 'react';
import RemoteMiniProfile from '../remoteMiniProfile/RemoteMiniProfile';

const AuthorsList = (props) => {
  return (
    <div className="content">
      {props.authors.map(author => <RemoteMiniProfile author={author} key={author.login.uuid}/>)}
    </div>
  );
}


export default AuthorsList;