/*const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const connectDB = require("./lib/db.js");

connectDB();
const app = express();

// Middleware
app.use(cors({
   origin: "https://farm-frontend-mu.vercel.app",
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




const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;
*/
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const connectDB = require("./lib/db.js");

const app = express();

// Middleware
app.use(cors({
   origin: "https://farm-frontend-mu.vercel.app",
   // origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure DB connects before handling any request (serverless-safe)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Failed to connect to DB:", error.message);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Simple root route so "/" doesn't 404
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Farm backend is running" });
});

// Routes
const reviewRoutes = require("./routes/review");
const authRoutes = require("./routes/adminRoutes");
app.use("/api/reviews", reviewRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", require("./routes/catagoryRoutes"));
app.use("/api/milk", require("./routes/milkRoutes"));
app.use("/api/sales", require("./routes/Salesroutes"));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;