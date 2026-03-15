const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Leave = require("../models/LeaveRequest");

//get employees
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "employee" }).select("-password");

    const usersWithStats = await Promise.all(
      users.map(async (u) => {
        const leaves = await Leave.find({ employee: u._id });

        const pending = leaves.filter((l) => l.status === "pending").length;
        const approved = leaves.filter((l) => l.status === "approved").length;
        const rejected = leaves.filter((l) => l.status === "rejected").length;

        return {
          ...u._doc,
          totalLeaves: leaves.length,
          pending,
          approved,
          rejected,
        };
      }),
    );

    res.json(usersWithStats);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//create employees
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password required" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "employee",
    });

    res.json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already exists" });
    }

    res.status(500).json({ message: error.message });
  }
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
