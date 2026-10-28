/**
 * Hexagon Montajes Industriales — Notification & Email Dispatch Service
 * 
 * Supports:
 * 1. SMTP via Nodemailer (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, NOTIFICATION_EMAIL)
 * 2. Resend REST API (RESEND_API_KEY, EMAIL_FROM, NOTIFICATION_EMAIL)
 * 3. Incoming Webhook (WEBHOOK_URL - Slack, Discord, Zapier, Make, CRM)
 * 
 * Designed for serverless environments (Vercel) where local disk storage is ephemeral.
 */

const nodemailer = require('nodemailer');

// Configuration helpers
function getConfig() {
  const smtpHost = process.env.SMTP_HOST || '';
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;
  const smtpUser = process.env.SMTP_USER || '';
  const smtpPass = process.env.SMTP_PASS || '';

  const resendApiKey = process.env.RESEND_API_KEY || '';
  const webhookUrl = process.env.WEBHOOK_URL || '';

  const defaultRecipient = 'info@montajeshexagon.com';
  const toEmail = process.env.NOTIFICATION_EMAIL || process.env.EMAIL_TO || defaultRecipient;
  const fromEmail = process.env.SMTP_FROM || process.env.EMAIL_FROM || (smtpUser ? `"Hexagon Montajes" <${smtpUser}>` : '"Hexagon Montajes" <info@montajeshexagon.com>');

  const isConfigured = Boolean((smtpHost && smtpUser) || resendApiKey || webhookUrl);

  return {
    smtp: {
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      user: smtpUser,
      pass: smtpPass,
      isAvailable: Boolean(smtpHost && smtpUser && smtpPass)
    },
    resend: {
      apiKey: resendApiKey,
      isAvailable: Boolean(resendApiKey)
    },
    webhook: {
      url: webhookUrl,
      isAvailable: Boolean(webhookUrl)
    },
    toEmail,
    fromEmail,
    isConfigured
  };
}

/**
 * Send an email using SMTP (Nodemailer)
 */
async function sendViaSmtp(config, { subject, text, html, attachments }) {
  const transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    secure: config.smtp.secure,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: config.fromEmail,
    to: config.toEmail,
    subject,
    text,
    html,
    attachments: attachments || []
  };

  const info = await transporter.sendMail(mailOptions);
  return { success: true, messageId: info.messageId, provider: 'smtp' };
}

/**
 * Send an email using Resend HTTP REST API (Node 18+ native fetch)
 */
async function sendViaResend(config, { subject, text, html, rawAttachments }) {
  const recipients = config.toEmail.split(',').map(s => s.trim()).filter(Boolean);
  
  const payload = {
    from: config.fromEmail.includes('<') ? config.fromEmail : `Hexagon Montajes <${config.fromEmail}>`,
    to: recipients,
    subject,
    text,
    html
  };

  if (Array.isArray(rawAttachments) && rawAttachments.length > 0) {
    payload.attachments = rawAttachments.map(att => ({
      filename: att.name || 'archivo',
      content: att.base64
    })).filter(a => a.content);
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.resend.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Resend API HTTP ${res.status}: ${errorBody}`);
  }

  const data = await res.json();
  return { success: true, messageId: data.id, provider: 'resend' };
}

/**
 * Send a notification to a Webhook URL (Slack / Discord / CRM / Zapier)
 */
async function sendViaWebhook(config, { subject, text, data }) {
  // Support Slack/Discord block style or generic JSON
  let bodyPayload;
  if (config.webhook.url.includes('discord.com')) {
    bodyPayload = {
      username: 'Hexagon Montajes Bot',
      content: `**${subject}**\n\`\`\`\n${text}\n\`\`\``
    };
  } else if (config.webhook.url.includes('slack.com')) {
    bodyPayload = {
      text: `*${subject}*\n${text}`
    };
  } else {
    bodyPayload = {
      subject,
      text,
      data,
      timestamp: new Date().toISOString()
    };
  }

  const res = await fetch(config.webhook.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyPayload)
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Webhook HTTP ${res.status}: ${errorBody}`);
  }

  return { success: true, provider: 'webhook' };
}

/**
 * Dispatch message through available channels
 */
async function dispatchMessage({ subject, text, html, attachments, rawAttachments, data }) {
  const config = getConfig();
  const results = [];

  if (!config.isConfigured) {
    console.warn(
      '[Hexagon Dispatcher] No notification provider configured. ' +
      'To receive form submissions in production, configure SMTP (SMTP_HOST, SMTP_USER, SMTP_PASS), ' +
      'Resend (RESEND_API_KEY), or Webhook (WEBHOOK_URL) in Vercel Environment Variables.'
    );
    return {
      success: false,
      dispatched: false,
      reason: 'no_provider_configured'
    };
  }

  // 1. Try SMTP if configured
  if (config.smtp.isAvailable) {
    try {
      const res = await sendViaSmtp(config, { subject, text, html, attachments });
      results.push(res);
      console.log(`[Hexagon Dispatcher] Email sent via SMTP (${config.smtp.host}) for: ${subject}`);
    } catch (err) {
      console.error('[Hexagon Dispatcher] SMTP dispatch failed:', err.message);
    }
  }

  // 2. Try Resend if configured (as primary or secondary)
  if (config.resend.isAvailable && results.length === 0) {
    try {
      const res = await sendViaResend(config, { subject, text, html, rawAttachments });
      results.push(res);
      console.log(`[Hexagon Dispatcher] Email sent via Resend for: ${subject}`);
    } catch (err) {
      console.error('[Hexagon Dispatcher] Resend dispatch failed:', err.message);
    }
  }

  // 3. Webhook (can run alongside email)
  if (config.webhook.isAvailable) {
    try {
      const res = await sendViaWebhook(config, { subject, text, data });
      results.push(res);
      console.log(`[Hexagon Dispatcher] Webhook delivered for: ${subject}`);
    } catch (err) {
      console.error('[Hexagon Dispatcher] Webhook dispatch failed:', err.message);
    }
  }

  return {
    success: results.length > 0,
    dispatched: results.length > 0,
    results
  };
}

/**
 * Send New Quote Notification
 */
async function notifyQuote(record) {
  const d = record.data;
  const quoteRef = record.id;
  const subject = `[Presupuesto ${quoteRef}] ${d.company || 'Empresa'} — ${d.service || 'Servicio Industrial'}`;

  // Prepare file attachments
  const attachments = [];
  const rawAttachments = [];

  if (Array.isArray(d.files)) {
    for (const f of d.files) {
      if (f && f.base64) {
        rawAttachments.push(f);
        attachments.push({
          filename: f.name || 'adjunto.dat',
          content: Buffer.from(f.base64, 'base64'),
          contentType: f.type || 'application/octet-stream'
        });
      }
    }
  }

  const profilesList = Array.isArray(d.profiles) && d.profiles.length > 0
    ? d.profiles.join(', ')
    : 'No especificados';

  let profileDetailsHtml = '';
  if (Array.isArray(d.profileDetails) && d.profileDetails.length > 0) {
    profileDetailsHtml = `
      <div style="margin-top: 8px;">
        <strong>Desglose de perfiles:</strong>
        <ul style="margin: 4px 0; padding-left: 20px;">
          ${d.profileDetails.map(p => `
            <li>
              <strong>${p.name || p.profile || 'Perfil'}:</strong> 
              ${p.quantity || 1} operario(s) 
              ${p.cert ? `(Cert: ${p.cert})` : ''} 
              ${p.shift ? `(Turno: ${p.shift})` : ''}
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }

  const timing = d.projectTiming || {};
  const startDateStr = timing.startDateTBD ? 'Por definir' : (timing.startDate || d.startDate || 'No especificada');
  const durationStr = timing.durationTBD ? 'Por definir' : (timing.duration || d.duration || 'No especificada');
  const shiftsStr = timing.shifts || 'No especificado';
  const accessStr = Array.isArray(timing.accessConditions) && timing.accessConditions.length > 0
    ? timing.accessConditions.join(', ')
    : 'Ninguna condición especial indicada';

  const text = `
NUEVA SOLICITUD DE PRESUPUESTO — HEXAGON MONTAJES
Referencia: ${quoteRef}
Fecha: ${record.timestamp}

1. DATOS DEL CLIENTE
- Empresa: ${d.company}
- Contacto: ${d.name}
- Email: ${d.email}
- Teléfono: ${d.phone}
- Ubicación / Planta: ${d.location}

2. SERVICIO Y PERFILES
- Servicio Principal: ${d.service}
- Perfiles Solicitados: ${profilesList}
- Requiere asesoramiento previo: ${d.needGuidance ? 'SÍ' : 'NO'}

3. PLANIFICACIÓN Y CONDICIONES
- Fecha Estimada Inicio: ${startDateStr}
- Duración Estimada: ${durationStr}
- Turnos: ${shiftsStr}
- Requisitos de Acceso/PRL: ${accessStr}

4. ALCANCE DEL TRABAJO
${d.scope}

5. ARCHIVOS ADJUNTOS
${attachments.length > 0 ? attachments.map(a => `- ${a.filename}`).join('\n') : 'Sin archivos adjuntos'}
  `.trim();

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #1e293b; }
        .card { max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .header { background: #0f172a; color: #ffffff; padding: 24px 32px; border-bottom: 4px solid #f59e0b; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
        .header .sub { font-size: 13px; color: #94a3b8; margin-top: 4px; }
        .badge { display: inline-block; background: #f59e0b; color: #0f172a; font-weight: 700; font-size: 12px; padding: 4px 10px; border-radius: 4px; margin-top: 8px; }
        .content { padding: 28px 32px; }
        .section { margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; }
        .section:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #0284c7; margin-bottom: 12px; }
        .row { display: flex; margin-bottom: 8px; font-size: 14px; line-height: 1.5; }
        .label { font-weight: 600; width: 180px; color: #475569; }
        .value { flex: 1; color: #0f172a; }
        .scope-box { background: #f8fafc; border-left: 4px solid #0284c7; padding: 14px 18px; border-radius: 0 4px 4px 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin-top: 8px; }
        .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 32px; font-size: 12px; color: #64748b; text-align: center; }
        a { color: #0284c7; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>HEXAGON MONTAJES INDUSTRIALES</h1>
          <div class="sub">Nueva Solicitud de Presupuesto Técnico</div>
          <div class="badge">REF: ${quoteRef}</div>
        </div>
        <div class="content">
          <div class="section">
            <div class="section-title">1. Datos del Cliente y Contacto</div>
            <div class="row"><div class="label">Empresa:</div><div class="value"><strong>${d.company}</strong></div></div>
            <div class="row"><div class="label">Persona de Contacto:</div><div class="value">${d.name}</div></div>
            <div class="row"><div class="label">Email:</div><div class="value"><a href="mailto:${d.email}">${d.email}</a></div></div>
            <div class="row"><div class="label">Teléfono:</div><div class="value"><a href="tel:${d.phone}">${d.phone}</a></div></div>
            <div class="row"><div class="label">Ubicación / Planta:</div><div class="value">${d.location}</div></div>
          </div>

          <div class="section">
            <div class="section-title">2. Servicio y Personal Requerido</div>
            <div class="row"><div class="label">Servicio Principal:</div><div class="value"><strong>${d.service}</strong></div></div>
            <div class="row"><div class="label">Perfiles Solicitados:</div><div class="value">${profilesList}</div></div>
            ${profileDetailsHtml}
            <div class="row" style="margin-top: 8px;"><div class="label">Asesoramiento previo:</div><div class="value">${d.needGuidance ? '<span style="color:#d97706; font-weight:600;">Sí, cliente solicita asesoramiento previo</span>' : 'No'}</div></div>
          </div>

          <div class="section">
            <div class="section-title">3. Tiempos y Condiciones de Ejecución</div>
            <div class="row"><div class="label">Fecha Estimada Inicio:</div><div class="value">${startDateStr}</div></div>
            <div class="row"><div class="label">Duración Estimada:</div><div class="value">${durationStr}</div></div>
            <div class="row"><div class="label">Régimen de Turnos:</div><div class="value">${shiftsStr}</div></div>
            <div class="row"><div class="label">Requisitos Acceso/PRL:</div><div class="value">${accessStr}</div></div>
          </div>

          <div class="section">
            <div class="section-title">4. Alcance del Trabajo y Memoria</div>
            <div class="scope-box">${d.scope}</div>
          </div>

          ${attachments.length > 0 ? `
          <div class="section">
            <div class="section-title">5. Documentación Adjunta (${attachments.length})</div>
            <p style="font-size: 13px; color: #475569; margin: 0 0 8px 0;">Archivos incluidos como adjuntos en este correo:</p>
            <ul style="margin: 0; padding-left: 20px; font-size: 13px;">
              ${attachments.map(a => `<li><strong>${a.filename}</strong></li>`).join('')}
            </ul>
          </div>
          ` : ''}
        </div>
        <div class="footer">
          Enviado automáticamente por el portal web oficial de Hexagon Montajes Industriales.<br>
          Recibido el ${new Date(record.timestamp).toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })} CET.
        </div>
      </div>
    </body>
    </html>
  `;

  return await dispatchMessage({
    subject,
    text,
    html,
    attachments,
    rawAttachments,
    data: record
  });
}

/**
 * Send New Candidate Notification
 */
async function notifyCandidate(record) {
  const d = record.data;
  const candidateRef = record.id;
  const subject = `[Candidatura ${candidateRef}] ${d.name} — ${d.specialty}`;

  const text = `
NUEVA CANDIDATURA TÉCNICA — RECURSOS HUMANOS HEXAGON
Referencia: ${candidateRef}
Fecha: ${record.timestamp}

1. DATOS PERSONALES Y CONTACTO
- Nombre completo: ${d.name}
- Contacto: ${d.contact}
- Residencia: ${d.residence}
- Movilidad: ${d.mobility}

2. PERFIL PROFESIONAL
- Especialidad: ${d.specialty}
- Experiencia: ${d.experienceSummary || 'No detallada'}
- Homologaciones / PRL: ${d.certifications || 'No especificadas'}
- Idiomas: ${d.languages || 'No especificados'}
- Indica CV disponible: ${d.hasCv ? 'SÍ' : 'NO'}
  `.trim();

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #1e293b; }
        .card { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .header { background: #0f172a; color: #ffffff; padding: 24px 32px; border-bottom: 4px solid #0284c7; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
        .header .sub { font-size: 13px; color: #94a3b8; margin-top: 4px; }
        .badge { display: inline-block; background: #0284c7; color: #ffffff; font-weight: 700; font-size: 12px; padding: 4px 10px; border-radius: 4px; margin-top: 8px; }
        .content { padding: 28px 32px; }
        .section { margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; }
        .section:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #0284c7; margin-bottom: 12px; }
        .row { display: flex; margin-bottom: 8px; font-size: 14px; line-height: 1.5; }
        .label { font-weight: 600; width: 170px; color: #475569; }
        .value { flex: 1; color: #0f172a; }
        .desc-box { background: #f8fafc; border-left: 4px solid #0284c7; padding: 12px 16px; border-radius: 0 4px 4px 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin-top: 6px; }
        .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 32px; font-size: 12px; color: #64748b; text-align: center; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>HEXAGON MONTAJES INDUSTRIALES</h1>
          <div class="sub">Departamento de RRHH — Nueva Candidatura Técnica</div>
          <div class="badge">REF: ${candidateRef}</div>
        </div>
        <div class="content">
          <div class="section">
            <div class="section-title">1. Datos del Profesional</div>
            <div class="row"><div class="label">Nombre completo:</div><div class="value"><strong>${d.name}</strong></div></div>
            <div class="row"><div class="label">Contacto / Teléfono:</div><div class="value">${d.contact}</div></div>
            <div class="row"><div class="label">Residencia actual:</div><div class="value">${d.residence}</div></div>
            <div class="row"><div class="label">Movilidad geográfica:</div><div class="value">${d.mobility}</div></div>
          </div>

          <div class="section">
            <div class="section-title">2. Especialidad y Trayectoria</div>
            <div class="row"><div class="label">Especialidad:</div><div class="value"><strong>${d.specialty}</strong></div></div>
            <div class="row"><div class="label">Idiomas:</div><div class="value">${d.languages || 'No especificados'}</div></div>
            <div class="row"><div class="label">Tiene CV listo:</div><div class="value">${d.hasCv ? '<span style="color:#16a34a; font-weight:600;">Sí, listo para solicitar</span>' : 'No'}</div></div>
            
            <div style="margin-top: 12px;">
              <strong style="font-size: 13px; color: #475569;">Homologaciones y Certificaciones (PRL/Soldadura):</strong>
              <div class="desc-box">${d.certifications || 'Sin certificaciones detalladas'}</div>
            </div>

            <div style="margin-top: 12px;">
              <strong style="font-size: 13px; color: #475569;">Resumen de Experiencia:</strong>
              <div class="desc-box">${d.experienceSummary || 'Sin resumen añadido'}</div>
            </div>
          </div>
        </div>
        <div class="footer">
          Enviado automáticamente por el portal web oficial de Hexagon Montajes Industriales.<br>
          Recibido el ${new Date(record.timestamp).toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })} CET.
        </div>
      </div>
    </body>
    </html>
  `;

  return await dispatchMessage({
    subject,
    text,
    html,
    data: record
  });
}

/**
 * Send New General Contact Notification
 */
async function notifyContact(record) {
  const d = record.data;
  const contactRef = record.id;
  const subject = `[Contacto ${contactRef}] ${d.name || 'Consulta'} — ${d.company ? `${d.company} — ` : ''}${d.subject || 'Mensaje Web'}`;

  const text = `
NUEVA CONSULTA DE CONTACTO — MONTAJES HEXAGON
Referencia: ${contactRef}
Fecha: ${record.timestamp}
Destino: info@montajeshexagon.com

1. DATOS DE CONTACTO
- Nombre: ${d.name}
- Email: ${d.email}
- Teléfono: ${d.phone || 'No especificado'}
- Empresa: ${d.company || 'No especificada'}

2. MENSAJE / ASUNTO
- Asunto: ${d.subject || 'Consulta general'}
- Mensaje:
${d.message || 'Sin mensaje adicional'}
  `.trim();

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #1e293b; }
        .card { max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .header { background: #0f172a; color: #ffffff; padding: 24px 32px; border-bottom: 4px solid #f59e0b; }
        .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
        .header .sub { font-size: 13px; color: #94a3b8; margin-top: 4px; }
        .badge { display: inline-block; background: #f59e0b; color: #0f172a; font-weight: 700; font-size: 12px; padding: 4px 10px; border-radius: 4px; margin-top: 8px; }
        .content { padding: 28px 32px; }
        .section { margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; }
        .section:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
        .section-title { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #0284c7; margin-bottom: 12px; }
        .row { display: flex; margin-bottom: 8px; font-size: 14px; line-height: 1.5; }
        .label { font-weight: 600; width: 170px; color: #475569; }
        .value { flex: 1; color: #0f172a; }
        .msg-box { background: #f8fafc; border-left: 4px solid #f59e0b; padding: 14px 18px; border-radius: 0 4px 4px 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap; margin-top: 8px; }
        .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 32px; font-size: 12px; color: #64748b; text-align: center; }
        a { color: #0284c7; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>HEXAGON MONTAJES INDUSTRIALES</h1>
          <div class="sub">Nueva Consulta de Contacto Web</div>
          <div class="badge">REF: ${contactRef}</div>
        </div>
        <div class="content">
          <div class="section">
            <div class="section-title">1. Datos del Remitente</div>
            <div class="row"><div class="label">Nombre:</div><div class="value"><strong>${d.name}</strong></div></div>
            <div class="row"><div class="label">Email:</div><div class="value"><a href="mailto:${d.email}">${d.email}</a></div></div>
            <div class="row"><div class="label">Teléfono:</div><div class="value">${d.phone ? `<a href="tel:${d.phone}">${d.phone}</a>` : 'No indicado'}</div></div>
            <div class="row"><div class="label">Empresa:</div><div class="value">${d.company || 'No indicada'}</div></div>
          </div>

          <div class="section">
            <div class="section-title">2. Contenido del Mensaje</div>
            <div class="row"><div class="label">Asunto:</div><div class="value"><strong>${d.subject || 'Consulta general'}</strong></div></div>
            <div class="msg-box">${d.message || 'Sin mensaje adicional'}</div>
          </div>
        </div>
        <div class="footer">
          Enviado automáticamente por el portal web oficial de Hexagon Montajes Industriales.<br>
          Recibido el ${new Date(record.timestamp).toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })} CET.
        </div>
      </div>
    </body>
    </html>
  `;

  return await dispatchMessage({
    subject,
    text,
    html,
    data: record
  });
}

module.exports = {
  getConfig,
  notifyQuote,
  notifyCandidate,
  notifyContact
};
