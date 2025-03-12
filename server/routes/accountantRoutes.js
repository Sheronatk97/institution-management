// routes/accountantRoutes.js
const express = require("express");
const Accountant = require("../models/Accountant");
const router = express.Router();

// Create Accountant
router.post("/", async (req, res) => {
  try {
    const newAccountant = new Accountant(req.body);
    const savedAccountant = await newAccountant.save();
    res.status(201).json(savedAccountant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Accountants
router.get("/", async (req, res) => {
  try {
    const accountants = await Accountant.find();
    res.json(accountants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Single Accountant
router.get("/:id", async (req, res) => {
  try {
    const accountant = await Accountant.findById(req.params.id);
    if (!accountant) return res.status(404).json({ message: "Accountant not found" });
    res.json(accountant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Accountant
router.put("/:id", async (req, res) => {
  try {
    const updatedAccountant = await Accountant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAccountant) return res.status(404).json({ message: "Accountant not found" });
    res.json(updatedAccountant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Accountant
router.delete("/:id", async (req, res) => {
  try {
    const deletedAccountant = await Accountant.findByIdAndDelete(req.params.id);
    if (!deletedAccountant) return res.status(404).json({ message: "Accountant not found" });
    res.json({ message: "Accountant deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;