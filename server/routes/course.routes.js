


const express = require("express");
const router = express.Router();
const Course = require("../models/course.model"); // Import the Course model

// 1. Create a new course
router.post("/create", async (req, res) => {
  const { name, description, duration, fee } = req.body;
  const token=req.headers.id
  console.log("token",token)
  console.log(req.body)
  try {
    const newCourse = new Course({
      name,
      description,
      duration,
      fee,
      BDM_id:token
    });

    await newCourse.save();
    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    res.status(500).json({ message: "Failed to create course", error: error.message });
  }
});

// 2. Get all courses with BDM details
router.get("/get", async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("BDM_id", "name email phone location") // Populate the BDM details
      .exec();

    res.status(200).json(courses); // Return the courses along with populated BDM info
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses", error: error.message });
  }
});


// 3. Get a course by its ID
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id); // Fetch the course by ID
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch course", error: error.message });
  }
});

// 4. Update a course by its ID
router.put("/update/:id", async (req, res) => {
  const { name, description, duration, fee } = req.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { name, description, duration, fee },
      { new: true } // Return the updated course
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    res.status(500).json({ message: "Failed to update course", error: error.message });
  }
});

// 5. Delete a course by its ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id); // Delete the course by ID
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete course", error: error.message });
  }
});

module.exports = router;
