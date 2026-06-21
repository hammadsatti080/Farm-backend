const express = require("express");
const router = express.Router();
const AnimalCategory = require("../models/AnimalCategory");

router.post("/", async (req, res) => {
  try {
    const category = await AnimalCategory.create({
      name: req.body.name,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await AnimalCategory.find().sort({
      createdAt: -1,
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const category =
      await AnimalCategory.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name },
        { new: true }
      );

    res.json(category);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await AnimalCategory.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;