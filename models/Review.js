const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    title: String,
    service: String,
    review: String,
    rating: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);