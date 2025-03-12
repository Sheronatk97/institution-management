// routes/digitalMarketerRoutes.js
const express = require('express');
const DigitalMarketer = require('../models/digitalMarketer');
const bcrypt = require('bcryptjs');
const router = express.Router();

// CREATE: Add a new DigitalMarketer
router.post('/createdigitalmarketer', async (req, res) => {
  try {
    const { fullName, email, phone, address, password } = req.body;

    // Skip password hashing and directly save the password
    const newDigitalMarketer = new DigitalMarketer({
      fullName,
      email,
      phone,
      address,
      password: password  // Save password directly without hashing
    });

    await newDigitalMarketer.save();
    res.status(201).json({ message: 'Digital Marketer created successfully', data: newDigitalMarketer });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// READ: Get all DigitalMarketers
router.get('/getdigitalmarketers', async (req, res) => {
  try {
    const marketers = await DigitalMarketer.find();
    res.status(200).json(marketers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// READ: Get a DigitalMarketer by ID
router.get('/digital-marketer/:id', async (req, res) => {
  try {
    const marketer = await DigitalMarketer.findById(req.params.id);
    if (!marketer) {
      return res.status(404).json({ message: 'Digital Marketer not found' });
    }
    res.status(200).json(marketer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// UPDATE: Update a DigitalMarketer by ID
router.put('/updatedigitalmarketer/:id', async (req, res) => {
  try {
    const { fullName, email, phone, address, password } = req.body;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const updatedData = {
      fullName,
      email,
      phone,
      address,
      password: hashedPassword || undefined
    };

    const updatedMarketer = await DigitalMarketer.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedMarketer) {
      return res.status(404).json({ message: 'Digital Marketer not found' });
    }
    res.status(200).json({ message: 'Digital Marketer updated successfully', data: updatedMarketer });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE: Delete a DigitalMarketer by ID
router.delete('/deletedigitalmarketer/:id', async (req, res) => {
  try {
    const deletedMarketer = await DigitalMarketer.findByIdAndDelete(req.params.id);
    if (!deletedMarketer) {
      return res.status(404).json({ message: 'Digital Marketer not found' });
    }
    res.status(200).json({ message: 'Digital Marketer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
