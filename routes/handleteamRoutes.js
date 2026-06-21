const express = require("express");
const router = express.Router();
const Employee = require("../models/Handleteam");

// GET ALL
router.get("/", async (req, res) => {
  const data = await Employee.find().sort({ createdAt: -1 });
  res.json(data);
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const exists = await Employee.findOne({
      farmNo: req.body.farmNo,
    });

    if (exists) {
      return res.status(400).json({
        message: "Farm No already exists",
      });
    }

    const emp = await Employee.create(req.body);
    res.json(emp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  const emp = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(emp);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;