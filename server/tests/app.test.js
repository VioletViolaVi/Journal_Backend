const request = require("supertest");
const app = require("../app");

describe("Checks if paths are correct", () => {
  test("Home page has correct path", () => {
    expect("http://localhost:3000/").toContain("/");
  });

  let api;

  beforeAll(() => {
    // start listening to a different server
    api = app.listen(4000);
  });

  // "done" parameter is a callback function, can be used to say "yes it's finished" to be extra safe - this callback function is found in jest
  afterAll((done) => {
    // close down server
    api.close(done);
  });

  it("Responds to a GET request at '/' with a 200 status", (done) => {
    request(api).get("/").expect(200, done);
  });

  it("Responds to a GET request at '/posts' with a 200 status", (done) => {
    request(api).get("/posts").expect(200, done);
  });

  it("Responds to a GET request at '/posts/post' with a 200 status", (done) => {
    request(api).get("/posts/post").expect(200, done);
  });

  it("Responds to a GET request at '/posts/gifAPI' with a 200 status", (done) => {
    request(api).get("/posts/gifAPI").expect(200, done);
  });

  it("Responds to a GET request at '/posts/comments/comment' with a 200 status", (done) => {
    request(api).get("/posts/comments/comment").expect(200, done);
  });

  it("Responds to a GET request at '/posts/comments/love' with a 200 status", (done) => {
    request(api).get("/posts/comments/love").expect(200, done);
  });

  it("Responds to a GET request at '/posts/comments/like' with a 200 status", (done) => {
    request(api).get("/posts/comments/like").expect(200, done);
  });

  it("Responds to a GET request at '/posts/comments/dontlike' with a 200 status", (done) => {
    request(api).get("/posts/comments/dontlike").expect(200, done);
  });
});
