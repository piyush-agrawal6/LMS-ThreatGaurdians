const express = require("express");
const router = express.Router();

//model import
const { ContentModel } = require("../models/content.model");

//middleware import
const { isAuthenticated } = require("../middlewares/authenticate");

//get all content data route
router.get("/all", async (req, res) => {
  try {
    const content = await ContentModel.find();
    res.send({ msg: "All contents data", content });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});

//get single data route
router.get("/:contentId", async (req, res) => {
  const { contentId } = req.params;
  try {
    const content = await ContentModel.find({ _id: contentId });
    res.send({ msg: "Single content data", content: content[0] });
  } catch (error) {
    res.status(400).send({ msg: "Something went wrong" });
  }
});

//create new content route
router.post("/create", isAuthenticated, async (req, res) => {
  try {
    const content = new ContentModel(req.body.data);
    await content.save();
    return res.send({ msg: "Content Created", content });
  } catch (error) {
    res.status(404).send({ msg: "Error" });
  }
});

// edit content route
router.patch("/:contentId", isAuthenticated, async (req, res) => {
  const { contentId } = req.params;
  const payload = req.body.data;
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

//delete content route
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
