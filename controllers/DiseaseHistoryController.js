const DiseaseHistory = require("../models/DiseaseHistory");

exports.createDisease = async (req, res) => {
  try {
    const disease = await DiseaseHistory.create(req.body);

    res.status(201).json({
      success: true,
      data: disease,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getDiseases = async (req, res) => {
  try {
    const diseases = await DiseaseHistory.find()
      .populate("animalId")
      .populate("doctorId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: diseases,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteDisease = async (req, res) => {
  try {
    await DiseaseHistory.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Disease record deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateDisease = async (req, res) => {
  try {
    const disease = await DiseaseHistory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: disease,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};