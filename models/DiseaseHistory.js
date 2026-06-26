const mongoose = require("mongoose");

const DiseaseHistorySchema = new mongoose.Schema(
  {
    animalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HandleAnimal", // ✅ FIXED HERE
      required: true,
    },

    diseaseName: {
      type: String,
      required: true,
      trim: true,
    },

    diagnosisDate: {
      type: Date,
      required: true,
    },

    recoveryDate: {
      type: Date,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Handleteam", // (keep same if your team model is "Team")
      required: true,
    },

    symptoms: String,
    notes: String,

    status: {
      type: String,
      enum: ["Active", "Recovered"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "DiseaseHistory",
  DiseaseHistorySchema
);