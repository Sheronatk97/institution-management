const mongoose = require('mongoose');

const hrSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'hr', 'user'], required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  qualification: { type: String, required: true },
  email: { type: String, required: true, unique: true }
}, { timestamps: true });

const Hr = mongoose.model('Hr', hrSchema);
module.exports = Hr;
