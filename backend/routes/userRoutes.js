const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

router.get("/", protect, adminOnly, userController.getUsers);
router.post("/", protect, adminOnly, userController.createUser);
router.put("/:id", protect, adminOnly, userController.updateUser);
router.delete("/:id", protect, adminOnly, userController.deleteUser);

module.exports = router;