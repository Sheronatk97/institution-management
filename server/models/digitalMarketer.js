// models/digitalMarketer.model.js
const mongoose = require('mongoose');

const digitalMarketerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },  // Updated address field
  password: { type: String, required: true }, // Added password field
  role: { type: String, required: true, default: "Digital Marketer" },
}, { timestamps: true });

// digitalMarketerSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
  
//   const salt = await bcrypt.genSalt(10); // Salt rounds, can adjust
//   this.password = await bcrypt.hash(this.password, salt); // Hash the password
//   next();
// });



// digitalMarketerSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

const DigitalMarketer = mongoose.model('DigitalMarketer', digitalMarketerSchema);
module.exports = DigitalMarketer;
