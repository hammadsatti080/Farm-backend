const router = require("express").Router();
const Sale = require("../models/Salemodel");

// ================= CREATE SALE =================
router.post("/", async (req, res) => {
    try {
        const sale = new Sale(req.body);
        await sale.save();
        res.json(sale);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ================= GET ALL SALES =================
router.get("/", async (req, res) => {
    try {
        const sales = await Sale.find().populate("category");
        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ================= DELETE SALE =================
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Sale.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Sale not found" });
        }

        res.json({ message: "Sale deleted successfully", id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ================= UPDATE SALE =================
// ================= UPDATE SALE (FIXED LOGIC) =================
router.put("/:id", async (req, res) => {
    try {
        const { quantity, pricePerKg } = req.body;

        // 🔥 ALWAYS recalculate totalPrice
        const totalPrice =
            Number(quantity || 0) * Number(pricePerKg || 0);

        const updated = await Sale.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                totalPrice, // ✅ override with correct value
            },
            {
                new: true,
                runValidators: true,
            }
        ).populate("category");

        if (!updated) {
            return res.status(404).json({ message: "Sale not found" });
        }

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;