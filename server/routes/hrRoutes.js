const express = require('express');
const Hr = require('../models/hr');
const router = express.Router();

// Create HR
router.post('/create', async (req, res) => {
  try {
    const { username, email } = req.body;

    // Check if email or username already exists
    const existingHr = await Hr.findOne({ $or: [{ email }, { username }] });
    if (existingHr) {
      return res.status(400).json({ message: 'Username or Email already exists' });
    }

    const newHr = new Hr(req.body);
    await newHr.save();
    res.status(201).json({ message: 'HR created successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error creating HR', error });
  }
});

// Get all HRs
router.get('/all', async (req, res) => {
  try {
    const hrList = await Hr.find();
    res.status(200).json(hrList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching HRs', error });
  }
});

// Update HR
router.put('/update/:id', async (req, res) => {
  try {
    await Hr.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: 'HR updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating HR', error });
  }
});

// Delete HR
router.delete('/delete/:id', async (req, res) => {
  try {
    await Hr.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'HR deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting HR', error });
  }
});

module.exports = router;
