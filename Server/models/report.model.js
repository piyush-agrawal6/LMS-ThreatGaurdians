const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  teacherName: {
    type: String,
    required: true,
  },

  teacherDepartment: {
    type: String,
    required: true,
  },

  teacherMobile: {
    type: Number,
    required: true,
  },

  medicines: [
    {
      medName: {
        type: String,
      },
      dosage: {
        type: Number,
      },
      duration: {
        type: String,
      },
    },
  ],

  extrainfo: {
    type: String,
  },

  studentName: {
    type: String,
    required: true,
  },

  studentAge: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  studentGender: {
    type: String,
    required: true,
  },

  studentMobile: {
    type: Number,
    required: true,
  },

  studentBloodGroup: {
    type: String,
    required: true,
  },

 

  date: {
    type: String,
  },

  time: {
    type: String,
  },
});

const ReportModel = mongoose.model("report", reportSchema);

module.exports = { ReportModel };
