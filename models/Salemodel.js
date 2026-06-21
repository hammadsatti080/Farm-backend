const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  name: String,
  milkType: String,
  quantity: Number,
  pricePerKg: Number,
  totalPrice: Number,
  date: String,
  time: String,
});

module.exports = mongoose.model("Sale", saleSchema);