const { port } = require("../index");

describe("Testing Listener", () => {
  test("Test to ensure port is 3000", () => {
    expect(port).toEqual(3000);
  });
});
