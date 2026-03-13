const mongoose = require("mongoose");

const leaveTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    maxDays: { type: Number, required: true },
    description: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("LeaveType", leaveTypeSchema);