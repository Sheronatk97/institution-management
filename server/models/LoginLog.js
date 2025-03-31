// models/LoginLog.js
const mongoose = require('mongoose');

const loginLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  loginTime: { type: Date, default: Date.now },
});

const LoginLog = mongoose.model('LoginLog', loginLogSchema);

module.exports = LoginLog;
