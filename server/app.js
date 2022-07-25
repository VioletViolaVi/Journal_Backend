const data = require("./data");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// app.use(express.static(__dirname + "/../client"));
// const path = require("path");

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
  // res.sendFile(path.resolve("../client/index.html"))
});

app.get("/posts", (req, res) => {
  res.status(200).send(data);
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;

  res.status(200).send(data[id - 1]);
});

app.get("/post/:id", (req, res) => {
  res.status(200).send(data[0].post);
});

app.get("/posts/:id/gifAPI", (req, res) => {
  res.status(200).send(data[0].gifAPI); // not working
});

app.get("/posts/comments", (req, res) => {
  res.status(200).send(data[0].comments);
});

app.get("/posts/:id/emojis/love", (req, res) => {
  res.status(200).send(data[0].emojis.love.toString()); // needs .toString() to show
});

app.get("/posts/:id/emojis/like", (req, res) => {
  res.status(200).send(data[0].emojis.like.toString()); // needs .toString() to show
});

app.get("/posts/:id/emojis/dontlike", (req, res) => {
  res.status(200).send(data[0].emojis.dontlike.toString()); // needs .toString() to show
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
