const express = require("express");
const router = express.Router();

//model import
const { QuizModel } = require("../models/quiz.model");

//middleware import
const { isAuthenticated } = require("../middlewares/authenticate");

//get all quiz data
router.get("/all", async (req, res) => {
  try {
    const quizzes = await QuizModel.find();
    res.send({ msg: "All quizzes data", quizzes });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});

//create new quiz
router.post("/create", isAuthenticated, async (req, res) => {
  try {
    const quiz = new QuizModel(req.body.data);
    await quiz.save();
    return res.send({ msg: "Quiz Created", quiz });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

//edit quiz
router.patch("/:quizId", isAuthenticated, async (req, res) => {
  const { quizId } = req.params;
  const payload = req.body.data;
  try {
    const quiz = await QuizModel.findByIdAndUpdate({ _id: quizId }, payload);
    const updatedQuiz = await QuizModel.find({ _id: quizId });
    res.status(200).send({ msg: "Updated Quiz", quiz: updatedQuiz[0] });
  } catch (err) {
    res.status(404).send({ msg: "Error" });
  }
});

//delete quiz
router.delete("/:quizId", async (req, res) => {
  const { quizId } = req.params;
  try {
    const quiz = await QuizModel.findByIdAndDelete({ _id: quizId });
    res.status(200).send({ msg: "Deleted Quiz" });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

module.exports = router;
