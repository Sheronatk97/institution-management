const express = require("express");
const Attendance = require("../models/attendance.model");

const router = express.Router();

// ➤ Create an Attendance Record
router.post("/", async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).json({ message: "Attendance record created successfully", attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Get All Attendance Records
router.get("/", async (req, res) => {
  try {
    const attendances = await Attendance.find().populate("stu_id cou_id");
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Get a Single Attendance Record by ID
router.get("/:id", async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id).populate("stu_id cou_id");
    if (!attendance) return res.status(404).json({ message: "Attendance record not found" });

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Update an Attendance Record
router.put("/:id", async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!attendance) return res.status(404).json({ message: "Attendance record not found" });

    res.status(200).json({ message: "Attendance record updated successfully", attendance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Delete an Attendance Record
router.delete("/:id", async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);

    if (!attendance) return res.status(404).json({ message: "Attendance record not found" });

    res.status(200).json({ message: "Attendance record deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
