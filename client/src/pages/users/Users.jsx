import axios from 'axios';
import React, { useCallback, useEffect,useRef, useState }  from 'react';
import { Link } from 'react-router-dom';
import User from '../../components/user/User';
import "./users.css";
var Spinner = require('react-spinkit');

const Users = () => {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [usersList, setUsersList] = useState([]);
    const [page, setPage] = useState(1);
    const [hasEnded, setHasEnded] = useState(false);
    const container = useRef(null);
    
    const trackScrolling = useCallback(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight 
      ) {
        setPage(prevPage => prevPage + 1);
        document.removeEventListener("scroll", trackScrolling);
      }
    },[]); 
     
    const fetchUsers = useCallback( async () => {
      setLoading(true);
      const res = searchTerm.length>1 ? await axios.get("/users/all/search?searchTerm="+searchTerm+"&page="+page)
                                       : await axios.get("/users/all?page="+page) ;
      
        if (res.data.length === 0) {
          setHasEnded(true);
        } else {
          setUsersList(prevUsers=>[...prevUsers, ...res.data]);
        }
        setLoading(false);
     
    },[page,searchTerm]); 

    useEffect(() => {
      if (!hasEnded) {
        fetchUsers(page);
      }
      
    return () => {
      document.removeEventListener("scroll", trackScrolling);
    };
  }, [page, hasEnded,fetchUsers,trackScrolling]);

  useEffect(() => {
    document.addEventListener("scroll", trackScrolling);
  }, [usersList,trackScrolling]);
    
      //  useEffect(()=>{
      //       const searchUsers = async()=>{
      //          setLoading(true);
      //         const res = await axios.get(`/users/all/search?searchTerm=${searchTerm}?page=${page}`);
      //         if (res.data.length === 0) {
      //           setHasEnded(true);
      //         } else {
                
      //           setSearchList(prevPosts=>[...prevPosts, ...res.data]);
      //         }
      //         setLoading(false);
      //         // .then((res)=>{
      //         //        setLoading(true);
      //         //        setSearchList(res.data); 
      //         //  });
      //       }
      //       searchUsers();
      //  },[searchTerm]);
       
        // useEffect( () => { 
        //     setLoading(false);
        //     const fetchData = async() => {
        //         await axios.get(`/users/all`).then((res)=>{
        //             console.log(res.data);
        //             setUsersList(res.data);
        //             setLoading(true);
        //          })
        //     }
        //     fetchData();
        //   },[]);
    return (
         <div className="users">
        <div className="usersWrapper" >
        <input placeholder="Search for friends" className="chatMenuInput" onChange={(e)=>{setSearchTerm(e.currentTarget.value)}} />
        { usersList.map((u) => (
                  <Link to={`/profile/${u.username}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                       <div  >
                     <User key={u._id} user={u} />
                 
                       </div>
                  </Link>
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
};

export default Users;