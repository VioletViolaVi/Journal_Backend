const app = require("./app");

const port = 3000;

const listener = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

module.exports = {
  listener,
  port,
};
