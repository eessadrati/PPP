import axios from "axios";
import { useContext, useState } from "react";
import "./register.css";
import { Link as LinkTo } from "react-router-dom";
import AuthContext  from "../../context/AuthContext";
import { useHistory } from "react-router";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useStyles, Copyright } from "../../util/styleForm";
import  {VisibilityOff,Visibility, Email, Lock, AccountCircle } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';


export default function Register() {
  const [email,setEmail] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [passwordAgain,setPasswordAgain] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [showPasswordAgain,setShowPasswordAgain] = useState(false);
  const history = useHistory();
  const { getLoggedIn } = useContext(AuthContext);
  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain !== password) {
      console.log("Passwords don't match!");
    } else {
      const user = {
        username: username,
        email: email,
        password: password,
      };
      try {
        await axios.post("/auth/register", user);
        await getLoggedIn();
        history.push("/");
      } catch (err) {
        console.log(err);
      }
    }
  };
  const classes = useStyles();

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Kirae</h3>
          <span className="loginDesc">
          The best choice to reserve houses from your home  in different cities
          </span>
        </div>
        <div className="loginRight">
         <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
           <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
           </Avatar>
           <Typography component="h1" variant="h5">
             Sign Up
           </Typography>
           <form className={classes.form} noValidate onSubmit={handleClick}>
            <TextField
             variant="outlined"
             margin="normal"
             required
             fullWidth
             id="username"
             label="username"
             name="username"
             autoComplete="username"
             autoFocus
             onChange={(e) => setUsername(e.target.value)}
              value={username}
              InputProps={{ startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle/>
              </InputAdornment>
             )
              }}
            />
            <TextField
             variant="outlined"
             margin="normal"
             required
             fullWidth
             id="email"
             label="Email Address"
             name="email"
             autoComplete="email"
             onChange={(e) => setEmail(e.target.value)}
              value={email}
              InputProps={{ startAdornment: (
                <InputAdornment position="start">
                  <Email/>
              </InputAdornment>
             )
              }}
            />
            <TextField
             variant="outlined"
             margin="normal"
             required
             fullWidth
             name="password"
             label="Password"
             type={showPassword ?  "text" :"password" }
             id="password"
             autoComplete="current-password"
             onChange={(e) => setPassword(e.target.value)}
              value={password}
             minLength="6"
             InputProps={{ startAdornment: (
              <InputAdornment position="start">
             <Lock/>
            </InputAdornment>
           ),
             endAdornment:( <InputAdornment position="end">
             <IconButton
               aria-label="toggle password visibility"
               onClick={() => setShowPassword(!showPassword)}
               edge="end"
             >
               {showPassword ?  <VisibilityOff />: <Visibility />}
             </IconButton>
           </InputAdornment>
         )
       }}
            />
            <TextField
             variant="outlined"
             margin="normal"
             required
             fullWidth
             name="confirmPassword"
             label="Confirm Password"
             type={showPasswordAgain ?  "text":  "password"}
             id="confirmPassword"
             autoComplete="current-password"
             onChange={(e) => setPasswordAgain(e.target.value)}
             value={passwordAgain}
             minLength="6"
             InputProps={{ startAdornment: (
              <InputAdornment position="start">
             <Lock/>
            </InputAdornment>
           ),
           endAdornment:( <InputAdornment position="end">
             <IconButton
               aria-label="toggle password visibility"
               onClick={() => setShowPasswordAgain(!showPasswordAgain)}
               edge="end"
             >
               {showPasswordAgain ?  <VisibilityOff />: <Visibility />}
             </IconButton>
           </InputAdornment>
         )
       }}
            />
            <Button
             type="submit"
             fullWidth
             variant="contained"
             color="primary"
             className={classes.submit}
            >
             Sign Up
            </Button>
            <Grid container>
             <Grid item>
              <LinkTo to="/login" variant="body2">
                {"  Already have an account? Sign in"}
              </LinkTo>
             </Grid>
            </Grid>
          </form>
          </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container> 
        </div>
      </div>  
    </div>
  );
}
