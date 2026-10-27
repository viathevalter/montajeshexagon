const fs = require('fs');
const files = ['index.html', 'es/index.html', 'en/index.html', 'fr/index.html', 'it/index.html', 'de/index.html'];
files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  console.log(f, 'has tabindex in viewport:', c.includes('id="sectoresCarouselViewport" tabindex="0"'));
});
