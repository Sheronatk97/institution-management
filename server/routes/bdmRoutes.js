const express = require("express");
const BDM = require("../models/BDM");
const router = express.Router();

// Create a new BDM
// router.post("/createbdm", async (req, res) => {
//   try {
//     const newBDM = new BDM(req.body);
//     await newBDM.save();
//     res.status(201).json(newBDM);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });



// Route to create a BDM
router.post("/createbdm", async (req, res) => {
  try {

    const newBDM = new BDM(req.body);
    

    await newBDM.save();
    

    res.status(201).json({ message: "BDM created successfully", BDM: newBDM });
  } catch (error) {
   
    res.status(500).json({ error: error.message });
  }
});

// Get all BDMs
router.get("/getallbdm", async (req, res) => {
  try {
    const bdms = await BDM.find();
    res.status(200).json(bdms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single BDM by ID
router.get("/:id", async (req, res) => {
  try {
    const bdm = await BDM.findById(req.params.id);
    if (!bdm) return res.status(404).json({ message: "BDM not found" });
    res.status(200).json(bdm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a BDM
router.put("/update/:id", async (req, res) => {
  try {
    const updatedBDM = await BDM.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBDM) return res.status(404).json({ message: "BDM not found" });
    res.status(200).json(updatedBDM);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a BDM
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedBDM = await BDM.findByIdAndDelete(req.params.id);
    if (!deletedBDM) return res.status(404).json({ message: "BDM not found" });
    res.status(200).json({ message: "BDM deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
