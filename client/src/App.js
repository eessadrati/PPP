import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import  AuthContext  from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import Cities from "./pages/cities/Cities";
import Users from "./pages/users/Users";
import Topbar from "./components/topbar/Topbar"

function App() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
     
        {loggedIn ? (
          <>
          <Topbar />
           <Route path='/' exact component={Home}/>
           <Route path="/messenger" component={Messenger} />
           <Route path="/users" component={Users} />
           <Route path="/cities"  component={Cities} />
          
           <Route path="/profile/:username">
              <Profile />
           </Route>
           <Redirect to="/" />
           
           </>
        ) :(
              <>
             <Route path="/register" component={Register}/> 
             <Route path="/login" component={Login}/> 
             <Redirect to="/login" />  
             </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
