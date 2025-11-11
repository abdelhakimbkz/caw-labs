const fs = require('fs');

const fileName = process.argv[2];

if (!fileName) {
  console.log("Usage: node ReadFile.js <test.txt>");
  process.exit(1);
}

fs.readFile(fileName, 'utf8', (err, data) => {
  if (err) {
    
    console.error("Erreur in fichier :", err.message);
    process.exit(1);
  }
  console.log(data);
});
