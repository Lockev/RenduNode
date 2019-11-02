const express = require("express");
const path = require("path");
const mysql = require("mysql");
const http = require("http");
const fs = require("fs");
const url = require("url");

// Logs
const con = mysql.createConnection({
  host: "mysql-lockev.alwaysdata.net",
  database: "lockev_web",
  user: "lockev",
  password: "Lockevweb9"
});

// Quick start express
const app = express();

// Check que la connection à la base de donnée est bien établie
con.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données !");

  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  // On récupère le path :
  // ssi 1 pallier
  app.get("/:table", (req, res) => {
    let table = req.params.table;
    con.query("SELECT * FROM " + table, (err, result, fields) => {
      if (err) throw err;
      res.json(result);
    });
  });

  // ssi 2 palliers
  app.get("/:table/:id", (req, res) => {
    let table = req.params.table;
    let id = req.params.id;
    con.query(
      "SELECT * FROM " + table + " WHERE id = " + id,
      (err, result, fields) => {
        if (err) throw err;
        res.send(result);
      }
    );
  });

  // ssi 2+ palliers
  app.get("/:table/:id/*", (req, res) => {
    let table = req.params.table;
    let id = req.params.id;
    res.send(table + " puis " + id);
  });
});

app.listen(3000, function() {
  console.log("L'application tourne sur le port 3000 !");
});
