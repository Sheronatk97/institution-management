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

  // BDMschema.pre('save', async function (next) {
  //   if (!this.isModified('password')) {
  //     return next();
  //   }
    
  //   const salt = await bcrypt.genSalt(10); // Salt rounds, can adjust
  //   this.password = await bcrypt.hash(this.password, salt); // Hash the password
  //   next();
  // });
  
  // BDMschema.methods.matchPassword = async function (enteredPassword) {
  //   return await bcrypt.compare(enteredPassword, this.password);
  // };
  
  const BusinessDevelopmentManager = mongoose.model("BusinessDevelopmentManager", BDMschema);
  module.exports =  BusinessDevelopmentManager;
  