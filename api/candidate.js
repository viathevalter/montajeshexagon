const fs = require('fs');
const path = require('path');
const { notifyCandidate } = require('../lib/mailer');

const DATA_DIR = process.env.VERCEL
  ? path.join('/tmp', 'data')
  : path.join(__dirname, '..', 'data');

function ensureDir(dir) {
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  } catch (e) {}
}

module.exports = async function handler(req, res) {
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

    const missing = [];
    if (!data.name || !data.name.trim()) missing.push('name');
    if (!data.contact || !data.contact.trim()) missing.push('contact');
    if (!data.specialty || !data.specialty.trim()) missing.push('specialty');
    if (!data.residence || !data.residence.trim()) missing.push('residence');
    if (!data.privacy) missing.push('privacy');

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Campos requeridos incompletos.',
        missingFields: missing
      });
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
        hasCv: Boolean(data.hasCv),
        privacyAccepted: true
      }
    };

    // Safely persist to JSON store (local or fallback)
    try {
      ensureDir(DATA_DIR);
      const storeFile = path.join(DATA_DIR, 'candidates.json');
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
      await notifyCandidate(record);
    } catch (notifyErr) {
      console.warn('[Notification Error - /api/candidate]:', notifyErr.message);
    }

    return res.status(200).json({
      success: true,
      reference: candidateRef,
      message: 'Candidatura técnica recibida. Tus datos han sido incorporados al departamento de RRHH propio de Hexagon.',
      timestamp: record.timestamp
    });
  } catch (err) {
    console.error('Error handling /api/candidate:', err);
    return res.status(500).json({ success: false, error: 'Error interno al procesar la solicitud.' });
  }
};
