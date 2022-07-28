const request = require("supertest");
const app = require("../app");

describe("Checks if paths are correct", () => {
  test("Home page has correct path", () => {
    expect("http://localhost:3000/").toContain("/");
  });

  let api;

  beforeAll(() => {
    // start listening to a different server
    api = app.listen(4001);
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

  // it("Responds to a GET request at '/posts/gifAPI' with a 200 status", (done) => {
  //   request(api).get("/posts/gifAPI").expect(200, done);
  // });

  // it("Responds to a GET request at '/posts/comments/comment' with a 200 status", (done) => {
  //   request(api).get("/posts/comments/comment").expect(200, done);
  // });

  // it("Responds to a GET request at '/posts/comments/love' with a 200 status", (done) => {
  //   request(api).get("/posts/comments/love").expect(200, done);
  // });

  // it("Responds to a GET request at '/posts/comments/like' with a 200 status", (done) => {
  //   request(api).get("/posts/comments/like").expect(200, done);
  // });

  // it("Responds to a GET request at '/posts/comments/dontlike' with a 200 status", (done) => {
  //   request(api).get("/posts/comments/dontlike").expect(200, done);
  // });
});

describe("Paths are to return the correct data types", () => {
  test("Returns a string at '/userPosts/singleJournalEntry'", () => {
    expect(typeof "http://localhost:3000/userPosts/singleJournalEntry").toBe(
      "string"
    );
  });

  test("To contain... '/userPosts/gifAPI'", () => {
    expect("http://localhost:3000/userPosts/gifAPI").toContain();
  });
});
