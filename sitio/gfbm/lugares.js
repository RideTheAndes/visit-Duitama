/* Lugares del mapa (aparte de la salida y la meta, que están en app.js).
 * Coordenadas de OpenStreetMap (Nominatim), consultadas el 3 oct 2026; la
 * verificación de cada uno está en docs/PILOTO-GFBM-2026.md. Solo entra un
 * lugar con coordenadas verificadas. Campos: nombre, lat, lon, texto, letra, color.
 */
window.VISITDUITAMA_LUGARES = [
  { nombre: 'Plaza de los Libertadores', lat: 5.82775, lon: -73.03391, letra: 'C', color: '#A8461F', texto: 'Centro de Duitama' },
  { nombre: 'Catedral de San Lorenzo Mártir', lat: 5.82840, lon: -73.03420, letra: '✝', color: '#A8461F', texto: 'Frente a la plaza' },
  { nombre: 'Pueblito Boyacense', lat: 5.82535, lon: -73.01870, letra: 'P', color: '#A8461F', texto: 'Vereda Tocogua · horario 2026 por confirmar' },
  { nombre: 'Parqueadero Colegio Rafael Reyes', lat: 5.83025, lon: -73.02327, letra: 'E', color: '#1e5da0', texto: 'Frente a la Cámara de Comercio (guía del participante)' },
  { nombre: 'Parqueadero UPTC', lat: 5.82752, lon: -73.02450, letra: 'E', color: '#1e5da0', texto: 'Entrada por la Carrera 18 (guía del participante)' }
];
