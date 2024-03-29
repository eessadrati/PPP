const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const City = require("../models/City");

//create a post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    const existingCity = await City.findOne({name:savedPost.city});
    
    if(existingCity){
      await existingCity.updateOne({ $push: { postsId: savedPost.id } });
    }else{
       const newCity = new City({
            name: req.body.city,
            postsId: savedPost.id,
       });
       const savedCity = await newCity.save();
       console.log("savedCity :\n"+savedCity);
    }
     
    res.status(200).json(savedPost );
  } catch (err) {
    res.status(500).json(err);
  }
});

//update a post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//update post availability 

router.put("/:id/availability", async (req, res) => {
  const id = req.params.id;
  const isAvailable= req.body.isAvailable
  try {
    await Post.findOneAndUpdate({_id:id}, {$set:{isAvailable:isAvailable}},  {returnOriginal: false}).exec(function(err, post){
      if(err) return res.status(500).json({err: err.message});
      res.json({post, message: 'Successfully updated'})
    });
   
    // const post = await Post.findById(id);
    // if (post.userId === req.body.userId) {
    //  // await post.updateOne({ $set: req.body });
    //   res.status(200).json("available has been updated");
    // } else {
    //   res.status(403).json("hhhh");
    // }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//like / dislike a post

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//get a post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all post 
router.get("/", async (req, res) => {
   const page = parseInt(req.query.page);
   const perPage = 3;
  try {
    const Posts = await Post.find( {}).skip(perPage * (page - 1)).limit(perPage).sort({createdAt: -1}) ;
                                  
    res.status(200).json(Posts);
  } catch (err) {
    res.status(500).json(err);
  }


 /* Post.find({},function(err, posts) {
    if (err) {
        console.log("tnaket "+err);
        res.send("chi haja machi hiya hadik ");
        next();
    } 
     res.json(posts);
    
});*/
});

//search posts
router.post("/search", async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const q= req.query.q;
  const page = parseInt(req.query.page);
  const perPage = 3;
  try {
    const search = new RegExp(searchTerm,'ig'); 
    if( q=="all"){
      const Posts = await Post.find({ $or:[{city:search },{location:search },{price:search },{desc:search }]}).sort({createdAt: -1});
      res.status(200).json(Posts);
    }
    if(q=="city"){
      const Posts = await Post.find({city: search}).skip(perPage * (page - 1)).limit(perPage);
      res.status(200).json(Posts);
    }
    if(q=="location"){
      const Posts = await Post.find({location: search});
      res.status(200).json(Posts);
    }
    if(q=="price"){
      const Posts = await Post.find({price: search});
      res.status(200).json(Posts);
    }
    if(q=="desc"){
      const Posts = await Post.find({desc: search});
      res.status(200).json(Posts);
    }
  } catch (err) {
    console.log("chi haja f search machi hiya hadik akha hassan ");
    res.status(404).json(err);
  }
});


//get user's all posts

router.get("/profile/:username", async (req, res) => {
  const page = parseInt(req.query.page);
   const perPage = 1;
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id }).skip(perPage * (page - 1)).limit(perPage);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
