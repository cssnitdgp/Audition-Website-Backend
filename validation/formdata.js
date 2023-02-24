// Description: This file contains the validation for the form data

// Importing Validator
const isEmpty = require("../utils/isEmpty.js");
const isEmail = require("../utils/isEmail.js");

// Data
/*
    name: String (Required),
    email: String (Required),
    rollno: String (Required),
    regno: String (Required),
    phone: String (Required),
    github: String,
    linkedin: String,
    introduction: String (Required),
    skills: [String] (Required),
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

const formDataValidator = (data) => {
  let errors = {};

  // Validating Name
  data.name = isEmpty(data.name) ? "" : data.name;

  // Validating Personal Email
  data.email = isEmpty(data.email) ? "" : data.email;

  if (!isEmail(data.email)) {
    errors.email = "Invalid Email.";
  }

  // Validating Roll Number
  data.rollno = isEmpty(data.rollno) ? "" : data.rollno;

  // Validating Registration Number

  data.regno = isEmpty(data.regno) ? "" : data.regno;

  // Validating Phone Number

  data.phone = isEmpty(data.phone) ? "" : data.phone;

  // Validating Github Link

  data.github = isEmpty(data.github) ? "" : data.github;

  // Validating Linkedin Link

  data.linkedin = isEmpty(data.linkedin) ? "" : data.linkedin;

  // Validating Introduction

  data.introduction = isEmpty(data.introduction) ? "" : data.introduction;

  // Validating Skills

  data.roles = isEmpty(data.roles) ? [] : data.roles;

  if (!Array.isArray(data.roles)) {
    errors.roles = "Skills must be an array.";
  }

  // Validating Preference

  data.preference = isEmpty(data.preference) ? "" : data.preference;

  // Validating Rating

  data.rating = isEmpty(data.rating) ? "" : data.rating;

  // Validating Project Link

  data.proj_link = isEmpty(data.proj_link) ? "" : data.proj_link;

  // Validating Hardworking

  data.hardworking = isEmpty(data.hardworking) ? 0 : data.hardworking;

  // Validating Teamwork

  data.teamwork = isEmpty(data.teamwork) ? 0 : data.teamwork;

  // Validating Sense of Humour

  data.senseofhumour = isEmpty(data.senseofhumour) ? 0 : data.senseofhumour;

  // Validating Punctuality

  data.punctuality = isEmpty(data.punctuality) ? 0 : data.punctuality;

  // Validating Creativity

  data.creativity = isEmpty(data.creativity) ? 0 : data.creativity;

  // Validating Problem Solving

  data.problemSolving = isEmpty(data.problemSolving) ? 0 : data.problemSolving;

  // Validating Responsibility

  data.responsibility = isEmpty(data.responsibility) ? 0 : data.responsibility;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

// Exporting Validator
module.exports = formDataValidator;
