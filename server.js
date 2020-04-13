const express = require("express");
const nunjucks = require("nunjucks");

const server = express();

const ideas = [
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    title: "Cursos de Programação",
    category: "Estudo",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, veritatis in qui ipsa porro hic corrupti!",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
    title: "Exercícios",
    category: "Saúde",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, veritatis in qui ipsa porro hic corrupti!",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
    title: "Meditação",
    category: "Mentalidade",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, veritatis in qui ipsa porro hic corrupti!",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
    title: "Karaoke",
    category: "Diversão em Fámilia",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, veritatis in qui ipsa porro hic corrupti!",
    url: "https://rocketseat.com.br"
  }
];

server.use(express.static("public"));

nunjucks.configure("views", {
  express: server,
  noCache: true, // não usar cache apenas em tempo de desenvolvimento
});

server.get("/", function (req, res) {
  const reversedIdeas = [...ideas].reverse();

  let lastIdeas = [];

  for (let idea of reversedIdeas) {
    if (lastIdeas.length < 2) {
      lastIdeas.push(idea);
    }
  }

  return res.render("index.html", { ideas: lastIdeas });
});

server.get("/ideas", function (req, res) {
  const reversedIdeas = [...ideas].reverse();

  return res.render("ideas.html", { ideas: reversedIdeas });
});

server.listen(3000);