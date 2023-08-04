const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    access: {
      type: String,
      default: "true",
    },
    class: {
      type: String,
      // required: true,
    },
    userType: {
      type: String,
      default: "Student",
    },
    quiz: Array,
    totalPoints: Number,
    premium: {
      type: Boolean,
      default: false,
    },
    // averageTime: { type: TimeRanges },
  },
  { versionKey: false, timestamps: true }
);

const StudentModel = mongoose.model("student", studentSchema);

module.exports = { StudentModel };
