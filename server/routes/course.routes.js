// const express =require("express");
// const Course = require("../models/course.model");

// const router = express.Router();

// // Create a new course
// router.post("/create", async (req, res) => {
//   try {
//     const course = new Course(req.body);
//     await course.save();
//     res.status(201).json(course);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // // Get all courses
// // router.get("/", async (req, res) => {
// //   try {
// //     const courses = await Course.find().populate("BDM_id").populate("students");
// //     res.status(200).json(courses);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });


// router.get("/get", async (req, res) => {
//   try {
//     const courses = await Course.find()
//       .populate("BDM_id", "name")  // Populate only the name field of BDM
//       .populate("students", "name");  // Assuming you also want to display student names
//     res.status(200).json(courses);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// // Get a course by ID
// router.get("/getbyid/:id", async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id).populate("BDM_id").populate("students");
//     if (!course) return res.status(404).json({ message: "Course not found" });
//     res.status(200).json(course);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Update course details
// router.put("/update/:id", async (req, res) => {
//   try {
//     const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!course) return res.status(404).json({ message: "Course not found" });
//     res.status(200).json(course);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Delete a course
// router.delete("/delete/:id", async (req, res) => {
//   try {
//     const course = await Course.findByIdAndDelete(req.params.id);
//     if (!course) return res.status(404).json({ message: "Course not found" });
//     res.status(200).json({ message: "Course deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// module.exports = router;




const express = require("express");
const router = express.Router();
const Course = require("../models/course.model"); // Import the Course model

// 1. Create a new course
router.post("/create", async (req, res) => {
  const { name, description, duration, fee } = req.body;

  try {
    const newCourse = new Course({
      name,
      description,
      duration,
      fee,
    });

    await newCourse.save();
    res.status(201).json({ message: "Course created successfully", course: newCourse });
  } catch (error) {
    res.status(500).json({ message: "Failed to create course", error: error.message });
  }
});


// router.post("/create", async (req, res) => {
//   const { name, description, duration, fee, BDM_id } = req.body;

//   try {
//     // Check if the BDM_id exists in the BDM collection
//     const bdm = await Course.findById(BDM_id);
//     if (!bdm) {
//       return res.status(404).json({ message: "BDM not found" });
//     }

//     // Create a new course with the BDM_id
//     const newCourse = new Course({
//       name,
//       description,
//       duration,
//       fee,
//       BDM_id,  // Link to BDM
//     });

//     // Save the course to the database
//     await newCourse.save();

//     // Return success response
//     res.status(201).json({ message: "Course created successfully", course: newCourse });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to create course", error: error.message });
//   }
// });

// // 2. Get all courses
// router.get("/get", async (req, res) => {
//   try {
//     const courses = await Course.find(); // Fetch all courses
//     res.status(200).json(courses);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch courses", error: error.message });
//   }
// });


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
