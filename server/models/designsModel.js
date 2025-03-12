// models/videoModel.js
const mongoose = require('mongoose');

const designsSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String, // Video file path or URL
});

const Designs = mongoose.model('Designs', designsSchema);

module.exports = Designs;
