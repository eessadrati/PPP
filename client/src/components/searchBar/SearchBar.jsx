import "./searchBar.css";
import React, { useCallback, useEffect, useState } from 'react';
import axios from "axios";
import SearchResult from "./SearchResult";
import Post from "../post/Post";
var Spinner = require('react-spinkit');

const SearchBar = ({searchTerm}) => {
  
    const [searchList, setSearchList] = useState("");
    const [loading, setLoading] = useState(false);
    const [mpost, setMpost] = useState("");
    const [floatDiv, setFloatDiv] = useState("none");
    //const [typeQ, setTypeQ] = useState("all")

   console.log("hhh yis mosklis"+searchTerm);
    
    const fetchData =  useCallback( async(searchTerm) => {
                
                setLoading(false);
                setFloatDiv("none");
              await axios.post(`/posts/search?searchTerm=${searchTerm}&q=city`).then((res)=>{
                setLoading(true);
                setSearchList(res.data); 
              
                // filterContent(res.data, searchTerm); 
              });
              
             
            
               
                },[]);

    useEffect( () => { 
      fetchData(searchTerm);
    },[ fetchData, searchTerm]);
    
    return (
        <>
       {!loading ? (<div  className="spinnerContainer">
                     <Spinner className="spinner"   name="line-spin-fade-loader"  />
                    </div>
                ): (<div className="searchResultContainer">
         <div className=" searchResults" style={{ float:floatDiv }}>
           {searchList.length !== 0 ? (searchList.map((p) => (
             <div className="searchResult" onClick={()=>{setMpost(p); setFloatDiv("left") }}>
                <SearchResult key={p._id} post={p} />
             </div>
            
            ))): (<div className=" searchResults">
                     awedi makayn walo akha hassan
                    </div>)
          }
            
    
          </div> 
          {mpost && (
                  <div className="postSearchContainer">
                     <Post key={mpost._id} post={mpost} />
                   </div>
                )}
            </div>)} 
            
        </>
    );
};

export default SearchBar;
