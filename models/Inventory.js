const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
    {
        uniqueId: {
            type: String,
            unique: true,
        },

        name: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        dateTime: {
            type: Date,
            default: Date.now,
        },

        purpose: {
            type: String,
            enum: ["Animal Use", "Other Use"],
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model(
    "Inventory",
    InventorySchema
);