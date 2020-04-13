const express = require("express");

const server = express();

server.use(express.static("public"));

server.get("/", function (req, res) {
  return res.sendFile(__dirname + "/index.html");
});

server.get("/ideas", function (req, res) {
  return res.sendFile(__dirname + "/ideas.html");
});

server.listen(3000);