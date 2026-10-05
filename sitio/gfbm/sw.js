/* Modo sin señal: la página se guarda la primera vez que se abre con señal.
 * HTML: primero la red y, si no hay, la copia. Lo demás: la copia y se
 * actualiza por detrás. Cambiar VERSION al publicar cambios grandes. */
var VERSION = 'gfbm-2026-10-05a';
var BASICOS = ['/gfbm/', '/gfbm/app.js', '/gfbm/lugares.js', '/gfbm/rutas.json', '/gfbm/portada-780.webp', '/favicon.svg'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(BASICOS); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  // Ni la analítica ni los mosaicos del mapa se guardan.
  if (url.hostname.indexOf('cloudflareinsights') !== -1 || url.hostname.indexOf('tile.openstreetmap.org') !== -1) return;
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(function (r) {
      var copia = r.clone();
      caches.open(VERSION).then(function (c) { c.put('/gfbm/', copia); });
      return r;
    }).catch(function () { return caches.match('/gfbm/'); }));
    return;
  }
  e.respondWith(caches.match(req).then(function (guardado) {
    var red = fetch(req).then(function (r) {
      if (r && (r.ok || r.type === 'opaque')) { var copia = r.clone(); caches.open(VERSION).then(function (c) { c.put(req, copia); }); }
      return r;
    }).catch(function () { return guardado; });
    return guardado || red;
  }));
});
