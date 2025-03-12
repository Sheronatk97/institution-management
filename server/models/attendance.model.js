const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    stu_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    cou_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
  }, { timestamps: true });
  
  const Attendance = mongoose.model("Attendance", attendanceSchema);
  module.exports = Attendance;
  