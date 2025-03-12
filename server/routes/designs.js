// // routes/designs.js
// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const Designs = require('../models/designsModel');

// const router = express.Router();

// // Set up multer for video uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Save to uploads folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // Create a unique file name
//   }
// });

// const upload = multer({ storage: storage });

// // Route to upload video
// router.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     const newDesign = new Designs({
//       title: req.body.title,
//       description: req.body.description,
//       image: req.file.path, // Store the path of the uploaded video
//     });

//     await newDesign.save();
//     res.status(200).json({ message: 'Video uploaded successfully!' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error uploading video', error });
//   }
// });

// // Route to fetch all uploaded videos
// router.get('/view', async (req, res) => {
//   try {
//     const videos = await Designs.find();
//     res.status(200).json({ videos });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching videos', error });
//   }
// });

// module.exports = router;




// // routes/designs.js
// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const Designs = require('../models/designsModel');

// const router = express.Router();

// // Set up multer for image uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/images/'); // Save images to the 'uploads/images/' folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // Create a unique file name
//   }
// });

// const upload = multer({ storage: storage });

// // Route to upload image
// router.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     // Create a new Design with the uploaded image
//     const newDesign = new Designs({
//       title: req.body.title,
//       description: req.body.description,
//       image: req.file.path, // Store the path of the uploaded image
//     });

//     // Save the Design to the database
//     await newDesign.save();
//     res.status(200).json({ message: 'Image uploaded successfully!' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error uploading image', error });
//   }
// });

// // Route to fetch all uploaded images
// router.get('/view', async (req, res) => {
//   try {
//     // Fetch all Designs (which includes image info)
//     const images = await Designs.find();
//     res.status(200).json({ images });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching images', error });
//   }
// });

// module.exports = router;




// routes/designs.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Designs = require('../models/designsModel');

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images/'); // Save images to the 'uploads/images/' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Create a unique file name
  }
});

const upload = multer({ storage: storage });

// Route to upload image
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const newDesign = new Designs({
      title: req.body.title,
      description: req.body.description,
      image: req.file.path, // Store the path of the uploaded image
    });

    await newDesign.save();
    res.status(200).json({ message: 'Image uploaded successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error });
  }
});

// Route to fetch all uploaded images
router.get('/view', async (req, res) => {
  try {
    const images = await Designs.find();
    res.status(200).json({ images });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images', error });
  }
});

module.exports = router;
