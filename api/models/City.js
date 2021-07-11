const mongoose = require("mongoose");
//const Post= require("./Post");

const CitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    postsId: {
        type: Array,
        default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cities", CitySchema);
