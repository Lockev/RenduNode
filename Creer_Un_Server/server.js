let http = require("http");
let fs = require("fs");
let url = require('url')

let server = http.createServer();

server.on("request", (request, response) => { // On créé un server lors de la connexion.

    response.writeHead(200)

    let query = url.parse(request.url, true).query // On stocke dans query toute les infos parsées de l'URL

    let name = query.name === undefined ? 'anonyme' : query.name // On définie la variable name obtenue dans le parse de L'URL. Si name est undifined alors name = anonyme

    fs.readFile('index.html', 'utf8', (err, data) => { // On essaye de lire le fichier index.html et on stocke ses infos dans data (en utf8)

        if (err) { // Si il y a une erreur alors on renvoie un 404 

            response.writeHead(404)
            response.end("Ce fichier n'existe pas")

        }

        response.writeHead(200, { // Le fichier est trouvé, alors on renvoie un 200 et on affiche son contenu en UTF8
            'Content-type': 'text/html; charset=utf-8'
        })

        data = data.replace('{{ name }}', name) // On remplace dans data la séquence {{ name }} par le nom de la personne

        response.end(data) // On arrête la connexion entre le serveur et le navigateur client

    });


});

server.listen(8080);
