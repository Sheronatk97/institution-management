

// routes/videoRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Video = require('../models/videoModel');

const router = express.Router();

// Set up Multer storage for video files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save uploaded files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to avoid overwriting
  },
});

const upload = multer({ storage });

// Route to upload a new video
router.post('/add', upload.single('video'), async (req, res) => {
  try {
    const { title, description, uploadedBy } = req.body;
    const filePath = req.file.path;  // Get the file path

    // Save the video details in the database
    const newVideo = new Video({ title, description, filePath, uploadedBy });
    await newVideo.save();

    // Respond with the video details including the file path
    res.status(200).json({ message: 'Video uploaded successfully', video: newVideo });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading video', error: error.message });
  }
});

// Route to view all uploaded videos
router.get('/view', async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
});

module.exports = router;
