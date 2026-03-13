const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["employee", "admin"],
      default: "employee",
    },
    leaveBalance: {
      sick: {
        type: Number,
        default: 10,
      },
      casual: {
        type: Number,
        default: 8,
      },
      annual: {
        type: Number,
        default: 15,
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
