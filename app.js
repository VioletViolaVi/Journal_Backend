const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const fsPromises = require("fs").promises;
const dataInJsonFile = JSON.parse(fs.readFileSync("data.json"), "utf-8");

app.use(cors());
app.use(express.json()); // this is middleware needed for post request & to read req.body

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

app.get("/userPosts/singleJournalEntry", (req, res) => {
  res.status(200).json(dataInJsonFile.userPostData[0].singleJournalEntry);
});

// the following routes make put requests using input entered by user in the journal blog website:

// :loves
app.put("/userPosts/updateLoves", (req, res) => {
  let fromUser = req.body.emojisCount.love; // from user
  console.log(fromUser);

  async function updateLovesInFile(lovesParam) {
    try {
      // read file 1st
      let dataFromJsonFile = await fsPromises.readFile("data.json");
      // parse so it's readable
      let obj = JSON.parse(dataFromJsonFile);

      // set love property in the obj that you are trying to change
      obj.userPostData[0].emojisCount.love = lovesParam;

      // write file using what was read & the reassigned value
      await fsPromises.writeFile("data.json", JSON.stringify(obj));
    } catch (e) {
      // error handling here
      console.log(e);
    }
  }
  updateLovesInFile(fromUser);

  res.status(200).json({
    success: true,
  });
});

// :likes
app.put("/userPosts/updateLikes", (req, res) => {
  let fromUser = req.body.emojisCount.like; // from user

  async function updateLikesInFile(likesParam) {
    try {
      // read file 1st
      let dataFromJsonFile = await fsPromises.readFile("data.json");
      // parse so it's readable
      let obj = JSON.parse(dataFromJsonFile);

      // set like property in the obj that you are trying to change
      obj.userPostData[0].emojisCount.like = likesParam;

      // write file using what was read & the reassigned value
      await fsPromises.writeFile("data.json", JSON.stringify(obj));
    } catch (e) {
      // error handling here
      console.log(e);
    }
  }
  updateLikesInFile(fromUser);

  res.status(200).json({
    success: true,
  });
});

// :dislike
app.put("/userPosts/updateDislike", (req, res) => {
  let fromUser = req.body.emojisCount.dontlike; // from user

  async function updateDislikesInFile(dislikesParam) {
    try {
      // read file 1st
      let dataFromJsonFile = await fsPromises.readFile("data.json");
      // parse so it's readable
      let obj = JSON.parse(dataFromJsonFile);

      // set like property in the obj that you are trying to change
      obj.userPostData[0].emojisCount.dontlike = dislikesParam;

      // write file using what was read & the reassigned value
      await fsPromises.writeFile("data.json", JSON.stringify(obj));
    } catch (e) {
      // error handling here
      console.log(e);
    }
  }
  updateDislikesInFile(fromUser);

  res.status(200).json({
    success: true,
  });
});

module.exports = app;
