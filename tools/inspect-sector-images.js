const fs = require('fs');
const path = require('path');

const candidates = [
  'assets/images/industrial/hexagon-sectores-torre.jpg',
  'assets/images/industrial/hexagon-sectores-bomba.jpg',
  'assets/images/services/01_montaje_industrial_v2.jpg',
  'assets/images/services/05_caldereria_estructural.jpg',
  'assets/images/industrial/04_tubulacoes_industriais.jpg',
  'assets/images/services/06_mecanica_industrial_v2.jpg',
  'assets/images/services/07_instalacion_reparacion_v2.jpg',
  'assets/images/services/04_montaje_tuberias_piping.jpg',
  'assets/images/industrial/01_soldagem_real.jpg',
  'assets/images/services/02_mantenimiento_industrial_v2.jpg',
  'assets/images/services/05_caldereria_ensamblaje_v2.jpg'
];

for (const c of candidates) {
  if (fs.existsSync(c)) {
    const stat = fs.statSync(c);
    console.log(c, (stat.size / 1024).toFixed(1) + ' KB');
  } else {
    console.log('NOT FOUND:', c);
  }
}
