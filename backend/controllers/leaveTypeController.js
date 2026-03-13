const LeaveType = require("../models/LeaveType");

// CREATE leave type
const createLeaveType = async (req, res) => {
  try {
    const { name, maxDays, description } = req.body;

    const leaveType = await LeaveType.create({
      name,
      maxDays,
      description,
    });

    res.status(201).json(leaveType);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET all leave types
const getLeaveTypes = async (req, res) => {
  try {
    const leaveTypes = await LeaveType.find();
    res.json(leaveTypes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE leave type
const updateLeaveType = async (req, res) => {
  try {
    const updated = await LeaveType.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE leave type
const deleteLeaveType = async (req, res) => {
  try {
    await LeaveType.findByIdAndDelete(req.params.id);
    res.json({ message: "Leave type deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createLeaveType,
  getLeaveTypes,
  updateLeaveType,
  deleteLeaveType,
};