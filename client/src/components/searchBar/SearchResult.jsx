import React from 'react';
import "./searchResult.css";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const SearchResult = ({post}) => {

    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  
    useEffect(() => {
      const fetchUser = async () => {
        const res = await axios.get(`/users?userId=${post.userId}`);
        setUser(res.data);
      };
      fetchUser();
    }, [post.userId]);
    return (
        <div className="post">
         <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link to={`/profile/${user.username}`}>
                <img
                  className="postProfileImg"
                  src={
                   user.profilePicture
                     ? PF + user.profilePicture
                     : PF + "person/noAvatar.png"
                  }
                  alt=""
                />
              </Link>
              <span className="postUsername">{user.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
          </div>
          <div className="postCenter">
            <div>
              <span className="postText">City: </span>{post?.city}
            </div> 
            <div>
              <span className="postText">Location: </span>{post?.location}
            </div>
            <div>
              <span className="postText">Price: </span>{post?.price }
              <span style={{fontSize: '15px'}}> DH/</span>{post?.period}
            </div>
            <div>
              {post?.desc}
            </div>
           
          </div>
         </div>
        </div>
    );
};

export default SearchResult;