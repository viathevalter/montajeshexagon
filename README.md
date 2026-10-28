# Hexagon Montajes Industriales ⚙️

Plataforma corporativa multilingüe de **Hexagon Montajes Industriales**, especializada en gestión de paradas de planta, calderería pesada, soldadura técnica de alta homologación, montaje de tuberías y dotación de personal especializado para la industria petroquímica, energética, siderúrgica y naval.

---

## 🌐 Estructura Multilingüe

El proyecto cuenta con arquitectura estática optimizada para CDN global y soporte en 5 idiomas:
- 🇪🇸 **Español (Principal):** `/` y `/es/`
- 🇬🇧 **Inglés:** `/en/`
- 🇫🇷 **Francés:** `/fr/`
- 🇮🇹 **Italiano:** `/it/`
- 🇩🇪 **Alemán:** `/de/`
- 📄 **Páginas de servicio especializadas:** `/servicios/personal-especializado/`

---

## 🚀 Despliegue en Vercel

El proyecto está 100% optimizado para despliegue directo en **Vercel**:

1. **Conexión con GitHub:** Conectar el repositorio `viathevalter/montajeshexagon` en el panel de Vercel.
2. **Configuración del proyecto:**
   - **Framework Preset:** `Other` (detecta automáticamente configuración estática y serverless).
   - **Root Directory:** `./`
   - **Build Command:** *(dejar vacío / default)*
   - **Output Directory:** *(dejar vacío / default)*
3. **Funciones Serverless y Notificaciones (`/api`):**
   - `POST /api/quote` — Registro y tramitación de presupuestos con envío de email corporativo y adjuntos técnicos directos.
   - `POST /api/candidate` — Recepción de candidaturas para el departamento de RRHH.
   - En Vercel, el sistema despacha los formularios vía **SMTP (Nodemailer)**, **Resend** o **Webhooks** para garantizar persistencia y entrega inmediata.
4. **Variables de Entorno en Vercel (Project Settings → Environment Variables):**
   - `NOTIFICATION_EMAIL`: Correo de destino del equipo Hexagon (ej. `contacto@hexagonmontajes.com`).
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`: Credenciales SMTP para despacho de correos y adjuntos.
   - *(Opcional)* `RESEND_API_KEY`: Clave API de Resend para envío directo vía REST.
   - *(Opcional)* `WEBHOOK_URL`: Webhook para notificaciones en Slack, Discord o CRM.
   *(Consulta `.env.example` para una plantilla lista para usar)*.
5. **Enrutamiento y Caché (`vercel.json`):**
   - Redirecciones limpias automáticas (`/es` → `/es/`).
   - Caché inmutable para activos estáticos (`/assets/`).
   - Cabeceras de seguridad HTTP (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`).

---

## 💻 Desarrollo Local

Para ejecutar el servidor local de desarrollo:

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor local
npm start
```

El servidor estará activo en `http://localhost:3000/`.
