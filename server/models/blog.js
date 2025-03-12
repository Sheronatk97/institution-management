const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blogName: { type: String, required: true },
  blogContent: { type: String, required: true },
  blogCategory: { type: String, required: true },
  authorName: { type: String, required: true },
  publishDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);
