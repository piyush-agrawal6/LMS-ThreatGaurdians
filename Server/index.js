const express = require("express");
const { connection } = require("./configs/db");
require("dotenv").config();
const cors = require("cors");

const adminRouter = require("./routes/Admins.Route");
const studentRouter = require("./routes/Student.Route");
const tutorRouter = require("./routes/Tutor.Route");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.use("/admin", adminRouter);
app.use("/tutor", tutorRouter);
app.use("/student", studentRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Unable to connect to DB");
  }
  console.log(`Listening at port ${process.env.port}`);
});
