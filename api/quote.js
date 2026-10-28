const fs = require('fs');
const path = require('path');
const { notifyQuote } = require('../lib/mailer');

// Determine data directory (use /tmp on Vercel serverless functions)
const DATA_DIR = process.env.VERCEL
  ? path.join('/tmp', 'data')
  : path.join(__dirname, '..', 'data');

function ensureDir(dir) {
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  } catch (e) {
    // Ignore in read-only environment
  }
}

module.exports = async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método no permitido. Use POST.' });
  }

  try {
    // Body parsing helper (handles both Vercel parsed body and raw buffer/string)
    let data = req.body;
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) {
        return res.status(400).json({ success: false, error: 'Formato JSON inválido.' });
      }
    } else if (Buffer.isBuffer(data)) {
      try {
        data = JSON.parse(data.toString('utf8'));
      } catch (e) {
        return res.status(400).json({ success: false, error: 'Formato JSON inválido.' });
      }
    } else if (!data || typeof data !== 'object') {
      // If req is a stream (e.g. custom node server execution)
      const buffers = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      try {
        data = JSON.parse(Buffer.concat(buffers).toString('utf8') || '{}');
      } catch (e) {
        return res.status(400).json({ success: false, error: 'Formato JSON inválido.' });
      }
    }

    // Validation
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
      return res.status(400).json({
        success: false,
        error: 'Campos requeridos incompletos o inválidos.',
        missingFields: missing
      });
    }

    const quoteRef = `HEX-Q-${Date.now().toString().slice(-6)}`;
    
    // Save file attachments if provided
    const uploadsDir = path.join(DATA_DIR, 'uploads');
    ensureDir(uploadsDir);

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
              diskPath = path.join(uploadsDir, `${quoteRef}_${safeName}`);
              fs.writeFileSync(diskPath, Buffer.from(f.base64, 'base64'));
            } catch (e) {
              diskPath = null;
            }
          }
          savedFiles.push({
            name: f.name || safeName,
            size: f.size || 0,
            type: f.type || 'application/octet-stream',
            savedPath: diskPath ? path.basename(diskPath) : null
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

    // Safely persist to JSON store (local or fallback)
    try {
      ensureDir(DATA_DIR);
      const storeFile = path.join(DATA_DIR, 'quotes.json');
      let records = [];
      if (fs.existsSync(storeFile)) {
        try {
          records = JSON.parse(fs.readFileSync(storeFile, 'utf8'));
        } catch (e) {
          records = [];
        }
      }
      records.push(record);
      fs.writeFileSync(storeFile, JSON.stringify(records, null, 2), 'utf8');
    } catch (fsErr) {
      console.warn('Storage warning (serverless ephemeral):', fsErr.message);
    }

    // Dispatch email / webhook notification
    try {
      const quoteNotificationPayload = {
        ...record,
        data: {
          ...record.data,
          files: data.files // Preserve base64 files for email attachments
        }
      };
      await notifyQuote(quoteNotificationPayload);
    } catch (notifyErr) {
      console.warn('[Notification Error - /api/quote]:', notifyErr.message);
    }

    return res.status(200).json({
      success: true,
      reference: quoteRef,
      message: 'Solicitud de presupuesto registrada correctamente. El equipo técnico de Hexagon analizará su expediente.',
      timestamp: record.timestamp
    });
  } catch (err) {
    console.error('Error handling /api/quote:', err);
    return res.status(500).json({ success: false, error: 'Error interno al procesar la solicitud.' });
  }
};
