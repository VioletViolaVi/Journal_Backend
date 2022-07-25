const app = require("./app");

function portHost() {
  const port = 4000;
  return port;
}

function listenFunc() {
  return app.listen(portHost(), () => {
    return `Listening on port ${portHost()}...`;
  });
}

module.exports = { portHost, listenFunc };
