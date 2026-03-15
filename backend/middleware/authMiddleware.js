const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

const adminOnly = (req, res, next) => {
  console.log("🛡 Admin check:", req.user);

  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  next();
};

module.exports = { protect, adminOnly };
