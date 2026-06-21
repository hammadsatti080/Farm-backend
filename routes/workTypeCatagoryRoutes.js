const express = require("express");

const router = express.Router();

const {
  getWorkTypes,
  createWorkType,
  updateWorkType,
  deleteWorkType,
} = require("../controllers/workTypeCatagoryController");

router.get("/", getWorkTypes);

router.post("/", createWorkType);

router.put("/:id", updateWorkType);

router.delete("/:id", deleteWorkType);

module.exports = router;