const fs = require('fs');
const css = fs.readFileSync('assets/css/styles.css', 'utf8');
const lines = css.split('\n');
lines.forEach((l, i) => {
  if (l.includes('section-sectores-industriales') || l.includes('sectores-bg-refinery')) {
    console.log((i+1) + ': ' + l);
  }
});
