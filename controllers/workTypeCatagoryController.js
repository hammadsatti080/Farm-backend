const WorkType = require("../models/WorkTypeCatagory");

// Get All
exports.getWorkTypes = async (req, res) => {
  try {
    const data = await WorkType.find().sort({
      createdAt: -1,
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Create
exports.createWorkType = async (req, res) => {
  try {
    const workType = await WorkType.create({
      name: req.body.name,
    });

    res.status(201).json(workType);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update
exports.updateWorkType = async (
  req,
  res
) => {
  try {
    const updated =
      await WorkType.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
        },
        { new: true }
      );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete
exports.deleteWorkType = async (
  req,
  res
) => {
  try {
    await WorkType.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};