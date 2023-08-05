const mongoose = require("mongoose");

const doubtSchema = mongoose.Schema(
  {
    studentId: String,
    name: String,
    title: String,
    description: String,
    class: Number,
    subject: String,
    fileUrl: String,
    fileType: String,
    thumbnailUrl: String,
    size: String,
    resolved: { type: String, default: "No" },
    response: [{ type: String }],
  },
  { versionKey: false, timestamps: true }
);

const DoubtModel = mongoose.model("doubt", doubtSchema);

module.exports = { DoubtModel };
