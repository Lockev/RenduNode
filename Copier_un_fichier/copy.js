const fs = require("fs");

//  Cette méthode lit tout le fichier à copier, le stocke en mémoire, puis le copie. Risque de plantage.

// fs.readFile("BonToutou.png", (err, data) => {
//   if (err) throw err;
//   fs.writeFile("copy.png", data, err => {
//     if (err) throw err;
//     console.log("Le fichier a bien été copié");
//   });
// });



// Nous allons alors utiliser un flux de stream

let file = "BonToutou.png";

let read = fs.createReadStream(file);

fs.stat(file, (err, stat) => {
  // On veut connaître la taille totale du fichier
  let total = stat.size;

  let progress = 0;

  let write = fs.createWriteStream("copy.png");

  // On découpe le fichier en plusieurs petits morceaux
  read.on("data", chunk => {
    // On comptabilise l'avancement actuel de la copie
    progress += chunk.length;
    console.log(
      "J'ai lu " + Math.round((100 * progress) / total) + " % du fichier."
    );
  });

  // On affiche dans la console que le fichier a fini d'être lu
  //   read.on("end", () => {
  //     console.log("J'ai fini de lire le fichier.");
  //   });

  // On utilise la méthode de pipe pour vérifier que la lecture ne va pas trop vite par rapport à l'écriture. (Pause comme vitesse)
  read.pipe(write);

  // On callback lorsque la copie est terminée.
  write.on("finish", () => {
    console.log("Le fichier a été copié avec succès.");
  });
});
