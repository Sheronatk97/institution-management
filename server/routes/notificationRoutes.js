const express = require("express");
const Notification = require("../models/notification.model");

const router = express.Router();

// ➤ Create a Notification
router.post("/", async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json({ message: "Notification created successfully", notification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Get All Notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find().populate("FM_id stu_id");
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Get a Single Notification by ID
router.get("/:id", async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id).populate("FM_id stu_id");
    if (!notification) return res.status(404).json({ message: "Notification not found" });

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Update a Notification
router.put("/:id", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!notification) return res.status(404).json({ message: "Notification not found" });

    res.status(200).json({ message: "Notification updated successfully", notification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Delete a Notification
router.delete("/:id", async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) return res.status(404).json({ message: "Notification not found" });

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
