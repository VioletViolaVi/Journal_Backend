const data = require("./data"); // aka => userPosts arr
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

/*
app.use(express.static(__dirname + "/../client"));
const path = require("path");
*/

app.get("/", (req, res) => {
  res.status(200).send("User Journal Entries");
  /*
  res.sendFile(path.resolve("../client/index.html")) 
  */
});

app.get("/userPosts", (req, res) => {
  res.status(200).send(data);
});

app.post("/userPosts", (req, res) => {
  const newUserPost = req.body;
  data.push(newUserPost);

  res.status(201).json({
    success: true,
    posts: newUserPost,
  });
});

app.get("/userPosts/:id", (req, res) => {
  const id = req.params.id;

  res.status(200).send(data[id - 1]);
});

app.get("/userPosts/:id/singleJournalEntry", (req, res) => {
  const id = req.params.id;

  res.status(200).send(data[id - 1].singleJournalEntry);
});

app.get("/userPosts/:id/gifAPI", (req, res) => {
  const id = req.params.id;

  res.status(200).send(data[id - 1].gifAPI);
});

app.get("/userPosts/:id/commentsSection", (req, res) => {
  const id = req.params.id;

  res.status(200).send(data[id - 1].commentsSection);
});

app.get("/userPosts/:id/emojisCount/love", (req, res) => {
  const id = req.params.id;

  res.status(200).send(data[id - 1].emojisCount.love.toString()); // needs .toString() to show
});

app.get("/userPosts/:id/emojisCount/like", (req, res) => {
  const id = req.params.id;

  res.status(200).send(data[id - 1].emojisCount.like.toString()); // needs .toString() to show
});

app.get("/userPosts/:id/emojisCount/dontlike", (req, res) => {
  const id = req.params.id;

  res.status(200).send(data[id - 1].emojisCount.dontlike.toString()); // needs .toString() to show
});

module.exports = app;
