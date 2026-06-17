const express = require("express");
const router = express.Router();
const Milk = require("../models/Milk");

// GET

// GET (WITH SEARCH + FILTER)
router.get("/", async (req, res) => {

     const data = await Milk.find().populate("category");
  res.json(data);
  try {
    const { search, milkType, category } = req.query;

    let filter = {};

    // 🔍 search by milkType or ID
    if (search) {
      filter.$or = [
        { milkType: { $regex: search, $options: "i" } },
        { milkId: Number(search) || 0 },
      ];
    }

    // 🥛 filter by milk type
    if (milkType) {
      filter.milkType = milkType;
    }

    // 📦 filter by category
    if (category) {
      filter.category = category;
    }

    const data = await Milk.find(filter).populate("category");

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  
});
// CREATE
router.post("/", async (req, res) => {
  try {
    const { category, milkType, quantity, date } = req.body;

    // AUTO TIME (server time)
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const lastMilk = await Milk.findOne().sort({ milkId: -1 });

    const newMilk = await Milk.create({
      milkId: lastMilk ? lastMilk.milkId + 1 : 1,
      category,
      milkType,
      quantity,
      date,
      time,
    });

    res.json(newMilk);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= UPDATE (EDIT) =================
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Milk.findByIdAndUpdate(
      id,
      {
        $set: req.body, // update only passed fields
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Milk not found" });
    }

    res.json({
      message: "Milk updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= DELETE =================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Milk.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Milk not found" });
    }

    res.json({
      message: "Milk deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;