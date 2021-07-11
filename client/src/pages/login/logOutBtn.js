import React, { useContext } from "react";
import "./login.css";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { BiLogOut } from 'react-icons/bi';
import { useHistory } from "react-router-dom";

const LogOutBtn = () => {
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  async function logOut() {
    await axios.get("/auth/logout");
    await getLoggedIn();
    history.push("/login");
  }
  return (<div className="logOutButton" onClick={logOut} > <BiLogOut size={22} className="BiLogOut"/> <span className="logOut">Log out</span> </div>)
};

export default LogOutBtn;
