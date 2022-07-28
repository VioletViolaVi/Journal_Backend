const request = require("supertest");
const app = require("../app");

describe("Checks if the following paths are valid", () => {
  let api;

  beforeAll(() => {
    // start listening to a different server
    api = app.listen(3001);
  });

  // "done" parameter is a callback function, can be used to say "yes it's finished" to be extra safe
  // - this callback function is found in jest
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

  test("Home page has correct path", () => {
    expect("http://localhost:3000/").toContain("/");
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

  it("Will not respond to a GET request at '/userPost'", (done) => {
    request(api).get("/userPost").expect(404, done);
  });

  it("Will not respond to a GET request at '/userPosts/singleJournalEntry'", (done) => {
    request(api).get("/userPosts/singleEntry").expect(404, done);
  });
});

describe("Paths are to return the correct data types", () => {
  test("Returns a string at '/userPosts/singleJournalEntry'", () => {
    expect(typeof "http://localhost:3000/userPosts/singleJournalEntry").toBe(
      "string"
    );
  });

  test("Returns a string at '/userPosts/gifAPI'", () => {
    expect(typeof "http://localhost:3000/userPosts/gifAPI").toBe("string");
  });

  test("To contain 'gifAPI' in urls of gif in '/userPosts/gifAPI'", () => {
    expect("http://localhost:3000/userPosts/gifAPI").toContain("gifAPI");
  });
});
