const express = require("express");
const AssociateConsultant = require("../models/associateConsultantModel");

const router = express.Router();

// ➤ Create an Associate Consultant
router.post("/createconsultants", async (req, res) => {
  try {
    const consultant = new AssociateConsultant(req.body);
    await consultant.save();
    res.status(201).json({ message: "Associate Consultant created successfully", consultant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Get All Associate Consultants
router.get("/getconsultants", async (req, res) => {
  try {
    const consultants = await AssociateConsultant.find();
    res.status(200).json(consultants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Get a Single Associate Consultant by ID
router.get("/:id", async (req, res) => {
  try {
    const consultant = await AssociateConsultant.findById(req.params.id);
    if (!consultant) return res.status(404).json({ message: "Consultant not found" });

    res.status(200).json(consultant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Update an Associate Consultant
router.put("/updateconsultants/:id", async (req, res) => {
  try {
    const consultant = await AssociateConsultant.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!consultant) return res.status(404).json({ message: "Consultant not found" });

    res.status(200).json({ message: "Consultant updated successfully", consultant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Delete an Associate Consultant
router.delete("/deleteconsultants/:id", async (req, res) => {
  try {
    const consultant = await AssociateConsultant.findByIdAndDelete(req.params.id);

    if (!consultant) return res.status(404).json({ message: "Consultant not found" });

    res.status(200).json({ message: "Consultant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
