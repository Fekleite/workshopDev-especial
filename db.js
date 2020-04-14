const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database('./ws.db');

db.serialize(function () {
  //criar tabela
  db.run(`
    CREATE TABLE IF NOT EXISTS ideas(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      title TEXT,
      category TEXT,
      description TEXT,
      url TEXT
    );
  `);

  //deletar dados
  /*db.run(`DELETE FROM ideas WHERE id = ?`, [3], function (err) {
    if (err) return console.log(err);

    console.log("Deleted.", this);
  });*/

})

module.exports = db