const express = require("express");
const router = express.Router();

// Health check route
router.get("/", (req, res) => {
  res.json({ status: "API is working" });
});

module.exports = router;