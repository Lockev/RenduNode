const express = require("express");
const path = require("path");
// const http = require("http");
const bodyParser = require("body-parser");
// const fs = require("fs");
// const url = require("url");
const mysql = require("mysql");

// Logs
const con = mysql.createConnection({
// LOGS
});

// Quick start express
const app = express();

// On affiche index.html lors d'une connexion
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

//Récupère les données de la page linked
app.use(bodyParser.urlencoded({ extended: true }));

// Transforme les données en Json
app.use(bodyParser.json());

// On récupère les données du formulaire
app.post("/insert", (req, res) => {
  res.send(req.body);
});

// On lance l'application sur le port 3000
app.listen(3000, function() {
  console.log("L'application tourne sur le port 3000 !");
});
