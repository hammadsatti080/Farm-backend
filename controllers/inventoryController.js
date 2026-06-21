const Inventory = require("../models/Inventory");

// CREATE UNIQUE ID
const generateId = () => {
    return (
        "INV-" +
        Math.floor(
            100000 + Math.random() * 900000
        )
    );
};

// GET ALL INVENTORY
exports.getInventory = async (req, res) => {
    try {
        const data = await Inventory.find().sort({
            createdAt: -1,
        });
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
};

// CREATE INVENTORY
exports.createInventory = async (req, res) => {
    try {
        const newItem = new Inventory({
            ...req.body,
            uniqueId: generateId(),
        });

        await newItem.save();
        res.json(newItem);
    } catch (err) {
        res.status(500).json(err);
    }
};

// UPDATE INVENTORY
exports.updateInventory = async (req, res) => {
    try {
        const updated =
            await Inventory.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

        res.json(updated);
    } catch (err) {
        res.status(500).json(err);
    }
};

// DELETE INVENTORY
exports.deleteInventory = async (req, res) => {
    try {
        await Inventory.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Deleted successfully",
        });
    } catch (err) {
        res.status(500).json(err);
    }
};