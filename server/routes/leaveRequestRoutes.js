const express = require("express");
const LeaveRequest = require("../models/leaveRequest.model");

const router = express.Router();

// ➤ Create a Leave Request
router.post("/", async (req, res) => {
  try {
    const leaveRequest = new LeaveRequest(req.body);
    await leaveRequest.save();
    res.status(201).json({ message: "Leave request created successfully", leaveRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Get All Leave Requests
router.get("/", async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find().populate("stu_id TL_id");
    res.status(200).json(leaveRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Get a Single Leave Request by ID
router.get("/:id", async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.findById(req.params.id).populate("stu_id TL_id");
    if (!leaveRequest) return res.status(404).json({ message: "Leave request not found" });

    res.status(200).json(leaveRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Update a Leave Request
router.put("/:id", async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!leaveRequest) return res.status(404).json({ message: "Leave request not found" });

    res.status(200).json({ message: "Leave request updated successfully", leaveRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Delete a Leave Request
router.delete("/:id", async (req, res) => {
  try {
    const leaveRequest = await LeaveRequest.findByIdAndDelete(req.params.id);

    if (!leaveRequest) return res.status(404).json({ message: "Leave request not found" });

    res.status(200).json({ message: "Leave request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
