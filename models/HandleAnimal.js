const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    color: String,
    gender: String,
    buyDate: String,
    milk: String,
    vacine : String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("HandleAnimal", animalSchema);