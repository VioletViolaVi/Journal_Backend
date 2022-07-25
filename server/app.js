const data = require("./data");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.get("/students", (req, res) => {
  res.status(200).send(data);
});

app.get("/students/:id", (req, res) => {
  const id = req.params.id;

  res.status(200).send(data[id - 1]);
});

app.post("/students", (req, res) => {
  const newStudent = req.body;
  data.push(newStudent);

  res.status(201).json({
    success: true,
    student: newStudent,
  });
});

module.exports = app;
