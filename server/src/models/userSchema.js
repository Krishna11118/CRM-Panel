const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not valid email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: Array,
    default: "user",
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
  subAdminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subAdmin",
  },
  isActive: {
    type: Boolean,
    default: true, 
  },
});

const userdb = new mongoose.model("user", userSchema);
module.exports = userdb;
