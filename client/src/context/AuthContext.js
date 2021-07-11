import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  async function getCurrentUser(){
     setLoading(true);
     await axios.get("/auth/currentUser").then((res)=>{
           setLoading(false);
           setUser(res.data);
    });
    
  }
  
  

  async function getLoggedIn() {
    const loggedInRes = await axios.get("/auth/loggedIn");
     setLoggedIn(loggedInRes.data);
     
   // if(loggedIn){
   //   const  userIn =await axios.get("/auth/gg");
    //  setUser(userIn.data);
    //}
    
   
    
  }
  useEffect(() => {
    if(loggedIn){
      getCurrentUser();
    }
    getLoggedIn(); 
  }, [loggedIn]);


  return (
    <AuthContext.Provider value={{ user, loading, loggedIn, getLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
