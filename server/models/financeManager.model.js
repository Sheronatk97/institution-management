// models/financeManager.model.js
const mongoose = require('mongoose');

const financeManagerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },  // Updated address field
  password: { type: String, required: true }, // Added password field
  role: { type: String, required: true, default: "Finance Manager" },
}, { timestamps: true });


// financeManagerSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
  
//   const salt = await bcrypt.genSalt(10); // Salt rounds, can adjust
//   this.password = await bcrypt.hash(this.password, salt); // Hash the password
//   next();
// });

// financeManagerSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// financeManagerSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

const FinanceManager = mongoose.model('FinanceManager', financeManagerSchema);
module.exports = FinanceManager;
