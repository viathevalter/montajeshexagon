const http = require('http');
const fs = require('fs');
const path = require('path');
const { notifyQuote, notifyCandidate, notifyContact } = require('./lib/mailer');

const PORT = 3000;
const PUBLIC_DIR = __dirname;
const DATA_DIR = process.env.VERCEL ? path.join('/tmp', 'data') : path.join(PUBLIC_DIR, 'data');

try {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
} catch (e) {}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = decodeURIComponent(urlObj.pathname);

  // Preflight CORS
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  // API Endpoints
  if (req.method === 'POST' && pathname === '/api/quote') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 25 * 1024 * 1024) { // 25MB limit
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Payload too large' }));
        req.destroy();
      }
    });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body || '{}');
        // Rigorous validation
        const missing = [];
        if (!data.company || !data.company.trim()) missing.push('company');
        if (!data.name || !data.name.trim()) missing.push('name');
        if (!data.email || !data.email.trim() || !data.email.includes('@')) missing.push('email');
        if (!data.phone || !data.phone.trim()) missing.push('phone');
        if (!data.location || !data.location.trim()) missing.push('location');
        if (!data.service || !data.service.trim()) missing.push('service');
        if (!data.scope || !data.scope.trim()) missing.push('scope');
        if (!data.privacy) missing.push('privacy');

        if (missing.length > 0) {
          sendJson(res, 400, {
            success: false,
            error: 'Campos requeridos incompletos o inválidos.',
            missingFields: missing
          });
          return;
        }

        const quoteRef = `HEX-Q-${Date.now().toString().slice(-6)}`;
        
        // Handle optional file attachments saving
        const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
        if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
        
        const savedFiles = [];
        if (Array.isArray(data.files)) {
          for (const f of data.files) {
            if (typeof f === 'string') {
              savedFiles.push({ name: f, size: 0, status: 'reference_only' });
            } else if (f && typeof f === 'object') {
              const safeName = (f.name || 'attachment').replace(/[^a-zA-Z0-9._-]/g, '_');
              let diskPath = null;
              if (f.base64) {
                try {
                  diskPath = path.join(UPLOADS_DIR, `${quoteRef}_${safeName}`);
                  fs.writeFileSync(diskPath, Buffer.from(f.base64, 'base64'));
                } catch(e) {
                  diskPath = null;
                }
              }
              savedFiles.push({
                name: f.name || safeName,
                size: f.size || 0,
                type: f.type || 'application/octet-stream',
                savedPath: diskPath ? path.relative(PUBLIC_DIR, diskPath) : null
              });
            }
          }
        }

        const record = {
          id: quoteRef,
          type: 'client_quote',
          timestamp: new Date().toISOString(),
          data: {
            company: data.company.trim(),
            name: data.name.trim(),
            email: data.email.trim(),
            phone: data.phone.trim(),
            location: data.location.trim(),
            service: data.service.trim(),
            serviceDetails: data.serviceDetails || null,
            profiles: Array.isArray(data.profiles) ? data.profiles : [],
            profileDetails: Array.isArray(data.profileDetails) ? data.profileDetails : [],
            needGuidance: Boolean(data.needGuidance),
            projectTiming: data.projectTiming || {
              startDate: data.startDate || '',
              startDateTBD: Boolean(data.startDateTBD),
              duration: data.duration || '',
              durationTBD: Boolean(data.durationTBD),
              shifts: data.shifts || '',
              accessConditions: Array.isArray(data.accessConditions) ? data.accessConditions : []
            },
            staff: data.staff || '',
            duration: data.duration || '',
            startDate: data.startDate || '',
            scope: data.scope.trim(),
            files: savedFiles,
            fileCount: savedFiles.length,
            privacyAccepted: true,
            lang: data.lang || 'es'
          }
        };

        const storeFile = path.join(DATA_DIR, 'quotes.json');
        let records = [];
        if (fs.existsSync(storeFile)) {
          try { records = JSON.parse(fs.readFileSync(storeFile, 'utf8')); } catch (e) { records = []; }
        }
        records.push(record);
        fs.writeFileSync(storeFile, JSON.stringify(records, null, 2), 'utf8');

        // Dispatch email / webhook notification
        try {
          await notifyQuote({
            ...record,
            data: {
              ...record.data,
              files: data.files
            }
          });
        } catch (notifyErr) {
          console.warn('[Notification Error - /api/quote]:', notifyErr.message);
        }

        sendJson(res, 200, {
          success: true,
          reference: quoteRef,
          message: 'Solicitud de presupuesto registrada correctamente. El equipo técnico de Hexagon analizará su expediente.',
          timestamp: record.timestamp
        });
      } catch (err) {
        sendJson(res, 400, { success: false, error: 'Formato JSON inválido.' });
      }
    });
    return;
  }

  if (req.method === 'POST' && pathname === '/api/candidate') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 25 * 1024 * 1024) {
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Payload too large' }));
        req.destroy();
      }
    });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body || '{}');
        const missing = [];
        if (!data.name || !data.name.trim()) missing.push('name');
        if (!data.contact || !data.contact.trim()) missing.push('contact');
        if (!data.specialty || !data.specialty.trim()) missing.push('specialty');
        if (!data.residence || !data.residence.trim()) missing.push('residence');
        if (!data.privacy) missing.push('privacy');

        if (missing.length > 0) {
          sendJson(res, 400, {
            success: false,
            error: 'Campos requeridos incompletos.',
            missingFields: missing
          });
          return;
        }

        const candidateRef = `HEX-C-${Date.now().toString().slice(-6)}`;
        const record = {
          id: candidateRef,
          type: 'worker_candidate',
          timestamp: new Date().toISOString(),
          data: {
            name: data.name.trim(),
            contact: data.contact.trim(),
            specialty: data.specialty.trim(),
            residence: data.residence.trim(),
            mobility: data.mobility || 'No especificada',
            experienceSummary: data.experienceSummary || '',
            certifications: data.certifications || '',
            languages: data.languages || '',
            hasCv: !!data.hasCv,
            privacyAccepted: true
          }
        };

        const storeFile = path.join(DATA_DIR, 'candidates.json');
        let records = [];
        if (fs.existsSync(storeFile)) {
          try { records = JSON.parse(fs.readFileSync(storeFile, 'utf8')); } catch (e) { records = []; }
        }
        records.push(record);
        fs.writeFileSync(storeFile, JSON.stringify(records, null, 2), 'utf8');

        // Dispatch email / webhook notification
        try {
          await notifyCandidate(record);
        } catch (notifyErr) {
          console.warn('[Notification Error - /api/candidate]:', notifyErr.message);
        }

        sendJson(res, 200, {
          success: true,
          reference: candidateRef,
          message: 'Candidatura técnica recibida. Tus datos han sido incorporados al departamento de RRHH propio de Hexagon.',
          timestamp: record.timestamp
        });
      } catch (err) {
        sendJson(res, 400, { success: false, error: 'Formato JSON inválido.' });
      }
    });
    return;
  }

  if (req.method === 'POST' && pathname === '/api/contact') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 5 * 1024 * 1024) {
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Payload too large' }));
        req.destroy();
      }
    });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body || '{}');
        const missing = [];
        if (!data.name || !data.name.trim()) missing.push('name');
        if (!data.email || !data.email.trim() || !data.email.includes('@')) missing.push('email');
        if (!data.message || !data.message.trim()) missing.push('message');

        if (missing.length > 0) {
          sendJson(res, 400, {
            success: false,
            error: 'Campos requeridos incompletos.',
            missingFields: missing
          });
          return;
        }

        const contactRef = `HEX-M-${Date.now().toString().slice(-6)}`;
        const record = {
          id: contactRef,
          type: 'contact_message',
          timestamp: new Date().toISOString(),
          data: {
            name: data.name.trim(),
            email: data.email.trim(),
            phone: (data.phone || '').trim(),
            company: (data.company || '').trim(),
            subject: (data.subject || 'Consulta web').trim(),
            message: data.message.trim(),
            privacyAccepted: true
          }
        };

        const storeFile = path.join(DATA_DIR, 'contacts.json');
        let records = [];
        if (fs.existsSync(storeFile)) {
          try { records = JSON.parse(fs.readFileSync(storeFile, 'utf8')); } catch (e) { records = []; }
        }
        records.push(record);
        fs.writeFileSync(storeFile, JSON.stringify(records, null, 2), 'utf8');

        // Dispatch email / webhook notification to info@montajeshexagon.com
        try {
          await notifyContact(record);
        } catch (notifyErr) {
          console.warn('[Notification Error - /api/contact]:', notifyErr.message);
        }

        sendJson(res, 200, {
          success: true,
          reference: contactRef,
          message: 'Mensaje recibido correctamente. El equipo de Hexagon responderá a la brevedad.',
          timestamp: record.timestamp
        });
      } catch (err) {
        sendJson(res, 400, { success: false, error: 'Formato JSON inválido.' });
      }
    });
    return;
  }

  // Static File Serving
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') safePath = '/index.html';
  
  // Clean language paths like /es, /en, /it, /fr, /de
  const langMatch = safePath.match(/^\/(es|en|it|fr|de)$/i);
  if (langMatch) {
    res.writeHead(301, { 'Location': `/${langMatch[1].toLowerCase()}/` });
    res.end();
    return;
  }

  let filePath = path.join(PUBLIC_DIR, safePath);

  // If path is a directory, look for index.html inside it
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    if (!pathname.endsWith('/')) {
      res.writeHead(301, { 'Location': `${pathname}/${urlObj.search}` });
      res.end();
      return;
    }
    const candidateIndex = path.join(filePath, 'index.html');
    if (fs.existsSync(candidateIndex)) {
      filePath = candidateIndex;
    }
  }

  // Universal asset fallback for all language subfolders (/es/, /en/, /it/, /fr/, /de/)
  const langSubMatch = safePath.match(/^\/(es|en|it|fr|de)\/(.+)$/i);
  if (!fs.existsSync(filePath) && langSubMatch) {
    const rootCandidate = path.join(PUBLIC_DIR, langSubMatch[2]);
    if (fs.existsSync(rootCandidate) && fs.statSync(rootCandidate).isFile()) {
      filePath = rootCandidate;
    }
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const stat = fs.statSync(filePath);
    const total = stat.size;
    const range = req.headers.range;

    if (range && (ext === '.mp4' || ext === '.webm' || ext === '.ogv')) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const maxChunk = 5 * 1024 * 1024; // 5MB chunks for smooth responsive playback
      const end = parts[1] ? parseInt(parts[1], 10) : Math.min(start + maxChunk - 1, total - 1);
      const chunkSize = (end - start) + 1;

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${total}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': MIME_TYPES[ext] || 'video/mp4',
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(filePath, { start, end }).pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': total,
        'Accept-Ranges': 'bytes',
        'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      fs.createReadStream(filePath).pipe(res);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<!DOCTYPE html><html><head><meta charset="utf-8"><title>404 — No Encontrado</title><link rel="stylesheet" href="/assets/css/styles.css"></head><body style="padding:4rem;text-align:center;"><h1>404 — Archivo no encontrado</h1><p><a href="/" class="btn btn-primary" style="margin-top:2rem;">Volver al inicio</a></p></body></html>');
  }
});

server.listen(PORT, () => {
  console.log(`Hexagon web server activo en http://localhost:${PORT}`);
});
