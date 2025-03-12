// // routes/designerRoutes.js
// const express = require("express");
// const Designer = require("../models/Designer");

// const router = express.Router();

// router.post("/create", async (req, res) => {
//   try {
//     const { fullName, email,password, department, experience, primarySkills, role } = req.body;
//     let designer = await Designer.findOne({ email });
//     if (designer) return res.status(400).json({ message: "Designer already exists" });

//     designer = new Designer({ fullName, email, department, experience, primarySkills, role });
//     await designer.save();

//     res.status(201).json({ message: "Designer created successfully" });
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// router.get("/all", async (req, res) => {
//   try {
//     const designers = await Designer.find();
//     res.json(designers);
//   } catch (err) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// router.put("/update/:id", async (req, res) => {
//     try {
//       const designer = await Designer.findByIdAndUpdate(req.params.id, req.body, { new: true });
//       res.json(designer);
//     } catch (err) {
//       res.status(500).json({ error: "Server error" });
//     }
//   });
  
//   router.delete("/delete/:id", async (req, res) => {
//     try {
//       await Designer.findByIdAndDelete(req.params.id);
//       res.json({ message: "Designer deleted successfully" });
//     } catch (err) {
//       res.status(500).json({ error: "Server error" });
//     }
//   });
// module.exports = router; 



const express = require("express");
const bcrypt = require("bcryptjs");
const Designer = require("../models/Designer");

const router = express.Router();

// Create a new designer
router.post("/create", async (req, res) => {
  const { fullName, email, password, department, experience, primarySkills } = req.body;

  try {
    // Check if the designer already exists
    let designer = await Designer.findOne({ email });
    if (designer) return res.status(400).json({ message: "Designer already exists" });

    // Create and save the designer with the plain text password
    designer = new Designer({
      fullName,
      email,
      password,  // Storing the plain text password directly
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
    const designers = await Designer.find();
    res.json(designers);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update a designer by ID
router.put("/update/:id", async (req, res) => {
  const { fullName, email, password, department, experience, primarySkills } = req.body;

  try {
    let designer = await Designer.findById(req.params.id);
    if (!designer) {
      return res.status(404).json({ message: "Designer not found" });
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(password, salt);
    }

    designer = await Designer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(designer);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a designer by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    await Designer.findByIdAndDelete(req.params.id);
    res.json({ message: "Designer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
