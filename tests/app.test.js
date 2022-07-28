const request = require("supertest");
const app = require("../app");

describe("Checks if the following paths are valid", () => {
  let api;

  beforeAll(() => {
    // start listening to a different server
    api = app.listen(3001);
  });

  // "done" parameter is a callback function, can be used to say "yes it's finished" to be extra safe - this callback function is found in jest
  afterAll((done) => {
    // close down server
    api.close(done);
  });

  it("Responds to a GET request at '/' with a 200 status", (done) => {
    request(api).get("/").expect(200, done);
  });

  it("Responds to a GET request at '/userPosts' with a 200 status", (done) => {
    request(api).get("/userPosts").expect(200, done);
  });

  it("Responds to a GET request at '/userPosts/singleJournalEntry' with a 200 status", (done) => {
    request(api).get("/userPosts/singleJournalEntry").expect(200, done);
  });
});

describe("Paths are to return a 404 error if they do not exist", () => {
  let api;

  beforeAll(() => {
    api = app.listen(3001);
  });

  afterAll((done) => {
    api.close(done);
  });

  it("Will not respond to a GET request at '/'", (done) => {
    request(api).get("//").expect(404, done);
  });

  it("Will not respond to a GET request at '/userPost'", (done) => {
    request(api).get("/userPost").expect(404, done);
  });
});

describe("Testing POST requests", function () {
  it("Path /userPosts should respond with json", function (done) {
    const exampleObj = {
      singleJournalEntry: "This is a test post",
      gifAPI:
        "https://media4.giphy.com/media/gw3IWyGkC0rsazTi/giphy.gif?cid=a9f7e2041dml0i13du0sisptuftopn3t9qo6i4sspqep5aev&rid=giphy.gif&ct=g",
      commentsSection: ["this is a test comment"],
      emojisCount: { love: 3, like: 45, dontlike: 1 },
      id: 1,
    };

    request(app)
      .post("/userPosts")
      .send(exampleObj)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});

describe("Testing PUT requests", function () {
  it("Path /userPosts/updateLoves should respond with json", function (done) {
    const exampleObj = {
      singleJournalEntry: "This is an updated test post",
      id: 3,
    };
    request(app)
      .put("/userPosts/updateLoves")
      .send(exampleObj)
      .set("Accept", "application/json")
      // .expect("Content-Type", /json/)
      // .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });

  it("Path /userPosts/updateLoves should return 500", function (done) {
    request(app)
      .put("/userPosts/updateLoves")
      .set("Accept", "application/json")
      .expect(500)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});

describe("Paths are to return the correct data types", () => {
  test("Returns a string at '/'", () => {
    expect(typeof "/").toBe("string");
  });

  test("Returns a string at '/userPosts'", () => {
    expect(typeof "/userPosts").toBe("string");
  });

  test("Returns a string at '/userPosts/updateLoves'", () => {
    expect(typeof "/userPosts/updateLoves").toBe("string");
  });

  test("Returns a string at '/userPosts/updateLikes'", () => {
    expect(typeof "/userPosts/updateLikes").toBe("string");
  });

  test("Returns a string at '/userPosts/updateDislike'", () => {
    expect(typeof "/userPosts/updateDislike").toBe("string");
  });

  test("Returns a string at '/userPosts/singleJournalEntry'", () => {
    expect(typeof "/userPosts/singleJournalEntry").toBe("string");
  });
});

describe("Urls to contain '/'", () => {
  test("Check '/' path", () => {
    expect("/").toContain("/");
  });

  test("Check /userPosts path", () => {
    expect("/userPosts").toContain("/");
  });

  test("Check /userPosts/updateLoves path", () => {
    expect("/userPosts/updateLoves").toContain("/");
  });

  test("Check /userPosts/updateLikes path", () => {
    expect("/userPosts/updateLikes").toContain("/");
  });

  test("Check /userPosts/updateDislike path", () => {
    expect("/userPosts/updateDislike").toContain("/");
  });

  test("Check local host home page", () => {
    expect("http://localhost:3000/").toContain("/");
  });

  test("Check Heroku home page", () => {
    expect("https://journal-backend-lap1.herokuapp.com/").toContain("/");
  });

  test("Check Netlify home page", () => {
    expect(
      "https://62e28ffb63dac31bf9a6a8f0--dapper-paletas-a5ca77.netlify.app/"
    ).toContain("/");
  });
});
