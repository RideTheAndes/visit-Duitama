/* Lugares del mapa (aparte de la salida y la meta, que están en app.js).
 * Coordenadas de OpenStreetMap (Nominatim), consultadas el 3 oct 2026; la
 * verificación de cada uno está en docs/PILOTO-GFBM-2026.md. Solo entra un
 * lugar con coordenadas verificadas. Campos: nombre, lat, lon, texto, letra, color.
 */
window.VISITDUITAMA_LUGARES = [
  // Coordenadas de Sergio (3 oct 2026); el track pasa a 10 m.
  { nombre: 'Curva del Divino Niño', lat: 5.857265, lon: -73.025647, letra: '★', color: '#FFC93C', texto: 'La barra del Gran Fondo, con sopa de leña gratis para quien acompaña. Km 136 del Gran Fondo, km 94 del Medio Fondo.' },
  { nombre: 'Plaza de los Libertadores', lat: 5.82775, lon: -73.03391, letra: 'P', color: '#3341F0', texto: 'Centro de Duitama' },
  { nombre: 'Catedral de San Lorenzo Mártir', lat: 5.82840, lon: -73.03420, letra: '✝', color: '#3341F0', texto: 'Frente a la plaza' },
  { nombre: 'Pueblito Boyacense', lat: 5.82535, lon: -73.01870, letra: 'B', color: '#3341F0', texto: 'Vereda Tocogua · horario 2026 por confirmar' },
  // La Ciclería: dirección del repo gfbm (EVENT.contact.address); coordenadas
  // aproximadas de TripAdvisor/Restaurant Guru (no está en OSM).
  { nombre: 'La Ciclería Café Taller', lat: 5.82900, lon: -73.03080, letra: 'C', color: '#12131A', texto: 'La casa del Gran Fondo · abierta viernes y sábado · Cra. 16 # 19-28' },
  // Aliados: Rugantino (OSM y Restaurant Guru coinciden); Fusionario (Restaurant Guru).
  { nombre: 'Rugantino di Roma', lat: 5.83073, lon: -73.03336, letra: 'R', color: '#12131A', texto: 'Restaurante aliado · Cra. 13 # 17A-23' },
  { nombre: 'Fusionario Casa', lat: 5.82528, lon: -73.03498, letra: 'F', color: '#12131A', texto: 'Restaurante aliado · Cl. 13 # 17-26' },
  { nombre: 'Parqueadero Colegio Rafael Reyes', lat: 5.83025, lon: -73.02327, letra: 'E', color: '#12131A', texto: 'Frente a la Cámara de Comercio (guía del participante)' },
  { nombre: 'Parqueadero UPTC', lat: 5.82752, lon: -73.02450, letra: 'E', color: '#12131A', texto: 'Entrada por la Carrera 18 (guía del participante)' }
];
