const express = require("express");
const { TutorModel } = require("../models/Tutor.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

// **************** end points: "/tutor/register" for registering any new tutor ****************
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    bcrypt.hash(password, +(process.env.Salt_rounds), async (err, secure_password) => {
      if (err) {
        console.log(err);
      } else {
        const tutor = new TutorModel({ name, email, password: secure_password });
        await tutor.save();
        res.status(201).send({ msg: 'Tutor Registered Successfully' });
      }
    })
  } catch (err) {
    res.status(404).send({ msg: "Tutor Registation failed" });
  }
});

// **************** end points: "/tutor/login" for Login any exsiting Tutor ****************
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const tutor = await TutorModel.find({ email });
    if (tutor.length > 0) {
      bcrypt.compare(password, tutor[0].password, (err, results) => {
        if (results) {
          let token = jwt.sign(
            { email, name: tutor[0].name },
            process.env.secret_key,
            { expiresIn: "7d" }
          );
          res.send({
            message: "Login Successful",
            user: tutor[0],
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
//     const nurses = await NurseModel.find(query);
//     res.status(200).send(nurses);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Something went wrong" });
//   }
// });

// router.post("/register", async (req, res) => {
//   const payload = req.body;
//   try {
//     const nurse = new NurseModel(payload);
//     await nurse.save();
//   } catch (error) {
//     res.send("Something went wrong, unable to Register.");
//     console.log(error);
//   }
//   res.send("Nurse Registered Successfully");
// });

// router.patch("/:nurseId", async (req, res) => {
//   const id = req.params.nurseId;
//   const payload = req.body;
//   try {
//     const nurse = await NurseModel.findByIdAndUpdate({ _id: id }, payload);
//     if (!nurse) {
//       res.status(404).send({ msg: `Nurse with id ${id} not found` });
//     }
//     res.status(200).send(`Nurse with id ${id} updated`);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Something went wrong, unable to Update." });
//   }
// });

// router.delete("/:nurseId", async (req, res) => {
//   const id = req.params.nurseId;
//   try {
//     const nurse = await NurseModel.findByIdAndDelete({ _id: id });
//     if (!nurse) {
//       res.status(404).send({ msg: `Nurse with id ${id} not found` });
//     }
//     res.status(200).send(`Nurse with id ${id} deleted`);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Something went wrong, unable to Delete." });
//   }
// });

module.exports = router;
