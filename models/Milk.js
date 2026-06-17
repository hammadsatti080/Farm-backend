const mongoose = require("mongoose");

const milkSchema = new mongoose.Schema(
  {
    milkId: Number,

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    milkType: {
      type: String,
      enum: ["Cow", "Goat", "Buffalo"],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    date: {
      type: String, // selected from calendar
      required: true,
    },

    time: {
      type: String, // auto current time
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Milk", milkSchema);