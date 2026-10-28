const fs = require('fs');
const path = require('path');
const { notifyContact } = require('../lib/mailer');

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
    if (!data.email || !data.email.trim() || !data.email.includes('@')) missing.push('email');
    if (!data.message || !data.message.trim()) missing.push('message');

    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Campos requeridos incompletos.',
        missingFields: missing
      });
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
        subject: (data.subject || 'Consulta desde la web').trim(),
        message: data.message.trim(),
        privacyAccepted: true
      }
    };

    // Safely persist to JSON store (local or fallback)
    try {
      ensureDir(DATA_DIR);
      const storeFile = path.join(DATA_DIR, 'contacts.json');
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

    // Dispatch email / webhook notification to info@montajeshexagon.com
    try {
      await notifyContact(record);
    } catch (notifyErr) {
      console.warn('[Notification Error - /api/contact]:', notifyErr.message);
    }

    return res.status(200).json({
      success: true,
      reference: contactRef,
      message: 'Mensaje recibido correctamente. El equipo de Hexagon responderá a la brevedad.',
      timestamp: record.timestamp
    });
  } catch (err) {
    console.error('Error handling /api/contact:', err);
    return res.status(500).json({ success: false, error: 'Error interno al procesar el mensaje.' });
  }
};
