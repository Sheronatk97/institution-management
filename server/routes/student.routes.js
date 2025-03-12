// const express = require("express");
// const Student = require("../models/student.model");

// const router = express.Router();

// // Create Student
// router.post("/createstudents", async (req, res) => {
//   try {
//     const student = new Student(req.body);
//     await student.save();
//     res.status(201).json(student);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Get All Students
// router.get("/getallstudents", async (req, res) => {
//   try {
//     const students = await Student.find();
//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get Single Student by ID
// // router.get("/getstudents/:id", async (req, res) => {
// //   try {
// //     const student = await Student.findById(req.params.id);
// //     if (!student) return res.status(404).json({ error: "Student not found" });
// //     res.json(student);
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });


// // Get Single Registered Student by ID
// router.get("/getstudents/:id", async (req, res) => {
//   try {
//     const student = await Student.findOne({ _id: req.params.id, isRegistered: true });
    
//     if (!student) return res.status(404).json({ error: "Registered student not found" });

//     res.json(student);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// // Update Student by ID
// router.put("/updatestudents/:id", async (req, res) => {
//   try {
//     const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!student) return res.status(404).json({ error: "Student not found" });
//     res.json(student);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Delete Student by ID
// router.delete("/deletestudents/:id", async (req, res) => {
//   try {
//     const student = await Student.findByIdAndDelete(req.params.id);
//     if (!student) return res.status(404).json({ error: "Student not found" });
//     res.json({ message: "Student deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;


const express = require("express");
const Student = require("../models/student.model");

const router = express.Router();

// Create a new student
router.post("/createstudent", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all students
router.get("/getstudent", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update student details
router.put("/updatestudent/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a student
router.delete("/deletestudent/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
