const reload = require("reload");
const onKill = require("death");
const readline = require("readline");
const express = require("express");

console.log("hello!!!");

const app = express();
const reloadServer = reload(app);
const publicPath = process.argv[2];

app.use(express.static(publicPath, { index: process.argv[3] }));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

rl.on("line", line => {
  if (line.includes("IBAZEL_BUILD_COMPLETED") && line.includes("SUCCESS")) {
    console.log("DevServer Got " + line);
    console.log("DevServer reloading");
    reloadServer.reload();
  }
});

onKill(() => {
  process.exit();
});

const port = 5000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
