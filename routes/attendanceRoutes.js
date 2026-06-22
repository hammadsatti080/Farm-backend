const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// ================= TEAM =================
router.get("/handleteam", async (req, res) => {
  try {
    const team = [
      { _id: "1", name: "Ali" },
      { _id: "2", name: "Ahmed" },
      { _id: "3", name: "Sara" },
    ];

    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ================= SAVE SINGLE =================
router.post("/saveattendance", async (req, res) => {
  try {
    let { name, attendance, selectedDate, selectedTime } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    // ✅ normalize date
    selectedDate =
      selectedDate || new Date().toISOString().split("T")[0];

    const newRecord = new Attendance({
      name,
      attendance,
      selectedDate,
      selectedTime,
    });

    await newRecord.save();

    res.json({
      message: "Attendance saved successfully",
      data: newRecord,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ================= SAVE BULK (SAVE ALL) =================
router.post("/saveattendance/bulk", async (req, res) => {
  try {
    let data = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    const today = new Date().toISOString().split("T")[0];

    // ✅ normalize + enforce date
    const formattedData = data.map((item) => ({
      name: item.name,
      attendance: item.attendance || "Present",
      selectedDate:
        item.selectedDate || today,
      selectedTime: item.selectedTime || "",
    }));

    const inserted = await Attendance.insertMany(formattedData);

    res.json({
      message: "Bulk attendance saved successfully",
      count: inserted.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ================= GET ALL =================
router.get("/all", async (req, res) => {
  try {
    const data = await Attendance.find().sort({ createdAt: -1 });

    // (optional safety normalization)
    const cleaned = data.map((d) => ({
      ...d._doc,
      selectedDate: d.selectedDate
        ? new Date(d.selectedDate).toISOString().split("T")[0]
        : "",
    }));

    res.json(cleaned);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;