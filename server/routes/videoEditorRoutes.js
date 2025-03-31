

const express = require("express");
const bcrypt = require("bcryptjs");
const VideoEditor = require("../models/videoEditor");

const router = express.Router();

// Create a new designer
router.post("/create", async (req, res) => {
  const { fullName, email, password, department, experience, primarySkills } = req.body;

  try {
    // Check if the designer already exists
    let designer = await VideoEditor.findOne({ email });
    if (designer) return res.status(400).json({ message: "Designer already exists" });

    // Save the password directly without hashing
    designer = new VideoEditor({
      fullName,
      email,
      password: password,  // Save the password directly
      department,
      experience,
      primarySkills,
    });

    await designer.save();
    res.status(201).json({ message: "Designer created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get all designers
router.get("/all", async (req, res) => {
  try {
    const designers = await VideoEditor.find();
    res.json(designers);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update a designer by ID
router.put("/update/:id", async (req, res) => {
  const { fullName, email, password, department, experience, primarySkills } = req.body;

  try {
    let designer = await VideoEditor.findById(req.params.id);
    if (!designer) {
      return res.status(404).json({ message: "Designer not found" });
    }


    designer = await VideoEditor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(designer);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a designer by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    await VideoEditor.findByIdAndDelete(req.params.id);
    res.json({ message: "Designer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
