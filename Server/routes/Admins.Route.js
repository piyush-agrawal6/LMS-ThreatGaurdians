const express = require("express");
const { AdminModel } = require("../models/admin.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

// router.get("/", async (req, res) => {
//   let query = req.query;
//   try {
//     const admins = await AdminModel.find(query);
//     res.status(200).send(admins);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Something went wrong" });
//   }
// });

// router.post("/register", async (req, res) => {
//   const payload = req.body;
//   try {
//     const admin = new AdminModel(payload);
//     await admin.save();
//   } catch (error) {
//     res.send("Something went wrong, unable to Register.");
//     console.log(error);
//   }
//   res.send("Admin Registered Successfully");
// });

// **************** end points: "/admin/register" for registering any new admin ****************
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    bcrypt.hash(password, +(process.env.Salt_rounds), async (err, secure_password) => {
      if (err) {
        console.log(err);
      } else {
        const admin = new AdminModel({ name, email, password: secure_password });
        await admin.save();
        res.status(201).send({ msg: 'Admin Registered Successfully' });
      }
    })
  } catch (err) {
    res.status(404).send({ msg: "Admin Registation failed" });
  }
});


// **************** end points: "/admin/login" for Login any exsiting admin ****************
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await AdminModel.find({ email });
    if (admin.length > 0) {
      if (admin[0].access == false) {
        return res.send({ message: "Do don,t have the access." });
      }
      bcrypt.compare(password, admin[0].password, (err, results) => {
        if (results) {
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

router.patch("/:adminId", async (req, res) => {
  const { adminId } = req.params;
  const payload = req.body;
  try {
    const admin = await AdminModel.findByIdAndUpdate({ _id: adminId }, payload);
    if (!admin) {
      res.status(404).send({ msg: `Admin with id ${adminId} not found` });
    }
   res.status(200).send({ msg: `Admin with id ${adminId} updated` });
  } catch (err) {
    res.status(404).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:adminId", async (req, res) => {
  const { adminId } = req.params;

  try {
    const admin = await AdminModel.findByIdAndDelete({ _id: adminId });
    if (!admin) {
      res.status(404).send(`Admin with id ${adminId} not found`);
    }
    res.status(200).send(`Admin with id ${adminId} deleted`);
  } catch (error) {
    res.status(404).send({ error: "Something went wrong, unable to Delete." });
  }
});

module.exports = router;
