const opn = require("opn");
const reload = require("reload");
const onKill = require("death");
const readline = require("readline");
const express = require("express");

const app = express();
const reloadServer = reload(app);

app
  .use(
    require("connect-body-rewrite")({
      accept(res) {
        return res.getHeader("content-type").match(/text\/html/);
      },
      rewrite(body) {
        return body.replace(/<\/head>/, '<script src="/reload/reload.js"></script>');
      }
    })
  )
  .use(express.static(process.argv[2], { index: process.argv[3] }));

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
  .on("line", line => {
    if (line.includes("IBAZEL_BUILD_COMPLETED") && line.includes("SUCCESS")) {
      console.log("DevServer Got " + line);
      console.log("DevServer reloading");
      reloadServer.reload();
    }
  });

onKill(() => {
  process.exit();
});
