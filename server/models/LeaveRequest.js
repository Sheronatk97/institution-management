const mongoose = require("mongoose");

const leaveRequestSchema = new mongoose.Schema(
  {
     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who requested leave
    reason: { type: String,  }, // Reason for the leave
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }, // Leave request status
    requestDate: { type: Date, default: Date.now }, // When the request was made
    startDate: { type: Date, }, // Start date of leave
    endDate: { type: Date,  }, // End date of leave
  },
  { timestamps: true }
);

const LeaveRequest = mongoose.model("LeaveRequest", leaveRequestSchema);
module.exports = LeaveRequest;
