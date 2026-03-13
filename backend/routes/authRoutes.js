const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const authCtrl = require("../controllers/authController");

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.get("/me", protect, authCtrl.me);

module.exports = router;