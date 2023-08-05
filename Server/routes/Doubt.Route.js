const express = require("express");
const router = express.Router();

//model import
const { DoubtModel } = require("../models/doubt.model");

//get all doubts data 
router.get("/all", async (req, res) => {
  try {
    const doubt = await DoubtModel.find();
    res.send({ msg: "All doubts data", doubt });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});

//get single doubt
router.get("/:doubtId", async (req, res) => {
  const { doubtId } = req.params;
  try {
    const doubt = await DoubtModel.find({ _id: doubtId });
    res.send({ msg: "Single doubt data", doubt: doubt[0] });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});

//create new doubt
router.post("/create", async (req, res) => {
  try {
    const doubt = new DoubtModel(req.body);
    await doubt.save();
    return res.send({ msg: "doubt Created", doubt });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

// add response to doubts
router.post("/add", async (req, res) => {
  try {
    const doubt = await DoubtModel.findById(req.body.id);
    doubt.response.push(req.body.desc);
    await doubt.save();
    let updatedDoubt = await DoubtModel.findById(req.body.id);
    return res.send({ msg: "Response added", doubt: updatedDoubt });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

//edit doubt
router.patch("/:doubtId", async (req, res) => {
  const { doubtId } = req.params;
  const payload = req.body;
  try {
    const doubt = await DoubtModel.findByIdAndUpdate({ _id: doubtId }, payload);
    const updatedDoubt = await DoubtModel.find({ _id: doubtId });
    res.status(200).send({ msg: "Updated doubt", doubt: updatedDoubt[0] });
  } catch (err) {
    res.status(404).send({ msg: "Error" });
  }
});

//delete doubt
router.delete("/:doubtId", async (req, res) => {
  const { doubtId } = req.params;
  try {
    const doubt = await DoubtModel.findByIdAndDelete({ _id: doubtId });
    res.status(200).send({ msg: "Deleted doubt" });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

module.exports = router;
