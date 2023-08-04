const mongoose = require("mongoose");

const contentSchema = mongoose.Schema(
  {
    title: String,
    class: Number,
    subject: String,
    type: String,
    creator: String,
    fileUrl: String,
    fileType: String,
    thumbnailUrl: String,
    size: String,
  },
  { versionKey: false, timestamps: true }
);

const ContentModel = mongoose.model("content", contentSchema);

module.exports = { ContentModel };
