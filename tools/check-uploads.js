const fs = require('fs');
const path = require('path');
const artDir = 'C:\\Users\\Luccas\\.gemini\\antigravity\\brain\\2fa8cfac-6a9d-4101-ad8e-7e6faae6d642\\.user_uploaded';

const files = fs.readdirSync(artDir);
for (const f of files) {
  const full = path.join(artDir, f);
  const stat = fs.statSync(full);
  console.log(f, (stat.size / 1024).toFixed(1) + ' KB');
}
