// const express = require("express");
// const Student = require("../models/Student");
// const upload = require("../middlewares/upload");

// const router = express.Router();

// // 🟢 Create a new student (With Profile Photo & Education Details)
// router.post("/", upload.single("profilePhoto"), async (req, res) => {
//   try {
//     const studentData = {
//       ...req.body,
//       profilePhoto: req.file ? `/uploads/${req.file.filename}` : "",
//       education: JSON.parse(req.body.education || "[]"), // Parse education array from string
//     };

//     const newStudent = new Student(studentData);
//     await newStudent.save();
//     res.status(201).json(newStudent);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // 🔵 Get all students
// router.get("/", async (req, res) => {
//   try {
//     const students = await Student.find();
//     res.json(students);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // 🟡 Get a single student by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id);
//     if (!student) return res.status(404).json({ error: "Student not found" });
//     res.json(student);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // 🟠 Update a student (With Profile Photo & Education)
// router.put("/:id", upload.single("profilePhoto"), async (req, res) => {
//   try {
//     const updateData = {
//       ...req.body,
//       profilePhoto: req.file ? `/uploads/${req.file.filename}` : req.body.profilePhoto,
//       education: req.body.education ? JSON.parse(req.body.education) : [],
//     };

//     const updatedStudent = await Student.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updatedStudent) return res.status(404).json({ error: "Student not found" });
//     res.json(updatedStudent);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // 🔴 Delete a student by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedStudent = await Student.findByIdAndDelete(req.params.id);
//     if (!deletedStudent) return res.status(404).json({ error: "Student not found" });
//     res.json({ message: "Student deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;




const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const multer = require("multer");
const path = require("path");

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Store uploaded files in 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// File filter for image validation
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});

// Create a new student
router.post("/createStudents", upload.single("profilePhoto"), async (req, res) => {
  try {
    const studentData = req.body;
    if (req.file) {
      studentData.profilePhoto = req.file.path; // Save file path
    }
    const student = new Student(studentData);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all students
router.get("/getAllStudents", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single student by ID
router.get("/getStudent/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a student by ID
router.put("/studentUpdate/:id", upload.single("profilePhoto"), async (req, res) => {
  try {
    const studentData = req.body;
    if (req.file) {
      studentData.profilePhoto = req.file.path; // Update file path
    }
    const student = await Student.findByIdAndUpdate(req.params.id, studentData, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a student by ID
router.delete("/studentDelete/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
