import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import  AuthContext  from "../../context/AuthContext";

const Rightbar =({ user }) =>{
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // const [friends, setFriends] = useState([]);
  const [conv, setConv] = useState();
  const { user:currentUser } = useContext(AuthContext);
 // const [followed, setFollowed] = useState(undefined);
  
 

  //  const handleClick = async () => {
  //   try {
  //     if (followed) {
  //       await axios.put(`/users/${user._id}/unfollow`, {
  //         userId: currentUser._id,
  //       });
        
  //     } else {
  //       await axios.put(`/users/${user._id}/follow`, {
  //         userId: currentUser._id,
  //       });
        
  //     }
  //     setFollowed(!followed);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
const MessagesHandler = async ()=>{

  try{
     const existConv= await axios.get("/conversations/conv/"+currentUser._id+"?receiverId="+user._id);
     
     if(existConv.data.length>0){
      setConv(existConv.data)
     }else{
      const newConv= {
        senderId: currentUser._id,
        receiverId:user._id,
       }
       await axios.post("/conversations", newConv).then(res=>{
         setConv(res.data);
       });
       
     }
  }catch(err){
    console.log(err);
  }
}
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Hamid</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

   const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton"  onClick={MessagesHandler} >
           
            Message
          </button>
        )}
        
        {conv && (<Redirect to={{
                     pathname: "/messenger",
                     state: { conv: conv}
                     }}
                  style={{ color: 'inherit', textDecoration: 'inherit'}}
                 />)}

        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
         
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
export default Rightbar;
