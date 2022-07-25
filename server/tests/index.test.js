const each = require("jest-each").default; // to get each to work

const { listener, port } = require("../index");
console.log(listener);

describe("Testing Listener", () => {
  test("Test to ensure port is 3000", () => {
    expect(port).toEqual(3000);
  });
});
