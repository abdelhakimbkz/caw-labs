const fs = require('fs');

const fileName = process.argv[2];
const textParts = process.argv.slice(3);
const text = textParts.join(' ');

if (!fileName || text.trim() === '') {
  console.log('Usage: node exo4.js <nom_fichier> "texte à sauvegarder"');
  process.exit(1);
}

fs.writeFile(fileName, text, (err) => {
  if (err) {
    console.error('Erreur :', err.message);
    process.exit(1);
  }
  console.log('Le fichier a été enregistré !');

  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur  :', err.message);
      process.exit(1);
    }
    console.log('\nContenu du fichier:');
    console.log(data);
  });
});
