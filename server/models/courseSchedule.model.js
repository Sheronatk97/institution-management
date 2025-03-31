

// module.exports =  CourseSchedule;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the CourseSchedule Schema
const courseScheduleSchema = new Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',  // Reference to the Course model
    required: true,
  },
  consultant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consultant',  // Reference to the Consultant model
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true,  // You can make this optional if the user is not always required
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  slot: {
    type: String,  // Slot 1, Slot 2, Slot 3, Slot 4
    enum: ['Slot 1', 'Slot 2', 'Slot 3', 'Slot 4'],  // Define the available slots
    required: true,
  },
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('CourseSchedule', courseScheduleSchema);
