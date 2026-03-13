const LeaveRequest = require("../models/LeaveRequest");
const User = require("../models/User");
const LeaveType = require("../models/LeaveType");

// Employee apply leave
exports.applyLeave = async (req, res) => {
  try {
    const { leaveType, fromDate, toDate, reason } = req.body;

    const type = await LeaveType.findById(leaveType);
    if (!type) {
      return res.status(400).json({ message: "Invalid leave type" });
    }

    const start = new Date(fromDate);
    const end = new Date(toDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start > end) {
      return res.status(400).json({
        message: "From date cannot be after To date",
      });
    }

    if (start < today) {
      return res.status(400).json({
        message: "Leave cannot start in the past",
      });
    }

    const user = await User.findById(req.user.id);

    const typeName = type.name.toLowerCase();

    if (typeName.includes("sick") && user.leaveBalance.sick <= 0) {
      return res.status(400).json({
        message: "No sick leave balance remaining",
      });
    }

    if (typeName.includes("casual") && user.leaveBalance.casual <= 0) {
      return res.status(400).json({
        message: "No casual leave balance remaining",
      });
    }

    if (typeName.includes("annual") && user.leaveBalance.annual <= 0) {
      return res.status(400).json({
        message: "No annual leave balance remaining",
      });
    }

    const leave = await LeaveRequest.create({
      employee: req.user.id,
      leaveType,
      fromDate,
      toDate,
      reason,
    });

    res.json(leave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Employee see their leaves
exports.myLeaves = async (req, res) => {
  const leaves = await LeaveRequest.find({
    employee: req.user.id || req.user._id,
  }).populate("leaveType");

  res.json(leaves);
};

// Admin see all leaves
exports.allLeaves = async (req, res) => {
  const leaves = await LeaveRequest.find()
    .populate("employee", "name email")
    .populate("leaveType")
    .sort({ createdAt: -1 });

  res.json(leaves);
};

// Admin update status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const leave = await LeaveRequest.findById(req.params.id)
      .populate("leaveType")
      .populate("employee");

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    // Only deduct balance if approving
    if (status === "approved" && leave.status === "pending") {
      const user = await User.findById(leave.employee._id);

      const type = leave.leaveType.name.toLowerCase();

      if (type.includes("sick")) {
        if (user.leaveBalance.sick <= 0) {
          return res
            .status(400)
            .json({ message: "No sick leave balance left" });
        }
        user.leaveBalance.sick -= 1;
      }

      if (type.includes("casual")) {
        if (user.leaveBalance.casual <= 0) {
          return res
            .status(400)
            .json({ message: "No casual leave balance left" });
        }
        user.leaveBalance.casual -= 1;
      }

      if (type.includes("annual")) {
        if (user.leaveBalance.annual <= 0) {
          return res
            .status(400)
            .json({ message: "No annual leave balance left" });
        }
        user.leaveBalance.annual -= 1;
      }

      await user.save();
    }

    leave.status = status;
    await leave.save();

    res.json(leave);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// cancel option for employees
exports.cancelLeave = async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    // ensure employee owns the leave
    if (leave.employee.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // allow cancel only if pending
    if (leave.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending leaves can be cancelled" });
    }

    await leave.deleteOne();

    res.json({ message: "Leave cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
