const express = require("express");
const router = express.Router();

const {
  createDisease,
  getDiseases,
  deleteDisease,
  updateDisease,
} = require("../controllers/DiseaseHistoryController");

router.post("/", createDisease);

router.get("/", getDiseases);

router.put("/:id", updateDisease);

router.delete("/:id", deleteDisease);

module.exports = router;