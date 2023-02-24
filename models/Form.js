const { Schema, model } = require("mongoose");

// Creating Schema
const formSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  rollno: {
    type: String,
    required: true,
  },
  regno: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  github: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  introduction: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    required: true,
  },
  preference: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  proj_link: {
    type: String,
  },
  hardworking: {
    type: Number,
    default: 0,
  },
  teamwork: {
    type: Number,
    default: 0,
  },
  senseofhumour: {
    type: Number,
    default: 0,
  },
  punctuality: {
    type: Number,
    default: 0,
  },
  creativity: {
    type: Number,
    default: 0,
  },
  problemSolving: {
    type: Number,
    default: 0,
  },
  responsibility: {
    type: Number,
    default: 0,
  },
});

// Creating Model
const Form = model("Form", formSchema);

// Exporting Model
module.exports = Form;


/*
    name: String (Required),
    personalemail: String (Required),
    rollno: String (Required),
    regno: String (Required),
    phone: String (Required),
    github: String,
    linkedin: String,
    introduction: String (Required),
    skils: [String] (Required),
    preference: String (Required),
    rating: String (Required),
    proj_link: String,
    hardworking: Number,
    teamwork: Number,
    senseofhumour: Number,
    punctuality: Number,
    creativity: Number,
    problemSolving: Number,
    responsibility: Number,
*/