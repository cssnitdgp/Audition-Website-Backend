const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const fs = require("fs");

// Importing Form Model
const Form = require("../models/Form.js");

// Importing utils
const toString = require("../utils/toString.js");

// Validator
const formDataValidator = require("../validation/formdata.js");

/*
    @route: POST api/form/add
    @desc: Add a new form
    @access: Public
    @method: POST
*/

router.post("/add", async (req, res) => {
  // Validating Request Body
  const { errors, isValid } = formDataValidator(req.body);

  // Checking Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    // Checking if the user has already filled the form
    const exisitngForm = await Form.findOne({ email: req.body.email });

    // If the user has already filled the form
    if (exisitngForm) {
      return res.status(400).json({ email: "User Already Exists" });
    }

    // If the user has not filled the form, Create a new form
    const newForm = await new Form({
      name: req.body.name,
      email: req.body.email,
      rollno: req.body.rollno,
      regno: req.body.regno,
      phone: req.body.phone,
      github: req.body.github,
      linkedin: req.body.linkedin,
      introduction: req.body.introduction,
      roles: req.body.skills,
      preference: req.body.preference,
      rating: req.body.rating,
      proj_link: req.body.proj_link,
      hardworking: req.body.hardworking,
      teamwork: req.body.teamwork,
      senseofhumour: req.body.senseofhumour,
      punctuality: req.body.punctuality,
      creativity: req.body.creativity,
      problemSolving: req.body.problemSolving,
      responsibility: req.body.responsibility,
    });

    // Saving Form
    await newForm.save();

    // Sending Response
    return res.status(200).json({ message: "Form Submitted Successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

/*
    @route: GET api/form/all
    @desc: Generate and Excel Sheet
    @access: Public
    @method: GET
*/

router.get("/all", async (req, res) => {
  try {
    // Fetching All Forms
    const allForms = await Form.find();

    if (allForms.length === 0) {
      return res.status(400).json({ error: "No Forms Found" });
    }

    // Generating Excel Sheet
    let csv =
      "Name,Email, Roll Number, Registration Number, Phone, Github, LinkedIn, Introduction, Roles, Preference, Rating, Project Link, Hard Working, Team Work, Sense of Humour, Punctuality, Creativity, Problem Solving, Responsibility\n";

    //   Creating CSV

    let date = new Date();
    let fileName = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()} ${date.getHours()}::${date.getMinutes()}.csv`;

    let logger = fs.createWriteStream(fileName, {
      flags: "a",
    });

    logger.write(csv);

    allForms.forEach((form) => {
      csv = `${form.name},${form.email},${form.rollno},${
        form.regno
      },${form.phone.replace(/,/g, ";")},${form.github},${
        form.linkedin
      },${form.introduction.replace(/,/g, ";")},${toString(
        form.roles
      )},${form.preference.replace(/,/g, ";")},${form.rating.replace(
        /,/g,
        ";"
      )},${form.proj_link.replace(/,/g, ";")},${form.hardworking},${
        form.teamwork
      },${form.senseofhumour},${form.punctuality},${form.creativity},${
        form.problemSolving
      },${form.responsibility}\n`;

      logger.write(csv);
    });
    // Mail the file to email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    });

    const mailOptions = {
      from: `CSS NITDGP <${process.env.SENDER_EMAIL}>`,
      to: `CSS NITDGP <${process.env.RECEIVER_EMAIL}>`,
      subject: `Excel Sheet For ${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()} ${date.getHours()}::${date.getMinutes()}`,
      text: "Please find Attached!",
      attachments: [
        {
          filename: `Enteries.csv`,
          path: `./${fileName}`,
        },
      ],
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        fs.unlink(`./${fileName}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
        return res.status(500).json({ error: "Internal Server Error" });
      } else {
        // Sending Response
        fs.unlink(`./${fileName}`, (err) => {
          if (err) {
            console.log(err);
          }
        });
        return res.status(200).json({
          message: `Excel is mailed to ${process.env.RECEIVER_EMAIL}`,
        });
      }
    });
  } catch (err) {
    console.log(err);
    fs.unlink(`./${fileName}`, (err) => {
      if (err) {
        console.log(err);
      }
    });
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exporting Router
module.exports = router;
