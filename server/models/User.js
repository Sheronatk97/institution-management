
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    qualification: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    idProof: { type: String },
    dob: { type: String, required: true },
    role: { type: String, required: true, default: "student" },
    consultant: {  type: mongoose.Schema.Types.ObjectId, ref: "AssociateConsultant",   default: null },
    slot: { type: String,  enum: ['Slot 1', 'Slot 2', 'Slot 3', 'Slot 4'], },
    startDate: { type: String,  },
    endDate: { type: String,  },
    
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
