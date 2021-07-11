import "./topbar.css";
import { Person, Chat, Notifications,  Search, Home, LocationCity } from "@material-ui/icons";
import { NavLink, Link, Route, Redirect } from "react-router-dom";
import { useContext, useState } from "react";
import  AuthContext  from "../../context/AuthContext";
import LogOutBtn from "../../pages/login/logOutBtn";
import SearchBar from "../searchBar/SearchBar";
import Cities from "../../pages/cities/Cities";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  
 
  const [searchTerm, setSearchTerm] = useState("");
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
    <div className="topbarContainer">
      <div className="topbarLeft">
        <LogOutBtn />
      </div>
      <div className="topbarCenter">
      <div className="searchbar">
          <Search className="searchIcon" />
         
          <input
           onChange={(e)=>{setSearchTerm(e.currentTarget.value)}}
            placeholder="Search for ..."
            className="searchInput"
          />
          
          
        </div>
      
      
      </div>
      <div className="topbarRight">
        
        <div className="topbarIcons">
        <div className="topbarIconItem">
          <NavLink exact to="/" activeStyle={{ color: 'black' }} style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <Home/>
           
          </NavLink>
            
          </div>
          <div className="topbarIconItem">
          <NavLink to={{
                     pathname: "/cities",
                     state: { hh: 'true'}
                     }} 
                    activeStyle={{ color: 'black' }}
                    style={{ color: 'inherit', textDecoration: 'inherit'}}
                    render={(props) => <Cities {...props} />}  >
            <LocationCity/>
          </NavLink>
            
          </div>
          
          <div className="topbarIconItem">
          <NavLink to="/users" activeStyle={{ color: 'black' }} style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <Person />
            {/*<span className="topbarIconBadge">1</span>*/}
            </NavLink>
          </div>
          <div className="topbarIconItem">
          <NavLink to="/messenger" activeStyle={{ color: 'black' }} style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <Chat />
           
            </NavLink>
          </div>
          <div className="topbarIconItem">
          <NavLink to="/cc" activeStyle={{ color: 'black' }} style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <Notifications />
            </NavLink>
          </div>
        </div>
        <div className="profileLink">
  <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
        </div>
      
      </div>
    </div>
    <div>
    <Route path="/search" render={(props)=>(<SearchBar {...props} searchTerm={searchTerm} /> )} />
    {searchTerm.trim().length>2 ? (
            <Redirect to="/search"/>
        ): (
            <Redirect to="/"/>
        )}
    </div>
    </>
  );
}
