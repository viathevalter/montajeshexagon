const fs = require('fs');
const path = require('path');

const dirs = ['assets/images/industrial', 'assets/images/services'];
for (const d of dirs) {
  const files = fs.readdirSync(d);
  for (const f of files) {
    if (f.endsWith('.jpg') || f.endsWith('.png')) {
      const full = path.join(d, f);
      const stat = fs.statSync(full);
      console.log(full, (stat.size / 1024).toFixed(0) + 'KB');
    }
  }
}
