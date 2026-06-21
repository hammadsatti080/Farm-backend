const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },

        farmNo: {
            type: String,
            required: true,
            unique: true, // 🔥 IMPORTANT (no duplicates)
        },

        phone: { type: String, required: true },

        role: { type: String, required: true },

        paymentFee: {
            type: Number,
            default: 0,
        },

        joinDate: { type: String, required: true },

        bloodGroup: { type: String },

        status: {
            type: String,
            default: "Active",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model(
    "Handleteam",
    EmployeeSchema
);