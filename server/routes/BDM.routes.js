// const express =require("express");
// const BusinessDevelopmentManager = require("../models/bussinessDevelopmentManager.model.js");

// const router = express.Router();

// // Create a new BDM
// router.post("/", async (req, res) => {
//   try {
//     const bdm = new BusinessDevelopmentManager(req.body);
//     await bdm.save();
//     res.status(201).json(bdm);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get all BDMs
// router.get("/", async (req, res) => {
//   try {
//     const bdms = await BusinessDevelopmentManager.find();
//     res.status(200).json(bdms);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get BDM by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const bdm = await BusinessDevelopmentManager.findById(req.params.id);
//     if (!bdm) return res.status(404).json({ message: "BDM not found" });
//     res.status(200).json(bdm);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Update BDM
// router.put("/:id", async (req, res) => {
//   try {
//     const bdm = await BusinessDevelopmentManager.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!bdm) return res.status(404).json({ message: "BDM not found" });
//     res.status(200).json(bdm);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Delete BDM
// router.delete("/:id", async (req, res) => {
//   try {
//     const bdm = await BusinessDevelopmentManager.findByIdAndDelete(req.params.id);
//     if (!bdm) return res.status(404).json({ message: "BDM not found" });
//     res.status(200).json({ message: "BDM deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const BDM = require("../models/bussinessDevelopmentManager.model");

// Create a new BDM (POST)
router.post("/create", async (req, res) => {
  try {
    const { name, phone, address, email, password } = req.body;
    const existingBDM = await BDM.findOne({ email });

    if (existingBDM) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newBDM = new BDM({ name, phone, address, email, password });
    await newBDM.save();
    res.status(201).json(newBDM);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/get", async (req, res) => {
  try {
    console.log("Fetching BDMs..."); // Debugging log
    const bdms = await BDM.find();
    console.log("Fetched BDMs:", bdms); // Log fetched data
    res.status(200).json(bdms);
  } catch (error) {
    console.error("Fetch error:", error); // Log error
    res.status(500).json({ message: error.message });
  }
});


// Get a single BDM by ID (GET)
router.get("/getbyid/:id", async (req, res) => {
  try {
    const bdm = await BDM.findById(req.params.id);
    if (!bdm) return res.status(404).json({ message: "BDM not found" });
    res.status(200).json(bdm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a BDM (PUT)
router.put("/update/:id", async (req, res) => {
  try {
    const { name, phone, address, email } = req.body;
    const updatedBDM = await BDM.findByIdAndUpdate(
      req.params.id,
      { name, phone, address, email },
      { new: true }
    );

    if (!updatedBDM) return res.status(404).json({ message: "BDM not found" });
    res.status(200).json(updatedBDM);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a BDM (DELETE)
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedBDM = await BDM.findByIdAndDelete(req.params.id);
    if (!deletedBDM) return res.status(404).json({ message: "BDM not found" });
    res.status(200).json({ message: "BDM deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
