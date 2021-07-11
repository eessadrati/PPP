const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    img: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("posts", PostSchema);
