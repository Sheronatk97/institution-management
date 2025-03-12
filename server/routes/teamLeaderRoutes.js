const express = require("express");
const TeamLeader = require("../models/teamLeader");

const router = express.Router();

// Create a Team Leader
router.post("/createteamleaders", async (req, res) => {
  try {
    const teamLeader = new TeamLeader(req.body);
    await teamLeader.save();
    res.status(201).json({ message: "Team Leader created successfully", teamLeader });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Team Leaders
router.get("/getteamleaders", async (req, res) => {
  try {
    const teamLeaders = await TeamLeader.find();
    res.status(200).json(teamLeaders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
