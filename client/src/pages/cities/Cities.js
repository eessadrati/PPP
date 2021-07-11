import React, { useEffect, useState } from 'react';
import "./cities.css";
import City from "../../components/city/City";
import CityPosts from "../../components/city/CityPosts";
import axios from 'axios';
import { Link, Switch, Route, Redirect,useLocation } from "react-router-dom";
var Spinner = require('react-spinkit');


const Cities = () => {
    const [hideCities,setHideCities] = useState(false);
    const [cities, setCities] = useState([]);
    const [posts, setPosts] = useState("");
    const [loadinge, setLoadinge] = useState(false);
    const [cityName, setCityName] = useState();;
     const location = useLocation();
  
 useEffect(()=>{
    if(location.state){
    if(location.state?.hh==='true'){
      setHideCities(false);
    }
    }
 },[location.state]);

 useEffect(() => {
        window.addEventListener('popstate', (event) => {
           setHideCities(false);
        });

        setLoadinge(false);
        const fetchCities = async () => {
          const res = await axios.get("/cities/all" );
           setLoadinge(true);
          setCities(
            res.data.sort((c1, c2) => {
              return c2.postsId.length - c1.postsId.length;
            }));
            
        };
        fetchCities();
      }, []);
     
    return (
      <>
      {!hideCities ? (
         <div className="cities">
        <div className="citiesWrapper" >
         
          {!loadinge ? (<div  className="spinnerContainer">
                     <Spinner className="spinner"  name="line-spin-fade-loader"  />
                    </div>):(
          cities.map((c) => (
            <Link to="/cities/posts" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                 <div onClick={()=>{setCityName(c); console.log("piw piw piw "+ c.name); setHideCities(true) }} >
            <City key={c._id} city={c} />
           
            </div>
            </Link>
          )))}
            
              
        </div>
        
    
      </div>
      ):(
        <Switch>
         {cityName ? ( <Route  path="/cities/posts" render={(props)=>(<CityPosts {...props} cityName={cityName.name} key={cityName._id} /> )} />
         ): (
          <Route  path="/cities/posts">
            <Redirect to="/cities" />
          </Route>
        )}
       </Switch>
      )}
          
          
      
       
      
      </>
    );
};

export default Cities;