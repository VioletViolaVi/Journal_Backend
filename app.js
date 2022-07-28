const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const fsPromises = require("fs").promises;
const dataInJsonFile = JSON.parse(fs.readFileSync("data.json"), "utf-8");

app.use(cors());
app.use(express.json()); // this is middleware needed for post request & to read req.body

app.get("/", (req, res) => {
  res.status(200).send("User Journal Entries");
});

app.get("/userPosts", (req, res) => {
  res.status(200).json(dataInJsonFile);
});

app.post("/userPosts", (req, res) => {
  dataInJsonFile.userPostData.push(req.body);

  let idCounter = 0;

  dataInJsonFile.userPostData.forEach((singleObjInArr) => {
    singleObjInArr.id = idCounter += 1;
  });

  fs.writeFileSync("data.json", JSON.stringify(dataInJsonFile));

  res.status(200).json({
    success: true,
  });
});

/* the following routes make put requests using input entered by user in the journal blog website: */

// :loves
app.put("/userPosts/updateLoves", (req, res) => {
  let fromUser = req.body.emojisCount.love; // from user

  async function updateLovesInFile(lovesParam) {
    try {
      // read file 1st
      let dataFromJsonFile = await fsPromises.readFile("data.json");
      // parse so it's readable i.e {userPostData[{singleJournalEntry:""...}]} etc.
      let obj = JSON.parse(dataFromJsonFile);

      // finds correct obj to update using its obj id
      const userPostArr = obj.userPostData;
      const userPostToFind = userPostArr.find((singleUserPostObj) => {
        return singleUserPostObj.id === parseInt(req.body.id);
      });

      // set love property in the obj that you are trying to change
      userPostToFind.emojisCount.love = lovesParam;

      // write file using what was read & the reassigned value
      await fsPromises.writeFile("data.json", JSON.stringify(obj));
    } catch (e) {
      // error handling here
      console.log(e);
    }
  }
  updateLovesInFile(fromUser);
  console.log("happy: =>", happy);

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

      // finds correct obj to update using its obj id
      const userPostArr = obj.userPostData;
      const userPostToFind = userPostArr.find((singleUserPostObj) => {
        return singleUserPostObj.id === parseInt(req.body.id);
      });

      // set like property in the obj that you are trying to change
      userPostToFind.emojisCount.like = likesParam;

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

      // finds correct obj to update using its obj id
      const userPostArr = obj.userPostData;
      const userPostToFind = userPostArr.find((singleUserPostObj) => {
        return singleUserPostObj.id === parseInt(req.body.id);
      });

      // set like property in the obj that you are trying to change
      userPostToFind.emojisCount.dontlike = dislikesParam;

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

app.get("/userPosts/singleJournalEntry", (req, res) => {
  res.status(200).json(dataInJsonFile.userPostData[0].singleJournalEntry);
});

module.exports = app;
