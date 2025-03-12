// routes/financeManagerRoutes.js
const express = require('express');
const FinanceManager = require('../models/financeManager.model');
const bcrypt = require('bcryptjs');
const router = express.Router();

// CREATE: Add a new FinanceManager
router.post('/createFinanceManager', async (req, res) => {
  try {
    const { fullName, email, phone, address, password } = req.body;

    // Save the password directly without hashing
    const newFinanceManager = new FinanceManager({
      fullName,
      email,
      phone,
      address,
      password: password  // Save password directly
    });

    await newFinanceManager.save();
    res.status(201).json({ message: 'Finance Manager created successfully', data: newFinanceManager });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// READ: Get all FinanceManagers
router.get('/getFinanceManagers', async (req, res) => {
  try {
    const managers = await FinanceManager.find();
    res.status(200).json(managers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// READ: Get a FinanceManager by ID
router.get('/getfinancemanager/:id', async (req, res) => {
  try {
    const manager = await FinanceManager.findById(req.params.id);
    if (!manager) {
      return res.status(404).json({ message: 'Finance Manager not found' });
    }
    res.status(200).json(manager);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// UPDATE: Update a FinanceManager by ID
router.put('/updatefinancemanager/:id', async (req, res) => {
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

    const updatedManager = await FinanceManager.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedManager) {
      return res.status(404).json({ message: 'Finance Manager not found' });
    }
    res.status(200).json({ message: 'Finance Manager updated successfully', data: updatedManager });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE: Delete a FinanceManager by ID
router.delete('/deletefinancemanager/:id', async (req, res) => {
  try {
    const deletedManager = await FinanceManager.findByIdAndDelete(req.params.id);
    if (!deletedManager) {
      return res.status(404).json({ message: 'Finance Manager not found' });
    }
    res.status(200).json({ message: 'Finance Manager deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
