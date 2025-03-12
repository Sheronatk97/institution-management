// const express = require("express");
// const router = express.Router();
// const Enrollment = require("../models/Enrollment"); // Import the enrollment model
// const Course = require("../models/course.model"); // Import the course model
// const User = require("../models/User"); // Import the user model (you should have this model)

// const sendEnrollmentRequestToTeamLead = (course, user) => {
//   // Simulate sending a request to the team lead.
//   console.log(`Enrollment request: User ${user.name} enrolled in course ${course.name}`);
//   // You could use email or other notifications here
// };

// router.post("/enroll", async (req, res) => {
//   const { userId, courseId } = req.body;

//   try {
//     // Find the course by its ID
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     // Find the user by ID (you can extend this logic to authenticate the user)
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Create a new enrollment record
//     const enrollment = new Enrollment({
//       userId: user._id,
//       courseId: course._id,
//     });
//     await enrollment.save();

//     // Send a request to the team lead (this is a placeholder, replace with real logic)
//     sendEnrollmentRequestToTeamLead(course, user);

//     // Respond with success
//     res.status(200).json({ message: "Enrolled successfully", enrollment });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const Enrollment = require("../models/Enrollment");
// const Course = require("../models/course.model");
// const User = require("../models/User");

// router.post("/enroll", async (req, res) => {
//   const { userId, courseId } = req.body;

//   try {
//     // Validate course existence
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     // Validate user existence (optional, you could also authenticate)
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Create the enrollment with status 'Pending'
//     const enrollment = new Enrollment({
//       userId: user._id,
//       courseId: course._id,
//     });
//     await enrollment.save();

//     res.status(201).json({ message: "Enrollment request created", enrollment });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get("/enrollments", async (req, res) => {
//     try {
//       const enrollments = await Enrollment.find()
//         .populate("userId", "name email")  // Populate user details
//         .populate("courseId", "name description");  // Populate course details
//       res.status(200).json(enrollments);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });

//   router.get("/user-enrollments/:userId", async (req, res) => {
//     const { userId } = req.params;
  
//     try {
//       const enrollments = await Enrollment.find({ userId })
//         .populate("courseId", "name description");  // Populate course details
//       res.status(200).json(enrollments);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });

//   router.put("/enrollment/:id", async (req, res) => {
//     const { id } = req.params;
//     const { status } = req.body;  // status should be 'Accepted' or 'Rejected'
  
//     try {
//       // Find the enrollment by ID
//       const enrollment = await Enrollment.findById(id);
//       if (!enrollment) {
//         return res.status(404).json({ message: "Enrollment not found" });
//       }
  
//       // Validate status
//       if (!['Accepted', 'Rejected'].includes(status)) {
//         return res.status(400).json({ message: "Invalid status" });
//       }
  
//       // Update the enrollment status
//       enrollment.status = status;
//       await enrollment.save();
  
//       res.status(200).json({ message: "Enrollment status updated", enrollment });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });

//   router.delete("/enrollment/:id", async (req, res) => {
//     const { id } = req.params;
  
//     try {
//       // Delete the enrollment by ID
//       const enrollment = await Enrollment.findByIdAndDelete(id);
//       if (!enrollment) {
//         return res.status(404).json({ message: "Enrollment not found" });
//       }
  
//       res.status(200).json({ message: "Enrollment deleted" });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
  
//   module.exports = router;







const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Enrollment = require("../models/Enrollment"); // Import the Enrollment model
const Course = require("../models/course.model"); // Import the Course model
const User = require("../models/User"); // Import the User model (if you have one)

// // 1. Enroll in a course
// router.post("/enroll", async (req, res) => {
//   const { userId, courseId } = req.body;

//   try {
//     // Check if the course exists
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ message: "Course not found" });
//     }

//     // Check if the user exists (you can customize this part based on your User model)
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Create a new enrollment
//     const newEnrollment = new Enrollment({
//       userId,
//       courseId,
//       status: 'Pending',
//     });

//     await newEnrollment.save();
//     res.status(201).json({ message: "Enrolled successfully", enrollment: newEnrollment });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to enroll in course", error: error.message });
//   }
// });

// module.exports = router;







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
  
// //   2.
//   router.get("/user/:userId", async (req, res) => {
//     try {
//       const enrollments = await Enrollment.find({ userId: req.params.userId })
//         .populate("courseId", "name description duration fee")  // Populating course details
//         .populate("userId", "name email")  // Populating user details (optional)
//         .exec();
        
//       if (!enrollments) {
//         return res.status(404).json({ message: "No enrollments found" });
//       }
  
//       res.status(200).json(enrollments);
//     } catch (error) {
//       console.error("Error fetching enrollments:", error);
//       res.status(500).json({ message: "Failed to fetch enrollments", error: error.message });
//     }
//   });



// Fetch all enrollments for a specific user, populating course and user details
// router.get("/user/:userId", async (req, res) => {
//     try {
//       const enrollments = await Enrollment.find({ userId: req.params.userId })
//         .populate("courseId", "name description duration fee")  // Populating course details
//         .populate("userId", "name email")  // Populating user details (optional)
//         .exec();


//         const userId = req.params.userId.trim(); // Remove spaces and newlines

// if (!mongoose.Types.ObjectId.isValid(userId)) {
//   return res.status(400).json({ message: "Invalid User ID format" });
// }
      
//       if (!enrollments || enrollments.length === 0) {
//         return res.status(404).json({ message: "No enrollments found" });
//       }
  
//       // Send response with the enrolled data, including course and user details
//       res.status(200).json(enrollments);
//     } catch (error) {
//       console.error("Error fetching enrollments:", error);
//       res.status(500).json({ message: "Failed to fetch enrollments", error: error.message });
//     }
//   });
  




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