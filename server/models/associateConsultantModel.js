const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


const associateConsultantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    course : {type: String},
    role: { type: String, required: true, default: "Associate Consultant" },
  }, { timestamps: true });
  
//   associateConsultantSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//       return next();
//     }
    
//     const salt = await bcrypt.genSalt(10); // Salt rounds, can adjust
//     this.password = await bcrypt.hash(this.password, salt); // Hash the password
//     next();
//   });
  
  
//   associateConsultantSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// associateConsultantSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

  const AssociateConsultant = mongoose.model("AssociateConsultant", associateConsultantSchema);
  module.exports = AssociateConsultant;
  