//imports
require("dotenv").config();
const express = require("express");
const app = express();
const { connection } = require("./configs/db");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

//port
const PORT = process.env.port || 8080;

//routes imports
const adminRouter = require("./routes/Admins.Route");
const studentRouter = require("./routes/Student.Route");
const tutorRouter = require("./routes/Tutor.Route");
const quizRouter = require("./routes/Quiz.Route");
const contentRouter = require("./routes/Content.Route");
const DoubtRouter = require("./routes/Doubt.Route");
const DashboardRouter = require("./routes/Dashboard.Route");

app.use(express.text());
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.send("Home Route");
});
app.use("/admin", adminRouter);
app.use("/tutor", tutorRouter);
app.use("/student", studentRouter);
app.use("/quiz", quizRouter);
app.use("/content", contentRouter);
app.use("/doubt", DoubtRouter);
app.use("/dashboard", DashboardRouter);

//app listening
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Unable to connect to DB");
  }
  console.log(`Listening at port ${PORT}`);
});
