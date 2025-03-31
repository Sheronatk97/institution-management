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




const FinanceManager = mongoose.model('FinanceManager', financeManagerSchema);
module.exports = FinanceManager;
