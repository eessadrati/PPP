import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { Facebook } from 'react-content-loader';

import  AuthContext  from "../../context/AuthContext";

export default function Post({ post }) {

  const [user, setUser] = useState({});
  const {user:me} =  useContext(AuthContext);
  const [userPost, setUserPost] =useState(false);
  const [updatedPost, setUpdatedPost] =useState();
  const [loading, setLoading] = useState(true);
  var currentPost =  updatedPost ? updatedPost : post;   //initial value to avoid undefined hh
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  useEffect(() => {
    const fetchUser = async () => {
      setLoading(false);
      const res = await axios.get(`/users?userId=${currentPost.userId}`);
      setLoading(true);
      setUser(res.data);
    };
    fetchUser();
  }, [currentPost.userId]);

  useEffect(() => {
    if(currentPost.userId=== me._id){
      setUserPost(true);
    }else{
      setUserPost(false);
    }
   
    console.log(currentPost._id);
  }, [currentPost,me]);

const availabilityHandler = async ()=>{
   await axios.put("/posts/"+currentPost._id+"/availability", { isAvailable: !currentPost.isAvailable}).then( res =>{

      console.log("hh zabi"+ currentPost.isAvailable);
      console.log("hh tabon"+ res.data.post.isAvailable);
      setUpdatedPost(res.data.post);
     
   }
   
    
   );
}
  return (
    <>
    {!loading ? (<Facebook />):(
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
            <span className="postDate">{format(currentPost.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div>
           {userPost ? (
           <div onClick={availabilityHandler} className={currentPost.isAvailable ? "postAvailable-mypost":"postNotAvailable-mypost"}>
            {currentPost.isAvailable ? "Available": "Not Available"}
          </div>
          ):(
            <div className={currentPost.isAvailable ? "postAvailable-otherspost":"postNotAvailable-otherspost"}>
            {currentPost.isAvailable ? "Available": "Not Available"}
          </div>
          )}
        </div>
        <div className="postCenter">
          <div>
            <span className="postText">City: </span>{currentPost?.city}
          </div>
          <div>
            <span className="postText">Location: </span>{currentPost?.location}
          </div>
          <div>
            <span className="postText">Price: </span>{currentPost?.price }
            <span style={{fontSize: '15px'}}> DH/</span>{currentPost?.period}
          </div>
            <div>
            {currentPost?.desc}
            </div>
          <img className="postImg" src={PF + currentPost.img} alt="" />
        </div>
      </div>
    </div>)}
    </>
  );
}
