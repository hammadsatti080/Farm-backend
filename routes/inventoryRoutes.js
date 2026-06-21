const express = require("express");
const router = express.Router();

const {
    getInventory,
    createInventory,
    updateInventory,
    deleteInventory,
} = require("../controllers/inventoryController");

router.get("/", getInventory);
router.post("/", createInventory);
router.put("/:id", updateInventory);
router.delete("/:id", deleteInventory);

module.exports = router;