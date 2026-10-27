const fs = require('fs');
const files = ['index.html', 'es/index.html', 'en/index.html', 'fr/index.html', 'it/index.html', 'de/index.html'];
files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const m = c.match(/(href|src)=["']\/assets\/[^"']*["']/g);
  console.log(f, 'leading slash /assets/ count:', m ? m.length : 0);
  if (m) console.log(m.slice(0, 3));
});
