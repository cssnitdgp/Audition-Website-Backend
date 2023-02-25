// Import Statements
const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
// const logging = require("./middlewares/logging");

// Creating Express App
const app = express();

// Middlewares
app.use(express.json());
// app.use(logging);
app.use(
  cors({
    origin: "*",
  })
);

// PARSE application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// PARSE application/json
app.use(bodyParser.json());

// Routes
app.use("/api/form", require("./routes/form"));

// Basic or Home Route
app.get("/", (req, res) => {
  // Sending Response
  return res.send({
    server: "CSS Audition Backend",
    status: "Online",
    host: req.headers.host,
  });
});

// Defining Server Port
const PORT = process.env.PORT || 8000;

// Establishing Database Connection
require("./config/db.js");

// Creating Server
const SERVER = http.createServer(app);

// Listening to Server
app.listen(PORT, () => {
  console.log(`Server is up and running at PORT : ${PORT}`);
});

// Exporting Server for index.js
module.exports = SERVER;
