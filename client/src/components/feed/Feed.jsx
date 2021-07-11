import { useContext, useEffect, useState, useRef, useCallback } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import  AuthContext  from "../../context/AuthContext";
var Spinner = require('react-spinkit');



export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasEnded, setHasEnded] = useState(false); // to indicate whether or not we've fetched all the records
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const container = useRef(null);
  
  
  
  const trackScrolling = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight 
    ) {
      setPage(prevPage => prevPage + 1);

      document.removeEventListener("scroll", trackScrolling);
    }
  },[]); 
  const fetchPosts = useCallback( async () => {
    setLoading(true);
    const res = username
      ? await axios.get("/posts/profile/" + username+"?page="+page)
      : await axios.get("/posts?page="+page);
      if (res.data.length === 0) {
        setHasEnded(true);
      } else {
        console.log("res");
        console.log(res);
        setPosts(prevPosts=>[...prevPosts, ...res.data]);
      }
      setLoading(false);
   
  },[username,page]); 

  useEffect(() => {
    if (!hasEnded) {
      fetchPosts(page);
    }

    return () => {
      document.removeEventListener("scroll", trackScrolling);
    };
  }, [page, hasEnded,fetchPosts,trackScrolling]);

  useEffect(() => {
    document.addEventListener("scroll", trackScrolling);
  }, [posts,trackScrolling]);


  return (
    <div className="feed">
      
      <div className="feedWrapper">
                
             {(!username || username === user.username) && <Share />}
               {posts.map((p) => (
                 <Post key={p._id} post={p} />
               ))}
               {loading && (
                    <div  className="spinnerContainer">
                     <Spinner className="spinner" fadeIn='none'  name="line-spin-fade-loader"  />
                    </div>
               )}

            <div ref={container}>
            {hasEnded && (
             <div className="end-articles-msg">
                <p>You're all caught up!</p>
             </div>
             )}
            </div>
                  
            
        
    </div>
    </div>
  );
}
