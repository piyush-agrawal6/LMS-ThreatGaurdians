const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      default: "Admin",
    },
    access: {
      type: String,
      default: "true",
    },
  },
  { versionKey: false, timestamps: true }
);

const AdminModel = mongoose.model("admin", adminSchema);

module.exports = { AdminModel };
