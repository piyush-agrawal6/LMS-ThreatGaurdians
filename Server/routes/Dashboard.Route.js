const express = require("express");
const router = express.Router();

//model import
const { TutorModel } = require("../models/Tutor.model");
const { AdminModel } = require("../models/admin.model");
const { ContentModel } = require("../models/content.model");
const { QuizModel } = require("../models/quiz.model");
const { StudentModel } = require("../models/student.model");
const { DoubtModel } = require("../models/doubt.model");

//get all dashboard data
router.get("/all", async (req, res) => {
  try {
    const tutors = await TutorModel.find();
    const students = await StudentModel.find();
    const admins = await AdminModel.find();
    const contents = await ContentModel.find();
    const quizzes = await QuizModel.find();
    const doubts = await DoubtModel.find();
    res.send({
      message: "All tutor data",
      dashboard: { tutors, admins, students, contents, quizzes, doubts },
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
