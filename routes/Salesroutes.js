const express = require("express");
const router = express.Router();
const Sale = require("../models/Salemodel");
const Milk = require("../models/Milk");

// ================= GET SALES =================
router.get("/", async (req, res) => {
    try {
        const data = await Sale.find().populate("category");

        return res.json({
            success: true,
            data,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});

// ================= CREATE SALE + REDUCE STOCK =================
router.post("/", async (req, res) => {
    try {
        const {
            category,
            name,
            milkType,
            quantity,
            pricePerKg,
            totalPrice,
            date,
            time,
        } = req.body;

        // 1️⃣ create sale
        const newSale = await Sale.create({
            category,
            name,
            milkType,
            quantity,
            pricePerKg,
            totalPrice,
            date,
            time,
        });

        // 2️⃣ reduce milk stock
        await Milk.findOneAndUpdate(
            {
                category: category,
                milkType: milkType,
            },
            {
                $inc: { quantity: -quantity },
            }
        );

        return res.json({
            success: true,
            data: newSale,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});

// ================= DELETE SALE =================
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Sale.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Sale not found",
            });
        }

        return res.json({
            success: true,
            message: "Sale deleted successfully",
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});


router.put("/:id", async (req, res) => {
    try {
        const oldSale = await Sale.findById(req.params.id);

        if (!oldSale) {
            return res.status(404).json({ error: "Sale not found" });
        }

        const diff = req.body.quantity - oldSale.quantity;

        const updated = await Sale.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        // 🔥 adjust milk stock
        await Milk.findOneAndUpdate(
            {
                category: oldSale.category,
                milkType: oldSale.milkType,
            },
            {
                $inc: { quantity: -diff },
            }
        );

        res.json({
            success: true,
            data: updated,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});
module.exports = router;