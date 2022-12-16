const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

var expressWs = require("express-ws")(app);

const connected = new Set();

const start = (connected, ws, name) => {};

app.ws("/connect", (ws, req) => {
  ws.on("message", (msg) => {
    const { name } = JSON.parse(msg);
    if (name) {
      connected.add(name);
      console.log(`${name} is connected`);

      setInterval(() => {
        ws.send(
          `<div id="pong">hi ${name}. there are currently ${connected.size - 1} other kodok acimalakaing with you</div>`
        );
      }, 1000);

      ws.on("close", () => {
        connected.delete(name);
      });
    }
  });
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/connect", (req, res) => {
  res.sendFile(path.join(__dirname, "connect.html"));
});

app.listen(port, () => {
  console.log(`Acimalaka listening on port ${port}`);
});

setInterval(() => {
  console.log("There are currently " + connected.size + " kodok acimalakaing with you.");
}, 5000);
