
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const videoEditorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
  experience: { type: Number, required: true },
  primarySkills: { type: [String], required: true },
  role: { type: String, required: true, default: "Video Editor" },
});


module.exports = mongoose.model("videoEditor", videoEditorSchema);
