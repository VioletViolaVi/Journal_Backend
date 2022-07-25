const app = require("./app");

function portHost() {
  const port = 4000;
  return port;
}

function listenFunc() {
  const listener = app.listen(portHost(), () => {
    return `Listening on port ${portHost()}...`;
  });

  return listener;
}
// console.log("listenFunc() ==>", listenFunc());

module.exports = { portHost, listenFunc };
