const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const connectDB = require("./lib/db.js");

connectDB();
const app = express();

// Middleware
app.use(cors({
   origin: "https://ecommerence-bay.vercel.app",
   // origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const reviewRoutes = require("./routes/review");
const authRoutes = require("./routes/adminRoutes");
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes)
app.use(
  "/api/categories", require("./routes/catagoryRoutes")
);
app.use("/api/milk", require("./routes/milkRoutes"));
app.use("/api/sales", require("./routes/Salesroutes"));
// Server
//const PORT = process.env.PORT || 5000;

//app.listen(PORT, () => {
  //  console.log(`🚀 Server running on port ${PORT}`);
//});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;