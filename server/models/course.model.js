
const mongoose = require("mongoose");
const BDM = require("../models/BDM");

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    fee: { type: Number, required: true },
    BDM_id: { type: mongoose.Schema.Types.ObjectId, ref: "BDM", required: true },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;

