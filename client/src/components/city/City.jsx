import React from "react";
import "./city.css";



const City = ({city}) => {
   
  return (
      <>
    <div className="city">
      <div className="cityWrapper">
        <div className="cityCenter">
          <span className="cityText">{city.name} </span>
        </div>
        <div className="cityBottom">
          <div className="cityBottomRight">
            <span className="cityCommentText">{city.postsId.length} posts</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default City;
