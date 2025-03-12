// const mongoose = require("mongoose");

// const courseSchema = new mongoose.Schema(
//   {
//     // cou_id: {
//     //   type: Number,
//     //   required: true,
//     //   unique: true,
//     // },
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     BDM_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref:"BDM",
//       // ref: "BusinessDevelopmentManager",
//       required: true,
//     },
//     students: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Student",
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Course = mongoose.model("Course", courseSchema);

// module.exports = Course;



// const mongoose = require("mongoose");


// const courseSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     BDM_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "BDM", // Refers to Business Development Manager model
//       required: true,
//     },
//     students: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Student", // Refers to Student model
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Course = mongoose.model("Course", courseSchema);

// module.exports = Course;



// const mongoose = require("mongoose");

// const courseSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     duration: {
//       type: String, // You can choose a more appropriate type (e.g., Number or String) based on how you'd store duration (e.g., "3 months", "6 weeks")
//       required: true,
//     },
//     fee: {
//       type: Number, // Assuming the fee is a numerical value
//       required: true,
//     },
//   },
//   { timestamps: true }
// );
const mongoose = require("mongoose");
const BDM = require("../models/BDM");

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    fee: { type: Number, required: true },
    // BDM_id: { type: mongoose.Schema.Types.ObjectId, ref: "BDM", required: true },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;

