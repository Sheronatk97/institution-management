const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const BDMschema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "BDM" },
  }, { timestamps: true });

 
  const BusinessDevelopmentManager = mongoose.model("BusinessDevelopmentManager", BDMschema);
  module.exports =  BusinessDevelopmentManager;
  