const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  permissions: {
    type: {
      createUser: { type: Boolean, default: true },
      readUser: { type: Boolean, default: true },
      updateUser: { type: Boolean, default: true },
      deleteUser: { type: Boolean, default: true },
      changeStatus: { type: Boolean, default: true },
    },
    default: {
      createUser: true,
      readUser: true,
      updateUser: true,
      deleteUser: true,
      changeStatus: true,
    },
  },
  role: {
    type: Array,
    default: "midLevelAccess",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
});

const subAdmindb = new mongoose.model("subAdmin", userSchema);
module.exports = subAdmindb;
