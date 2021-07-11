import "./share.css";
import {PermMedia, Cancel, Close, Send,} from "@material-ui/icons";
import {  Container, CssBaseline, FormControl,
         TextField, Button, Select, IconButton, Grid, MenuItem,
         FormHelperText}  from '@material-ui/core';
import { useStyles } from "../../util/styleForm";
import { useContext, useRef, useState } from "react";
import  AuthContext  from "../../context/AuthContext";
import axios from "axios";
var Spinner = require('react-spinkit');

export default function Share() {
  const {user, loading } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [file, setFile] = useState(null);
  const city = useRef();
  const location = useRef();
  const desc = useRef();
  const price = useRef();
  const [period,setPeriod] = useState("");
  
  const [showForm, setShowForm] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      city: city.current.value,
      location: location.current.value,
      price: price.current.value,
      period: period,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    setShowForm(false);
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };



  const showFormFunc = () => {
    setShowForm(true);
  }

  
  const classes = useStyles();
  return (
    <>
    {loading ? (<div  className="spinnerContainer">
                     <Spinner className="spinner" fadeIn='none'  name="line-spin-fade-loader"  />
                    </div>
                ): (
    <div className="share">
      <div className="shareWrapper">
        {showForm && (
        <div className={classes.formContainer} >
          <IconButton aria-label="close"  color="black" display="block" className={classes.closeButton}  
              onClick={() => setShowForm(!showForm)}
          >
            <Close/>
          </IconButton>
          <Container component="main"  >
           <CssBaseline />
           <div className={classes.paper}>
           <form className={classes.form} noValidate onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
               <TextField
                autoComplete="city"
                name="City"
                variant="outlined"
                required
                fullWidth
                id="city"
                label="city"
                autoFocus
                inputRef={city}
               />
              </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                variant="outlined"
                required
                fullWidth
                id="location"
                label="Location"
                placeholder ="hhh"
                name="location"
                autoComplete="location"
                inputRef={location}
               />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="price"
                label="price"
                name="price"
                autoComplete="price"
                inputRef={price}
              />
            </Grid>

            <Grid item xs={12}>
            <FormControl required className={classes.selectControl}>
              <Select
                value={period}
               onChange={(event) => {
                setPeriod(event.target.value);
              }}
               displayEmpty
               className={classes.selectEmpty}
               inputProps={{ 'aria-label': 'Without label' }}
              >
               
               <MenuItem value={"Day"}>Day</MenuItem>
               <MenuItem value={"Week"}>Week</MenuItem>
               <MenuItem value={"Month"}>Month</MenuItem>
              </Select>
              <FormHelperText>Time</FormHelperText>
            </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="description"
                label="description" 
                id="desc"
                inputRef={desc}
              />
            </Grid>
            
          </Grid>
          <Grid item xs={6} sm={5} >
            
            <label htmlFor="file" className="shareOption">
           <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText"> Add Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            </Grid>
            <Grid>
             {file && (
               <div className="shareImgContainer">
                <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
               </div>
             )}
            </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            <Send/>
           share
          </Button>
          
        </form>
        </div>

      </Container>
      </div>
        )}
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"do you want to share something " + user.username + "?"}
            className="shareInput"
            onClick = {showFormFunc}
          />
        </div>
      </div>
    </div>)}
    </>
  );
}
