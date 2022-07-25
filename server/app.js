const data = require("./data");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + "/../client"));
const path = require("path");

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
  // res.sendFile(path.resolve("../client/index.html"))
});

app.get("/posts", (req, res) => {
  res.status(200).send(data);
});

app.get("/posts/post", (req, res) => {
  res.status(200).send(data[0].post);
});

app.get("/posts/gifAPI", (req, res) => {
  res.status(200).send(data[0].gifAPI);
});

app.get("/posts/comments/comment", (req, res) => {
  res.status(200).send(data[0].comments[0].comment);
});

app.get("/posts/comments/love", (req, res) => {
  res.status(200).send(data[0].comments[0].love.toString()); // needs .toString() to show
});

app.get("/posts/comments/like", (req, res) => {
  res.status(200).send(data[0].comments[0].like.toString()); // needs .toString() to show
});

app.get("/posts/comments/dontlike", (req, res) => {
  res.status(200).send(data[0].comments[0].dontlike.toString()); // needs .toString() to show
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;

  res.status(200).send(data[id - 1]);
});

app.post("/posts", (req, res) => {
  const newPost = req.body;
  data.push(newPost);

  res.status(201).json({
    success: true,
    posts: newPost,
  });
});

module.exports = app;
