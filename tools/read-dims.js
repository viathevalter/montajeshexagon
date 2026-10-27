const fs = require('fs');

// Simple JPEG/PNG dimension reader
function getDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  if (buf[0] === 0xFF && buf[1] === 0xD8) { // JPEG
    let i = 2;
    while (i < buf.length) {
      if (buf[i] === 0xFF && (buf[i+1] === 0xC0 || buf[i+1] === 0xC2)) {
        return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  } else if (buf.readUInt32BE(0) === 0x89504E47) { // PNG
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  return null;
}

const list = [
  'assets/images/industrial/hexagon-sectores-torre.jpg',
  'assets/images/industrial/hexagon-sectores-bomba.jpg',
  'assets/images/services/01_montaje_industrial_v2.jpg',
  'assets/images/services/05_caldereria_estructural.jpg',
  'assets/images/services/06_mecanica_industrial_v2.jpg',
  'assets/images/services/07_instalacion_reparacion_v2.jpg',
  'assets/images/services/04_montaje_tuberias_piping.jpg',
  'assets/images/services/02_mantenimiento_industrial_v2.jpg',
  'assets/images/services/05_caldereria_ensamblaje_v2.jpg',
  'assets/images/services/08_trabajos_auxiliares_v2.jpg',
  'assets/images/industrial/04_tubulacoes_industriais.jpg'
];

for (const f of list) {
  try {
    const d = getDimensions(f);
    console.log(f, d);
  } catch (e) {
    console.log(f, 'error reading');
  }
}
