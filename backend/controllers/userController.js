const User = require("../models/User");
const bcrypt = require("bcryptjs");

//get employees
exports.getUsers = async (req, res) => {
  const users = await User.find({ role: "employee" }).select("-password");
  res.json(users);
};

//create employees
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }

    res.status(500).json({ message: "Server error" });
  }

  res.json(user);
};

//update employee

exports.updateUser = async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email },
    { new: true },
  ).select("-password");

  res.json(user);
};

//delete employee

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
