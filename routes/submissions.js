const express = require("express");
const router = express.Router();
const Form = require("../models/Form.js");

const getAllApplicants = router.get(
  "/b3cf9fbf0b931f9bebc5426631559adf91d8a43a/all",
  async () => {
    try {
      const data = await Form.find();
      res.status(200).json(data);
    } catch (error) {
      res.status(401).json(error);
    }
  }
);

module.exports = getAllApplicants;
