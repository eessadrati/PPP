import React from 'react';
import "./cittyPosts.css";
import Post from "../post/Post";
import { useEffect, useState, useRef, useCallback } from "react";
import {CircularProgress } from "@material-ui/core";
import axios from "axios";

const CityPosts = ({cityName}) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasEnded, setHasEnded] = useState(false); // to indicate whether or not we've fetched all the records
    const [loading, setLoading] = useState(true);
    const container = useRef(null);
    console.log(cityName);
    
    
    
    const trackScrolling = useCallback(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight 
      ) {
        setPage(prevPage => prevPage + 1);
  
        document.removeEventListener("scroll", trackScrolling);
      }
    },[]); 
    const fetchCitiespost  = useCallback( async () => {
         setLoading(false);
        const res=  await axios.post(`/posts/search?searchTerm=${cityName}&q=city&page=${page}`);
        if (res.data.length === 0) {
            setHasEnded(true);
          } else {
            console.log("res");
            console.log(res);
            setPosts(prevPosts=>[...prevPosts, ...res.data]);
          }
          setLoading(false);

       
      }, [cityName,page]);


    useEffect(() => {
        if (!hasEnded) {
            fetchCitiespost(page);
        }
    
        return () => {
          document.removeEventListener("scroll", trackScrolling);
        };
      }, [page, hasEnded,fetchCitiespost,trackScrolling]);
    
      useEffect(() => {
        document.addEventListener("scroll", trackScrolling);
      }, [posts,trackScrolling]);
    return (
        <div className="feed">
      
        <div className="feedWrapper">
          {posts.map((p) => (
            <Post key={p._id} post={p} />
          ))}
        </div>
        <div ref={container}>
        {loading && (<div className=" searchResults" >
                       <CircularProgress color="secondary" />
                       Getting new posts...
                      </div>
                  )}
        {hasEnded && (
          <div className="end-articles-msg">
            <p>You're all caught up!</p>
          </div>
        )}
      </div>
      </div>
    );
};

export default CityPosts;