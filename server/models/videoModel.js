// models/videoModel.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  filePath: String, // path to the uploaded video file
  uploadedBy: String, // User who uploaded it (e.g., "Employee" or "Manager")
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
