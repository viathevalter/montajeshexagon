const fs = require('fs');
const js = fs.readFileSync('assets/js/main.js', 'utf8');
const lines = js.split('\n');
lines.forEach((l, i) => {
  if (l.includes('sector-card') || l.includes('sectorDescriptionBox') || l.includes('sectores-') || l.includes('sectoresBtnQuote')) {
    console.log((i+1) + ': ' + l.trim());
  }
});
