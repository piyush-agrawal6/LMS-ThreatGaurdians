const AdminModel = require("../models/admin.model.js");
const TutorModel = require("../models/Tutor.model.js");
const jwt = require("jsonwebtoken");

const isAdminAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (token) {
      const decodedData = jwt.verify(token, process.env.secret_key);
      req.userEmail = decodedData.email;
      next();
    } else {
      return res.status(401).send({ message: "Missing Token. Access Denied" });
    }
  } catch (error) {
    return res.status(401).send({ message: "Error" });
  }
};

const isTutorAuthenticated = async (req, res, next) => {
  const token = req.headers.token;
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
    return res.status(401).send({ error: error.message });
  }
};

const isAuthenticated = async (req, res, next) => {
  const token = req.headers.token;
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
    return res.status(401).send({ error: error.message });
  }
};

module.exports = {
  isAdminAuthenticated,
  isTutorAuthenticated,
  isAuthenticated,
};
