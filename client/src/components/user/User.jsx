import React from 'react';
import "./user.css";

const User = ({user}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className="user">
      <img
        className="userImg"
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
    );
};

export default User;