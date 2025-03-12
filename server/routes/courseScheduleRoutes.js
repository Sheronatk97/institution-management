const express = require("express");
const CourseSchedule = require("../models/courseSchedule.model");

const router = express.Router();

// ➤ Create a Course Schedule
router.post("/courseenrole", async (req, res) => {
  try {
    const courseSchedule = new CourseSchedule(req.body);
    await courseSchedule.save();
    res.status(201).json({ message: "Course Schedule created successfully", courseSchedule });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Get All Course Schedules
router.get("/", async (req, res) => {
  try {
    const courseSchedules = await CourseSchedule.find()
      .populate("ac_id", "name email") // Populate Associate Consultant details
      .populate("stu_id", "name email") // Populate Student details
      .populate("cou_id", "name description"); // Populate Course details

    res.status(200).json(courseSchedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Get a Single Course Schedule by ID
router.get("/:id", async (req, res) => {
  try {
    const courseSchedule = await CourseSchedule.findById(req.params.id)
      .populate("ac_id", "name email")
      .populate("stu_id", "name email")
      .populate("cou_id", "name description");

    if (!courseSchedule) return res.status(404).json({ message: "Course Schedule not found" });

    res.status(200).json(courseSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Update a Course Schedule
router.put("/:id", async (req, res) => {
  try {
    const courseSchedule = await CourseSchedule.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!courseSchedule) return res.status(404).json({ message: "Course Schedule not found" });

    res.status(200).json({ message: "Course Schedule updated successfully", courseSchedule });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Delete a Course Schedule
router.delete("/:id", async (req, res) => {
  try {
    const courseSchedule = await CourseSchedule.findByIdAndDelete(req.params.id);

    if (!courseSchedule) return res.status(404).json({ message: "Course Schedule not found" });

    res.status(200).json({ message: "Course Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
