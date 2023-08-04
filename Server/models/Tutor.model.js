const mongoose = require("mongoose");

const tutorSchema = mongoose.Schema(
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
    subject: {
      type: String,
      required: true,
    },
    access: {
      type: String,
      default: "true",
    },
    userType: {
      type: String,
      default: "Tutor",
    },
  },
  { versionKey: false, timestamps: true }
);

const TutorModel = mongoose.model("tutor", tutorSchema);

module.exports = { TutorModel };
