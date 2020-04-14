const express = require("express");
const nunjucks = require("nunjucks");

const db = require("./db");

const server = express();

server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));

nunjucks.configure("views", {
  express: server,
  noCache: true, // não usar cache apenas em tempo de desenvolvimento
});

server.get("/", function (req, res) {

  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) {
      console.log(err);
      return res.send("Database error");
    };

    const reversedIdeas = [...rows].reverse();

    let lastIdeas = [];

    for (let idea of reversedIdeas) {
      if (lastIdeas.length < 2) {
        lastIdeas.push(idea);
      }
    }

    return res.render("index.html", { ideas: lastIdeas });
  });

});

server.get("/ideas", function (req, res) {

  db.all(`SELECT * FROM ideas`, function (err, rows) {
    if (err) {
      console.log(err);
      return res.send("Database error");
    };

    const reversedIdeas = [...rows].reverse();

    return res.render("ideas.html", { ideas: reversedIdeas });
  });

});

server.post("/", function (req, res) {
  const query = `
    INSERT INTO ideas(
      image,
      title,
      category,
      description,
      url
    ) 
    VALUES(?,?,?,?,?);
  `

  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.url,
  ]

  db.run(query, values, function (err) {
    if (err) {
      console.log(err);
      return res.send("Database error");
    };

    return res.redirect("/ideas");
  });

});

server.listen(3000);