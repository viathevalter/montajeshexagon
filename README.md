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
   - `POST /api/quote` — Registro y tramitación de presupuestos con envío de email corporativo a `info@montajeshexagon.com` y adjuntos técnicos directos.
   - `POST /api/candidate` — Recepción de candidaturas para el departamento de RRHH.
   - `POST /api/contact` — Mensajes y consultas de contacto directo.
   - En Vercel, el sistema despacha todos los formularios hacia el buzón oficial **`info@montajeshexagon.com`** vía **SMTP** (servidor de correo del dominio próprio `montajeshexagon.com`), **Resend** o **Webhooks**.
4. **Variables de Entorno en Vercel (Project Settings → Environment Variables):**
   - `NOTIFICATION_EMAIL`: `info@montajeshexagon.com` (correo oficial de recepción).
   - `SMTP_HOST`: Servidor SMTP de tu dominio (ej. `mail.montajeshexagon.com`).
   - `SMTP_PORT`: Puerto SMTP (ej. `465` para SSL o `587` para TLS).
   - `SMTP_SECURE`: `true` (para puerto 465) o `false`.
   - `SMTP_USER`: `info@montajeshexagon.com`.
   - `SMTP_PASS`: Contraseña del buzón de correo.
   - `SMTP_FROM`: `"Hexagon Montajes" <info@montajeshexagon.com>`.
   - *(Opcional)* `WEBHOOK_URL`: Webhook para notificaciones simultáneas en Slack, Discord o CRM.
   *(Consulta `.env.example` para la plantilla completa)*.
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
