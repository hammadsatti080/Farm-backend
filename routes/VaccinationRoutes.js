const express = require("express");
const router = express.Router();

const Vaccination = require("../models/Vaccination");

// CREATE
router.post("/", async (req, res) => {
  try {
    const data = await Vaccination.create(req.body);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const data = await Vaccination.find()
      .populate("animalId")
      .populate("doctorId");

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Vaccination.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;