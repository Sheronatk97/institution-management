const express = require('express');
const DigitalMarketer = require('../models/digitalMarketer');
const router = express.Router();

// Create Digital Marketer
router.post('/create', async (req, res) => {
  try {
    const { email, phone } = req.body;

    // Check if email or phone already exists
    const existingMarketer = await DigitalMarketer.findOne({ $or: [{ email }, { phone }] });
    if (existingMarketer) {
      return res.status(400).json({ message: 'Email or Phone already exists' });
    }

    const newMarketer = new DigitalMarketer(req.body);
    await newMarketer.save();
    res.status(201).json({ message: 'Digital Marketer created successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error creating Digital Marketer', error });
  }
});

// Get all Digital Marketers
router.get('/all', async (req, res) => {
  try {
    const marketers = await DigitalMarketer.find();
    res.status(200).json(marketers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Digital Marketers', error });
  }
});

// Get a single Digital Marketer by ID
router.get('/:id', async (req, res) => {
  try {
    const marketer = await DigitalMarketer.findById(req.params.id);
    if (!marketer) {
      return res.status(404).json({ message: 'Digital Marketer not found' });
    }
    res.status(200).json(marketer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Digital Marketer', error });
  }
});

// Update Digital Marketer
router.put('/update/:id', async (req, res) => {
  try {
    await DigitalMarketer.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: 'Digital Marketer updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating Digital Marketer', error });
  }
});

// Delete Digital Marketer
router.delete('/delete/:id', async (req, res) => {
  try {
    await DigitalMarketer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Digital Marketer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Digital Marketer', error });
  }
});

module.exports = router;
