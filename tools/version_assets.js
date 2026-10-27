const fs = require('fs');

const files = [
  'index.html',
  'es/index.html',
  'en/index.html',
  'fr/index.html',
  'it/index.html',
  'de/index.html'
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let c = fs.readFileSync(f, 'utf8');

  // Replace main.js with versioned
  c = c.replace(/assets\/js\/main\.js(\?v=[^"']*)?/g, 'assets/js/main.js?v=20261026_02');
  // Replace styles.css with versioned
  c = c.replace(/assets\/css\/styles\.css(\?v=[^"']*)?/g, 'assets/css/styles.css?v=20261026_02');

  fs.writeFileSync(f, c, 'utf8');
  console.log('Updated versioning in', f);
});
