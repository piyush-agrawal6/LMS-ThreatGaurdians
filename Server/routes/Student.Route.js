const express = require("express");
const { StudentModel } = require("../models/student.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await StudentModel.find({ email });
    if (admin.length > 0) {
      let token = jwt.sign(
        { email, name: admin[0].name },
        process.env.secret_key,
        { expiresIn: "7d" }
      );
      res.send({
        message: "Login Successful",
        user: admin[0],
        token,
      });
    } else {
      res.send("Wrong credentials");
    }
  } catch (error) {
    res.status(404).send({ message: "Error" });
  }
});

// router.get("/", async (req, res) => {
//   let query = req.query;
//   try {
//     const doctors = await DoctorModel.find(query);
//     res.status(200).send(doctors);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Something went wrong" });
//   }
// });

// router.post("/register", async (req, res) => {
//   const payload = req.body;
//   try {
//     const doctor = new DoctorModel(payload);
//     await doctor.save();
//   } catch (error) {
//     res.send("Something went wrong, unable to Register.");
//     console.log(error);
//   }
//   res.send("Doctor Registered Successfully");
// });

// router.patch("/:doctorId", async (req, res) => {
//   const id = req.params.doctorId;
//   const payload = req.body;
//   try {
//     const doctor = await DoctorModel.findByIdAndUpdate({ _id: id }, payload);
//     if (!doctor) {
//       res.status(404).send({ msg: `Doctor with id ${id} not found` });
//     }
//     res.status(200).send(`Doctor with id ${id} updated`);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Something went wrong, unable to Update." });
//   }
// });

// router.delete("/:doctorId", async (req, res) => {
//   const id = req.params.doctorId;
//   try {
//     const doctor = await DoctorModel.findByIdAndDelete({ _id: id });
//     if (!doctor) {
//       res.status(404).send({ msg: `Doctor with id ${id} not found` });
//     }
//     res.status(200).send(`Doctor with id ${id} deleted`);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Something went wrong, unable to Delete." });
//   }
// });

module.exports = router;
