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
3. **Funciones Serverless (`/api`):**
   - `POST /api/quote` — Registro y tramitación de expedientes de presupuesto con adjuntos técnicos.
   - `POST /api/candidate` — Recepción de candidaturas para el departamento de RRHH.
4. **Enrutamiento y Caché (`vercel.json`):**
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
