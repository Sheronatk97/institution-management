const express = require("express");
const TeamLeader = require("../models/teamLeader");
const Course = require("../models/course.model");
const router = express.Router();


router.post("/createteamleaders", async (req, res) => {
  const { name, phone, address, email, password, courseId } = req.body; // Destructure required fields from req.body
  const token = req.headers.id; // Extract the BDM_id from the request headers
  console.log("token",token)
  console.log(req.body)
  try {
    // Check if the course exists before creating the team leader
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Create a new team leader
    const newTeamLeader = new TeamLeader({
      name,
      phone,
      address,
      email,
      password, // Save hashed password
      course: courseId, // Associate the team leader with a course
    });

    await newTeamLeader.save();
    res.status(201).json({ message: "Team Leader created successfully", teamLeader: newTeamLeader });
  } catch (error) {
    res.status(500).json({ message: "Failed to create team leader", error: error.message });
  }
});


// Get all Team Leaders (for display)
router.get("/getteamleaders", async (req, res) => {
  try {
    const teamLeaders = await TeamLeader.find().populate('course', 'name');
    res.status(200).json(teamLeaders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch team leaders", error: error.message });
  }
});
// // Create a Team Leader
// router.post("/createteamleaders", async (req, res) => {
//   try {
//     const teamLeader = new TeamLeader(req.body);
//     await teamLeader.save();
//     res.status(201).json({ message: "Team Leader created successfully", teamLeader });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Get All Team Leaders
// router.get("/getteamleaders", async (req, res) => {
//   try {
//     const teamLeaders = await TeamLeader.find();
//     res.status(200).json(teamLeaders);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Get a Single Team Leader by ID
router.get("/:id", async (req, res) => {
  try {
    const teamLeader = await TeamLeader.findById(req.params.id);
    if (!teamLeader) return res.status(404).json({ message: "Team Leader not found" });
    res.status(200).json(teamLeader);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a Team Leader
router.put("/updateteamleaders/:id", async (req, res) => {
  try {
    const teamLeader = await TeamLeader.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!teamLeader) return res.status(404).json({ message: "Team Leader not found" });
    res.status(200).json({ message: "Team Leader updated successfully", teamLeader });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a Team Leader
router.delete("/deleteteamleaders/:id", async (req, res) => {
  try {
    const teamLeader = await TeamLeader.findByIdAndDelete(req.params.id);
    if (!teamLeader) return res.status(404).json({ message: "Team Leader not found" });
    res.status(200).json({ message: "Team Leader deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
