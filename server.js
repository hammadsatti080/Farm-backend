
const mongoose = require("mongoose");

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
app.use("/api/reviews", require("./routes/review"));
app.use("/api/auth", require("./routes/adminRoutes"));
app.use("/api/categories", require("./routes/catagoryRoutes"));
app.use("/api/milk", require("./routes/milkRoutes"));
app.use("/api/sales", require("./routes/Salesroutes"));
app.use(
  "/api/animalcategories",
  require("./routes/AnimalcategoryRoutes")
);
app.use("/api/Handleanimals", require("./routes/HandleanimalRoutes"));
app.use(
    "/api/inventory-types",
    require("./routes/inventoryTypeRoutes")
);
app.use(
    "/api/inventory",
    require("./routes/inventoryRoutes")
);
app.use(
  "/api/work-typesCatagory",
  require("./routes/workTypeCatagoryRoutes")
);
app.use("/api/handleteam", require("./routes/handleteamRoutes"));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;


/*
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const connectDB = require("./lib/db.js");

const app = express();

// ================= DB CONNECT ONCE =================
connectDB();

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= ROOT ROUTE =================
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Farm backend is running" });
});

// ================= ROUTES =================
app.use("/api/reviews", require("./routes/review"));
app.use("/api/auth", require("./routes/adminRoutes"));
app.use("/api/categories", require("./routes/catagoryRoutes"));
app.use("/api/milk", require("./routes/milkRoutes"));
app.use("/api/sales", require("./routes/Salesroutes"));
app.use(
  "/api/animalcategories",
  require("./routes/AnimalcategoryRoutes")
);
app.use("/api/Handleanimals", require("./routes/HandleanimalRoutes"));
app.use(
    "/api/inventory-types",
    require("./routes/inventoryTypeRoutes")
);
app.use(
    "/api/inventory",
    require("./routes/inventoryRoutes")
);
app.use(
  "/api/work-typesCatagory",
  require("./routes/workTypeCatagoryRoutes")
);
app.use("/api/handleteam", require("./routes/handleteamRoutes"));

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;

*/