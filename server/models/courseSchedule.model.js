const mongoose =require("mongoose");

const courseScheduleSchema = new mongoose.Schema(
  {
    sch_id: {
      type: Number,
      required: true,
      unique: true,
    },
    ac_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssociateConsultant",
      required: true,
    },
    stu_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    cou_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CourseSchedule = mongoose.model("CourseSchedule", courseScheduleSchema);

module.exports =  CourseSchedule;
