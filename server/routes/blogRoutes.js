const express = require("express");
const Blog = require("../models/blog");

const router = express.Router();

// Create a new blog post
router.post("/create", async (req, res) => {
  try {
    const { blogName, blogContent, blogCategory, authorName, publishDate } = req.body;

    if (!blogName || !blogContent || !blogCategory || !authorName || !publishDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBlog = new Blog({ blogName, blogContent, blogCategory, authorName, publishDate });
    await newBlog.save();

    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error });
  }
});

// Get all blog posts
router.get("/all", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
});

// Get a single blog post
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error });
  }
});

// Update a blog post
router.put("/update/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error });
  }
});

// Delete a blog post
router.delete("/delete/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error });
  }
});

module.exports = router;
