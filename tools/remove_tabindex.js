const fs = require('fs');
const files = [
  'index.html',
  'es/index.html',
  'en/index.html',
  'fr/index.html',
  'it/index.html',
  'de/index.html',
  'tools/update-sectores-html.js'
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let c = fs.readFileSync(f, 'utf8');
  if (c.includes('id="sectoresCarouselViewport" tabindex="0"')) {
    c = c.replace('id="sectoresCarouselViewport" tabindex="0"', 'id="sectoresCarouselViewport"');
    fs.writeFileSync(f, c, 'utf8');
    console.log('Removed tabindex="0" from', f);
  } else {
    console.log('No tabindex="0" in', f);
  }
});
