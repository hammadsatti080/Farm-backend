const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");

const {
  registerAdmin,
  getAdmins,
  loginAdmin,
  deleteAdmin,
  updateAdmin
} = require("../controllers/adminController");

router.post("/register", registerAdmin);

/* READ (THIS WAS MISSING) */
router.get("/admins", getAdmins);

router.delete("/delete/:id", deleteAdmin);
router.put("/update/:id", updateAdmin);
router.post("/login", loginAdmin);



module.exports = router;