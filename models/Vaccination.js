const mongoose = require("mongoose");

const VaccinationSchema = new mongoose.Schema(
  {
    animalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HandleAnimal",
      required: true,
    },

    vaccineName: {
      type: String,
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Handleteam",
    },

    dateGiven: {
      type: Date,
      required: true,
    },

    nextDueDate: {
      type: Date,
    },

    notes: String,

    status: {
      type: String,
      enum: ["Completed", "Pending", "Overdue"],
      default: "Completed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vaccination", VaccinationSchema);