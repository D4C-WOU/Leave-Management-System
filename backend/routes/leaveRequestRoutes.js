const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");
const leaveCtrl = require("../controllers/leaveRequestController");

router.post("/", protect, leaveCtrl.applyLeave);
router.get("/mine", protect, leaveCtrl.myLeaves);

router.delete("/:id", protect, leaveCtrl.cancelLeave);

router.get("/", protect, adminOnly, leaveCtrl.allLeaves);
router.put("/:id", protect, adminOnly, leaveCtrl.updateStatus);

module.exports = router;