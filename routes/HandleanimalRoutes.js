const express = require("express");
const router = express.Router();

const Animal = require("../models/HandleAnimal");


// =========================
// GET ALL
// =========================
router.get("/", async (req, res) => {
  try {
    const animals = await Animal.find().sort({ createdAt: -1 });
    res.json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// =========================
// CREATE
// =========================
router.post("/", async (req, res) => {
  try {
    const animal = new Animal(req.body);
    const saved = await animal.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// =========================
// UPDATE (EDIT)
// =========================
router.put("/:id", async (req, res) => {
  try {
    const updated = await Animal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Animal not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// =========================
// DELETE
// =========================
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Animal.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Animal not found" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;