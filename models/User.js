const { Schema, model } = require("mongoose");

// Creating Schema
const userSchema = new Schema({
  email: {
    type: String,
  },
  family_name: {
    type: String,
  },
  given_name: {
    type: String,
  },
  picture: {
    type: String,
  },
  submitted: {
    type: Boolean,
    default: false,
  },
});

// Creating Model
const User = model("User", userSchema);

// Exporting Model
module.exports = User;
