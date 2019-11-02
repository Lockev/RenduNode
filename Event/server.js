let http = require("http");
let fs = require("fs");
let url = require('url');
const EventEmitter = require('events')

let App = { // On crée l'objet App avec la méthode start (code répétitif)

    start: function (port) {

        let emitter = new EventEmitter() // On créé un evenement

        let server = http.createServer((request, response) => {

            response.writeHead(200, { // On renvoie un 200 et on affiche le texte en UTF8
                'Content-type': 'text/html; charset=utf-8'
            })

            if (request.url === '/') { // On cherche à savoir si on est à la racine

                emitter.emit('root', response)

            }

            response.end() // On arrete la requete

        }).listen(port) // On créé le serveur sur le port donné

        return emitter

    }

}


let app = App.start(8080); // On lance l'application sur le port 8080

app.on('root', function (response) { // Lorsque l'on charge la page, on check que l'on est à la racine

    response.write('Je suis à la racine')

})

