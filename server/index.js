const app = require("./app");

function portHost() {
  const port = 4000 || process.env.PORT;
  return port;
}

function listenFunc() {
  return app.listen(portHost(), () => {
    return `Listening on port ${portHost()}...`;
  });
}
listenFunc();

module.exports = { portHost, listenFunc };
