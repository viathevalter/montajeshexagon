const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('id="sectores"') || l.includes('sectores-') || l.includes('refiner') || l.includes('section-sectores')) {
    console.log((i+1) + ': ' + l.trim().substring(0, 100));
  }
});
