const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    FM_id: { type: mongoose.Schema.Types.ObjectId, ref: "FinanceManager", required: true },
    stu_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
  }, { timestamps: true });
  
  const Notification = mongoose.model("Notification", notificationSchema);
  module.exports =  Notification;
  