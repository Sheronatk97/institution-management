
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Enrollment = require("../models/Enrollment"); // Import the Enrollment model
const Course = require("../models/course.model"); // Import the Course model
const User = require("../models/User"); // Import the User model (if you have one)



// 1. Enroll in a course
router.post("/enroll", async (req, res) => {
    const { userId, courseId } = req.body;
  
    console.log("Received enrollment request:", { userId, courseId });
  
    if (!userId || !courseId) {
      return res.status(400).json({ message: "User ID and Course ID are required" });
    }
  
    try {
      // Check if the course exists
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
  
      // Check if the user exists (if your app has a user model)
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Create the enrollment
      const newEnrollment = new Enrollment({
        userId,
        courseId,
        status: 'Pending', // Default status
      });
  
      // Save the new enrollment
      await newEnrollment.save();
      console.log("Enrollment created successfully:", newEnrollment);
  
      res.status(201).json({ message: "Enrolled successfully", enrollment: newEnrollment });
    } catch (error) {
      console.error("Error enrolling:", error);
      res.status(500).json({ message: "Failed to enroll in course", error: error.message });
    }
  });
  



router.get("/user/:userId", async (req, res) => {
    try {
      const userId = req.params.userId.trim(); // Remove spaces and newlines
  
      // Check if the userId format is valid
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid User ID format" });
      }
  
      // Fetch the enrollments for the user
      const enrollments = await Enrollment.find({ userId })
        .populate("courseId", "name description duration fee")  // Populating course details
        .populate("userId", "name email")  // Populating user details
        .exec();
  
      // If no enrollments are found for the user
      if (!enrollments || enrollments.length === 0) {
        return res.status(404).json({ message: "No enrollments found" });
      }
  
      // Send response with the enrolled data, including course and user details
      res.status(200).json(enrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      res.status(500).json({ message: "Failed to fetch enrollments", error: error.message });
    }
  });
  
  module.exports = router;