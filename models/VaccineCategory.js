const mongoose = require("mongoose");

const VaccineCategorySchema = new mongoose.Schema(
  {
    animalCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AnimalCategory",
      required: true,
    },

    vaccines: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "VaccineCategory",
  VaccineCategorySchema
);