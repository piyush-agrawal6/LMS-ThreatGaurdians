const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
  title: String,
  thumbnail: String,
  class: Number,
  subject: String,
  noOfQuestions: Number,
  pointPerQuestion: Number,
  negativeMarking: { type: String, default: 'No' },
  negativeMarkingPerQuestion: { type: String, default: 'No' },
  totalTime: TimeRanges,
  questionData: Array,
  totalPoint: Number,
  totalTime: Number,
  averageTime: { type: TimeRanges }

}, { versionKey: false, timestamps: true });

const QuizModel = mongoose.model("quiz", quizSchema);

module.exports = { QuizModel };
