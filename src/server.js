const http = require("http");
const express = require("express");

const app = express();
app.use(express.json());

// default URL to API
app.use("/", function (req, res) {
  res.send("CRUD-API works :-)");
});

const server = http.createServer(app);
const port = 4000;
server.listen(port);

console.debug("Server listening on port " + port);