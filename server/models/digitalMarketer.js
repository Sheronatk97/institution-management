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



const DigitalMarketer = mongoose.model('DigitalMarketer', digitalMarketerSchema);
module.exports = DigitalMarketer;
