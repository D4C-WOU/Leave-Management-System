const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.json({
      token: generateToken(user._id, user.role),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login
// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // EMAIL DOES NOT EXIST
    if (!user) {
      return res.status(400).json({
        message: "Email does not exist",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    // PASSWORD INCORRECT
    if (!match) {
      return res.status(400).json({
        message: "Password is incorrect",
      });
    }

    res.json({
      token: generateToken(user._id, user.role),
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get current user
exports.me = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};
