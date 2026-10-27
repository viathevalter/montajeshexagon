const fs = require('fs');

['index.html', 'es/index.html'].forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const scripts = c.match(/<script[^>]*>[\s\S]*?<\/script>/gi) || [];
  console.log('=== ' + f + ' ===');
  scripts.forEach(s => {
    const srcMatch = s.match(/src=[\"']([^\"']*)[\"']/);
    if (srcMatch) console.log('Script src:', srcMatch[1]);
    else console.log('Inline script length:', s.length, s.substring(0, 100));
  });
});
