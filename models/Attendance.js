const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    attendance: {
      type: String,
      enum: ["Present", "Absent"],
      default: "Present",
    },
    selectedDate: {
      type: String,
    },
    selectedTime: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);