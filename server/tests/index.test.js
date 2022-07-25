const { portHost, listenFunc } = require("../index");

describe("Testing Listener", () => {
  test("Test to ensure port is 4000", () => {
    expect(portHost()).toEqual(4000);
  });

  test("Test to ensure correct string is returned", () => {
    expect(listenFunc()).toBe("Listening on port 4000...");
  });
});

describe("Testing to check if is a function", () => {
  test("Check if listener is in a function", () => {
    expect(typeof listenFunc).toBe("function");
  });
});
