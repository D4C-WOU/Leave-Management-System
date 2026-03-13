const express = require("express");
const router = express.Router();

const {
  createLeaveType,
  getLeaveTypes,
  updateLeaveType,
  deleteLeaveType,
} = require("../controllers/leaveTypeController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, adminOnly, createLeaveType);
router.get("/", protect, getLeaveTypes);
router.put("/:id", protect, adminOnly, updateLeaveType);
router.delete("/:id", protect, adminOnly, deleteLeaveType);

module.exports = router;
