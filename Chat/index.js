const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const mysql = require("mysql");

// Logs BDD
const con = mysql.createConnection({
  // LOGS
});

//On se connecte à la BDD, ssi erreur rien ne se lance
con.connect(err => {
  if (err) throw err;
  console.log("Connecté à la base de données !");

  //On redirige directement l'utilisateur vers l'index.html lors d'une connexion
  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

  //Dés qu'un event (message, connexion, déconnexion) a lieu, on envoit le message à tous les clients
  io.emit("some event", { for: "everyone" });

  //Lorsqu'un utilisateur est connecté on attend les events suivants :
  io.on("connection", socket => {
    // console.log("a user connected");
    socket.broadcast.emit("hi");

    //Envoi d'un message
    socket.on("chat message", msg => {
      //On envoit le message à tous les clients
      io.emit("chat message", msg);

      // On l'enregistre dans la base de données
      let date = Date();
      let user_name = "undifined";
      var sql =
        "INSERT INTO NodeMessages (user_name, message, date) VALUES ( " +
        con.escape(user_name) +
        ", " +
        con.escape(msg) +
        ", " +
        con.escape(date) +
        ")";
      con.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Ajout d'un message dans la BDD");
      });
    });

    //Déconnexion de l'utilisateur
    // socket.on("disconnect", () => {
    //   console.log("user disconnected");
    // });
  });

  //On ouvre le projet sur le port 3000
  http.listen(3000, () => {
    console.log("Programme NodeJS ouvert sur le port *:3000");
  });
});
