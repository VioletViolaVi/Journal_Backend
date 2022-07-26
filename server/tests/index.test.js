const { portHost, listenFunc } = require("../index");

describe("Testing Listener", () => {
  test("Test to ensure port is 3000", () => {
    expect(portHost()).toEqual(3000);
  });

  test("Test to ensure correct [object Object] is returned", () => {
    expect(listenFunc().toString()).toBe("[object Object]");
  });

  test("Test to ensure correct string is returned", () => {
    expect(`Listening on port ${portHost()}...`).toBe(
      "Listening on port 3000..."
    );
  });
});

describe("Testing to check if is a function", () => {
  test("Check if portHost() is in a function", () => {
    expect(typeof portHost).toBe("function");
  });

  test("Check if listenFunc() is in a function", () => {
    expect(typeof listenFunc).toBe("function");
  });
});
