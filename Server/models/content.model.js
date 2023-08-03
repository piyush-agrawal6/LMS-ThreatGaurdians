const mongoose = require("mongoose");

const contentSchema = mongoose.Schema(
  {
    title: String,
    class: Number,
    subject: String,
    creator: String,
    fileUrl: String,
    fileType: String,
  },
  { versionKey: false, timestamps: true }
);

const ContentModel = mongoose.model("quiz", contentSchema);

module.exports = { ContentModel };
