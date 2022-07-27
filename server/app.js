const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");

const dataInJsonFile = JSON.parse(fs.readFileSync("data.json"), "utf-8");

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
  res.status(200).json(dataInJsonFile);
});

app.post("/userPosts", (req, res) => {
  console.log(req.body);

  dataInJsonFile.userPostData.push(req.body);

  fs.writeFileSync("data.json", JSON.stringify(dataInJsonFile));

  res.status(200).json({
    success: true,
  });
});

/*
app.get("/userPosts/:id", (req, res) => {
  const id = req.params.id;

  if (parseInt(id) <= 0 || parseInt(id) > data.length) {
    throw `there's no user post at id ${id}`;
  }

  res.status(200).send(data[id - 1].singleJournalEntry);

  // --- error handling for ids ---
  // const userPostToFind = data.filter((userPostObj) => {
  //   return userPostObj.id === parseInt(id); // id would be a string otherwise
  // });

  // // if not present return 404
  // if (!userPostToFind) {
  //   res.status(404).send("this user post could not be found");
  //   return;
  // }

  // // error handling
  // if (userPostToFind.length === 1) {
  //   res.status(200).send(userPostToFind[0]);
  //   return;
  // } else {
  //   res.status(404).send("there's no user post with that id");
  //   return;
  // }
});

app.get("/userPosts/:id/singleJournalEntry", (req, res) => {
  const id = req.params.id;

  if (parseInt(id) <= 0 || parseInt(id) > data.length) {
    throw `there's no single journal entry at id ${id}`;
  }

  res.status(200).send(data[id - 1].singleJournalEntry);
});

app.get("/userPosts/:id/gifAPI", (req, res) => {
  const id = req.params.id;

  if (parseInt(id) <= 0 || parseInt(id) > data.length) {
    throw `there's no gif at id ${id}`;
  }

  res.status(200).send(data[id - 1].gifAPI);
});

app.get("/userPosts/:id/commentsSection", (req, res) => {
  const id = req.params.id;

  if (parseInt(id) <= 0 || parseInt(id) > data.length) {
    throw `there's no comment section at id ${id}`;
  }

  res.status(200).send(data[id - 1].commentsSection);
});

app.get("/userPosts/:id/emojisCount/love", (req, res) => {
  const id = req.params.id;

  if (parseInt(id) <= 0 || parseInt(id) > data.length) {
    throw `there's no love emoji at id ${id}`;
  }

  res.status(200).send(data[id - 1].emojisCount.love.toString()); // needs .toString() to show
});

app.get("/userPosts/:id/emojisCount/like", (req, res) => {
  const id = req.params.id;

  if (parseInt(id) <= 0 || parseInt(id) > data.length) {
    throw `there's no like emoji at id ${id}`;
  }

  res.status(200).send(data[id - 1].emojisCount.like.toString()); // needs .toString() to show
});

app.get("/userPosts/:id/emojisCount/dontlike", (req, res) => {
  const id = req.params.id;

  if (parseInt(id) <= 0 || parseInt(id) > data.length) {
    throw `there's no don't like emoji at id ${id}`;
  }

  res.status(200).send(data[id - 1].emojisCount.dontlike.toString()); // needs .toString() to show
});
*/

module.exports = app;
