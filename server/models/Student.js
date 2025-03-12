// const mongoose = require("mongoose");

// const studentSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },
//     age: {
//       type: Number,
//       required: true,
//     },
//     course: {
//       type: String,
//       required: true,
//     },
//     profilePhoto: {
//       type: String, // URL of the uploaded image
//       default: "",
//     },
//     education: [
//       {
//         degree: String,
//         university: String,
//         year: Number,
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Student = mongoose.model("Student", studentSchema);
// module.exports = Student;


const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
    age: {
      type: Number,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String, // Path to uploaded image
      default: "",
    },
    education: [
      {
        degree: String,
        university: String,
        year: Number,
      },
    ],
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
