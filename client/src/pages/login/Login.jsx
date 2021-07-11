import { useContext, useState } from "react";
import "./login.css";
import AuthContext  from "../../context/AuthContext";
import axios from "axios";
import { useHistory, Link as LinkTo } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useStyles, Copyright } from "../../util/styleForm";
import  {VisibilityOff,Visibility,Email, Lock } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';




export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();


  async function login(e) {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };

      await axios.post("/auth/login", loginData);
      await getLoggedIn();
      history.push("/");
   
    } catch (error) {
      console.error(error);
    }
  }
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={login}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
            type={showPassword ?"text"  : "password"}
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            InputProps={{ startAdornment: (
               <InputAdornment position="start">
              <Lock/>
             </InputAdornment>
            ),
            endAdornment: (
             <InputAdornment position="end">
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
              
         {/**<FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */} 
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              < LinkTo to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
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
