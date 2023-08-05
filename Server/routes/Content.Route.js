const express = require("express");
const { ContentModel } = require("../models/content.model");
const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const content = await ContentModel.find();
    res.send({ msg: "All contents data", content });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});

router.get("/:contentId", async (req, res) => {
  const { contentId } = req.params;
  try {
    const content = await ContentModel.find({ _id: contentId });
    res.send({ msg: "Single content data", content: content[0] });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});

router.post("/create", async (req, res) => {
  try {
    const content = new ContentModel(req.body);
    await content.save();
    return res.send({ msg: "Content Created", content });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

router.patch("/:contentId", async (req, res) => {
  const { contentId } = req.params;
  const payload = req.body;
  try {
    const content = await ContentModel.findByIdAndUpdate(
      { _id: contentId },
      payload
    );
    const updatedContent = await ContentModel.find({ _id: contentId });
    res
      .status(200)
      .send({ msg: "Updated Content", content: updatedContent[0] });
  } catch (err) {
    res.status(404).send({ msg: "Error" });
  }
});

router.delete("/:contentId", async (req, res) => {
  const { contentId } = req.params;
  try {
    const content = await ContentModel.findByIdAndDelete({ _id: contentId });
    res.status(200).send({ msg: "Deleted Content" });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

module.exports = router;
