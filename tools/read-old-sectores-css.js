const fs = require('fs');
const css = fs.readFileSync('assets/css/styles.css', 'utf8');
const lines = css.split('\n');
console.log('Lines 8255 to 8310:');
for (let i = 8255; i <= 8310; i++) {
  console.log(i + ': ' + lines[i-1]);
}
console.log('--- Lines 8610 to 8720 ---');
for (let i = 8610; i <= 8720; i++) {
  if (lines[i-1]) console.log(i + ': ' + lines[i-1]);
}
