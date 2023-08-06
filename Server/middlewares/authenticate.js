const { AdminModel } = require("../models/admin.model");
const { TutorModel } = require("../models/Tutor.model");
const jwt = require("jsonwebtoken");

const isAdminAuthenticated = async (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    return res.status(401).send({ message: "Missing Token. Access Denied" });
  }
  try {
    const decodedData = jwt.verify(token, process.env.secret_key);
    let user = await AdminModel.findOne({ email: decodedData.email });
    if (user) {
      next();
    } else {
      return res.status(401).send({ message: "Invalid Token. Access Denied" });
    }
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
};

const isTutorAuthenticated = async (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    return res.status(401).send({ message: "Missing Token. Access Denied" });
  }
  try {
    const decodedData = jwt.verify(token, process.env.secret_key);
    let user = await TutorModel.findById(decodedData.email);
    if (user) {
      next();
    } else {
      return res.status(401).send({ message: "Invalid Token. Access Denied" });
    }
  } catch (error) {
    return res.status(401).send({ message: "Error" });
  }
};

const isAuthenticated = async (req, res, next) => {
  const token = req.body.token;
  if (!token) {
    return res.status(401).send({ message: "Missing Token. Access Denied" });
  }
  try {
    const decodedData = jwt.verify(token, process.env.secret_key);
    let admin = await AdminModel.findById(decodedData.email);
    let tutor = await TutorModel.findById(decodedData.email);
    if (admin || tutor) {
      next();
    } else {
      return res.status(401).send({ message: "Invalid Token. Access Denied" });
    }
  } catch (error) {
    return res.status(401).send({ message: "Error" });
  }
};

module.exports = {
  isAdminAuthenticated,
  isTutorAuthenticated,
  isAuthenticated,
};
