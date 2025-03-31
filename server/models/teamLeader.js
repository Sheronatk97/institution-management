
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

// TeamLeader Schema
const teamLeaderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },  // Reference to Course model
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "Team Leader" },
  },
  { timestamps: true }
);

const TeamLeader = mongoose.model("TeamLeader", teamLeaderSchema);
module.exports = TeamLeader;
