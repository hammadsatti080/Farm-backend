const InventoryType = require("../models/InventoryType");

// GET ALL
exports.getTypes = async (req, res) => {
    try {
        const data = await InventoryType.find();
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
};

// CREATE
exports.createType = async (req, res) => {
    try {
        const type = new InventoryType(req.body);
        await type.save();
        res.json(type);
    } catch (err) {
        res.status(500).json(err);
    }
};

// UPDATE
exports.updateType = async (req, res) => {
    try {
        const updated =
            await InventoryType.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
        res.json(updated);
    } catch (err) {
        res.status(500).json(err);
    }
};

// DELETE
exports.deleteType = async (req, res) => {
    try {
        await InventoryType.findByIdAndDelete(
            req.params.id
        );
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
};