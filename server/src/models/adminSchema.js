const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    trim: true,
  },
  mobile: {
    type: String,
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
  role: {
    type: Array,
    default: "globalAccess",
  },
  permissions: {
    type: Array,
    default: [
      // "create",
      // "read",
      // "update",
      // "delete",
      // "createUser",
      // "readUser",
      // "updateUser",
      // "deleteUser",
    ],
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const admindb = new mongoose.model("admin", userSchema);
module.exports = admindb;
