import readline from "readline";
import express from "express";
import onKill from "death";
import opn from "opn";
import reload from "reload";

const app = express();

const server = app.listen(0, () => {
  const url = `http://localhost:${server.address().port}`;
  console.log(`Dev Server started at ${url}`);
  opn(url);
});

readline
  .createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
  })
  .on("line", (line: string) => {
    console.log("DevServer Got " + line);
    if (line.includes("IBAZEL_BUILD_COMPLETED") && line.includes("SUCCESS")) {
      console.log("DevServer reloading");
    }
  });

onKill(() => {
  process.exit();
});
