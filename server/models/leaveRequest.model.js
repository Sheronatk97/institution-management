const mongoose = require("mongoose");

const leaveRequestSchema = new mongoose.Schema({
    stu_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    TL_id: { type: mongoose.Schema.Types.ObjectId, ref: "TeamLeader", required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    date: { type: Date, required: true },
  }, { timestamps: true });
  
  const LeaveRequest = mongoose.model("LeaveRequest", leaveRequestSchema);
  module.exports =  LeaveRequest;
  