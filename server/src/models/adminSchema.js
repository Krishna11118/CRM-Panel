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
  // permissions: {
  //   type: Array,
  //   default: [
  //     // "create",
  //     // "read",
  //     // "update",
  //     // "delete",
  //     // "createUser",
  //     // "readUser",
  //     // "updateUser",
  //     // "deleteUser",
  //   ],
  // },
  status: {
    type: Boolean,
    default: true,
  },
  lastLoggedIn: {
    ip: { type: String, required: false },
    country_code: { type: String, },
    country_name: { type: String, },
    region_name: { type: String, },
    city_name: { type: String, },
    network: { type: String },
  },
  currentLocation: {
    location: { type: String, default: "N/A" },
    lastUpdated: { type: Date, default: Date.now },
  },
  weatherData: {
    location: String,
    lastUpdated: { type: Date, default: Date.now },
    Temperature: String,
    WindSpeed: String,
    Weather: String,
    Humidity: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastLoggedIn: Object,
}, );

const admindb = new mongoose.model("admin", userSchema);
module.exports = admindb;
