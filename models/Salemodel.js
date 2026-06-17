const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    name: 
    {
     type: String,
    required: true,
      },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    milkType: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true, // always stored in KG
    },

    originalQuantity: Number,
    originalQuantityType: String,

    pricePerKg: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    date: String,
    time: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sale", saleSchema);