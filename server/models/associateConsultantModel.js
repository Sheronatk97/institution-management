const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


const associateConsultantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String},
    teamlead_id: { type: mongoose.Schema.Types.ObjectId, ref: "TeamLeader" },
    students: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  }, { timestamps: true });

  const AssociateConsultant = mongoose.model("AssociateConsultant", associateConsultantSchema);
  module.exports = AssociateConsultant;
  