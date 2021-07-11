const router = require("express").Router();
const City = require("../models/City");

//get cities 
router.get("/all", async (req, res) => {
    try {
      
      const cities = await City.find({});
      res.status(200).json(cities);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  module.exports = router;