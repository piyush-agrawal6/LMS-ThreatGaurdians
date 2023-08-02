const express = require("express");
const { StudentModel } = require("../models/student.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

// **************** end points: "/student/register" for registering any new student ****************
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    bcrypt.hash(password, +(process.env.Salt_rounds), async (err, secure_password) => {
      if (err) {
        console.log(err);
      } else {
        const student = new StudentModel({ name, email, password: secure_password });
        await student.save();
        res.status(201).send({ msg: 'Student Registered Successfully' });
      }
    })
  } catch (err) {
    res.status(404).send({ msg: "Student Registation failed" });
  }
});

// **************** end points: "/student/login" for Login any exsiting student ****************
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await StudentModel.find({ email });
    if (student.length > 0) {
      bcrypt.compare(password, student[0].password, (err, results) => {
        if (results) {
          let token = jwt.sign(
            { email, name: student[0].name },
            process.env.secret_key,
            { expiresIn: "7d" }
          );
          res.send({
            message: "Login Successful",
            user: student[0],
            token,
          });
        } else {
          res.status(201).send({ message: "Wrong credentials" });
        }
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

router.patch("/:studentId", async (req, res) => {
  const {studentId} = req.params;
  const payload = req.body;
  try {
    const student = await StudentModel.findByIdAndUpdate({ _id: studentId }, payload);
    if (!student) {
      res.status(404).send({ msg: `Student with id ${studentId} not found` });
    }
    res.status(200).send(`Student with id ${studentId} updated`);
  } catch (error) {
    res.status(404).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:studentId", async (req, res) => {
  const {studentId} = req.params;
  try {
    const student = await StudentModel.findByIdAndDelete({ _id: studentId });
    if (!student) {
      res.status(404).send({ msg: `Student with id ${studentId} not found` });
    }
    res.status(200).send(`Student with id ${studentId} deleted`);
  } catch (error) {
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
