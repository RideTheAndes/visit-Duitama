/* Visit Duitama × GFBM 2026 — calculadora de llegada, mapa y modo sin señal.
 *
 * Todas las cifras del evento salen de la guía del participante 0.2 del GFBM
 * (horarios, kilómetros de cada punto, cortes) y del track oficial (salida y
 * meta). Si la guía cambia, se cambia CARRERA y nada más.
 */
(function () {
  'use strict';

  // Domingo 11 de octubre de 2026. Bogotá no tiene horario de verano: UTC−5 fijo.
  var FECHA = '2026-10-11';
  var DESFASE_UTC_H = 5;

  var CARRERA = {
    gf: {
      nombre: 'Gran Fondo',
      km: 143.5,
      salida: [6, 0],
      puntos: [
        { km: 12, nombre: 'Glorieta de Paipa' },
        { km: 30, nombre: 'Punta Larga', nota: 'Empieza el primer cronometraje' },
        { km: 50, nombre: 'Puente Reyes', nota: 'Gira hacia Gámeza' },
        { km: 77, nombre: 'Monguí', corte: [10, 30] },
        { km: 112, nombre: 'Tobasía', corte: [12, 0] },
        { km: 123, nombre: 'Santa Rosa' },
        { km: 138, nombre: 'Mirador del Cogollo', nota: 'Empieza el descenso a Duitama' }
      ]
    },
    mf: {
      nombre: 'Medio Fondo',
      km: 100,
      salida: [6, 15],
      puntos: [
        { km: 12, nombre: 'Glorieta de Paipa' },
        { km: 30, nombre: 'Punta Larga', nota: 'Empieza el primer cronometraje' },
        { km: 50, nombre: 'Puente Reyes', nota: 'Sigue hacia Corrales' },
        { km: 73, nombre: 'Tobasía', corte: [12, 0] },
        { km: 82, nombre: 'Santa Rosa' },
        { km: 97, nombre: 'Mirador del Cogollo', nota: 'Empieza el descenso a Duitama' }
      ]
    }
  };

  // Margen del cálculo: ±8 % del tiempo pedaleando, y llegar a la meta 15 min
  // antes del extremo temprano (unos 45 min antes de la hora estimada).
  var MARGEN = 0.08;
  var ANTES_MIN = 15;

  var $ = function (s) { return document.querySelector(s); };

  function minutos(hm) { return hm[0] * 60 + hm[1]; }
  function hora(min) {
    min = Math.round(min);
    var h = Math.floor(min / 60), m = min % 60;
    var sufijo = h < 12 ? 'a.m.' : (h === 12 && m === 0 ? 'm.' : 'p.m.');
    var h12 = h > 12 ? h - 12 : h;
    return { corta: h12 + ':' + (m < 10 ? '0' : '') + m, larga: h12 + ':' + (m < 10 ? '0' : '') + m + ' ' + sufijo, min: min };
  }
  function abajo5(min) { return Math.floor(min / 5) * 5; }
  function arriba5(min) { return Math.ceil(min / 5) * 5; }

  function leer() {
    var d = document.querySelector('input[name="distancia"]:checked').value;
    var r = document.querySelector('input[name="ritmo"]:checked').value;
    var c = CARRERA[d];
    var v;
    $('#campo-horas').classList.toggle('visible', r === 'horas');
    $('#campo-kmh').classList.toggle('visible', r === 'kmh');
    if (r === 'horas') {
      var h = Math.max(0, parseFloat($('#h').value) || 0);
      var m = Math.max(0, parseFloat($('#m').value) || 0);
      var total = h + m / 60;
      v = total > 0 ? c.km / total : 22;
    } else if (r === 'kmh') {
      v = parseFloat(String($('#kmh').value).replace(',', '.')) || 22;
    } else {
      v = parseFloat(r);
    }
    v = Math.min(45, Math.max(8, v));
    return { id: d, c: c, v: v };
  }

  var ultimo = null;

  function calcular() {
    var e = leer();
    var c = e.c, v = e.v;
    var salida = minutos(c.salida);
    var pedaleo = (c.km / v) * 60;
    var llega = salida + pedaleo;
    var temprano = salida + pedaleo * (1 - MARGEN);
    var tarde = salida + pedaleo * (1 + MARGEN);
    var estar = abajo5(temprano - ANTES_MIN);

    $('#res-titulo').textContent = c.nombre + ' · a ' + v.toFixed(v % 1 ? 1 : 0).replace('.', ',') + ' km/h cruza la meta hacia las';
    $('#res-hora').textContent = hora(llega).larga;
    $('#res-rango').textContent = 'entre las ' + hora(abajo5(temprano)).larga + ' y las ' + hora(arriba5(tarde)).larga;
    $('#res-estar').textContent = 'Estate en la meta desde las ' + hora(estar).larga;

    var pasos = $('#res-pasos');
    pasos.innerHTML = '';
    var alertas = [];
    var filas = [{ km: 0, nombre: 'Salida', nota: 'Frente a la Cámara de Comercio' }].concat(c.puntos, [{ km: c.km, nombre: 'Meta', nota: 'En el mismo sitio de la salida' }]);
    filas.forEach(function (p) {
      var t = salida + (p.km / v) * 60;
      var li = document.createElement('li');
      var nota = p.nota || '';
      if (p.corte) {
        var lim = minutos(p.corte);
        nota = 'Corte a las ' + hora(lim).larga;
        if (t > lim) {
          li.className = 'corte-mal';
          var necesita = p.km / ((lim - salida) / 60);
          alertas.push('A ese ritmo no alcanza el corte de ' + p.nombre + ' (' + hora(lim).larga + '). Necesita un promedio de al menos ' + necesita.toFixed(1).replace('.', ',') + ' km/h hasta ahí; si no llega a tiempo, lo recoge el bus escoba.');
        }
      }
      li.innerHTML = '<time>' + hora(t).corta + '</time><span>' + p.nombre + ' <small>km ' + String(p.km).replace('.', ',') + (nota ? ' · ' + nota : '') + '</small></span>';
      pasos.appendChild(li);
    });
    $('#res-alerta').innerHTML = alertas.map(function (a) { return '<div class="alerta">' + a + '</div>'; }).join('');

    ultimo = { c: c, estar: estar, tarde: arriba5(tarde), llega: llega };
    try { localStorage.setItem('visitduitama-calc', JSON.stringify({ d: e.id, r: document.querySelector('input[name="ritmo"]:checked').value, h: $('#h').value, m: $('#m').value, kmh: $('#kmh').value })); } catch (_) {}
  }

  function restaurar() {
    try {
      var s = JSON.parse(localStorage.getItem('visitduitama-calc') || 'null');
      if (!s) return;
      var d = document.querySelector('input[name="distancia"][value="' + s.d + '"]');
      var r = document.querySelector('input[name="ritmo"][value="' + s.r + '"]');
      if (d) d.checked = true;
      if (r) r.checked = true;
      if (s.h) $('#h').value = s.h;
      if (s.m) $('#m').value = s.m;
      if (s.kmh) $('#kmh').value = s.kmh;
    } catch (_) {}
  }

  // Alarma en el calendario: un .ics con el rato de espera en la meta.
  function utc(min) {
    var total = min + DESFASE_UTC_H * 60;
    var h = Math.floor(total / 60), m = total % 60;
    return FECHA.replace(/-/g, '') + 'T' + (h < 10 ? '0' : '') + h + (m < 10 ? '0' : '') + m + '00Z';
  }
  function calendario() {
    if (!ultimo) return;
    var ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Visit Duitama//GFBM 2026//ES', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:llegada-' + Date.now() + '@visitduitama.com',
      'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, ''),
      'DTSTART:' + utc(ultimo.estar),
      'DTEND:' + utc(ultimo.tarde),
      'SUMMARY:Llegada a la meta · ' + ultimo.c.nombre + ' La 10',
      'LOCATION:Cámara de Comercio de Duitama\\, Transversal 19 # 23-141\\, Duitama',
      'DESCRIPTION:Hora estimada de llegada: ' + hora(ultimo.llega).larga + '. Cálculo de visitduitama.com/gfbm',
      'BEGIN:VALARM', 'TRIGGER:-PT30M', 'ACTION:DISPLAY', 'DESCRIPTION:En 30 minutos\\, a la meta', 'END:VALARM',
      'END:VEVENT', 'END:VCALENDAR'
    ].join('\r\n');
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    a.download = 'llegada-la10.ics';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  // ---------- Mapa ----------
  var SALIDA = [5.82938, -73.02490]; // primer punto del track oficial
  var LUGARES = window.VISITDUITAMA_LUGARES || [];
  var mapa = null, capaRuta = null, capaYo = null;

  function cargar(src, tipo, integridad) {
    return new Promise(function (ok, mal) {
      var el = document.createElement(tipo === 'css' ? 'link' : 'script');
      if (tipo === 'css') { el.rel = 'stylesheet'; el.href = src; } else { el.src = src; }
      el.integrity = integridad; el.crossOrigin = 'anonymous'; el.referrerPolicy = 'no-referrer';
      el.onload = ok; el.onerror = mal;
      document.head.appendChild(el);
    });
  }

  function iniciarMapa() {
    if (mapa) return;
    var base = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/';
    Promise.all([
      cargar(base + 'leaflet.min.css', 'css', 'sha512-h9FcoyWjHcOcmEVkxOfTLnmZFWIH0iZhZT1H2TbOq55xssQGEJHEaIm+PgoUaZbRvQTNTluNOEfb1ZRy6D3BOw=='),
      cargar(base + 'leaflet.min.js', 'js', 'sha512-puJW3E/qXDqYp9IfhAI54BJEaWIfloJ7JWs7OeD5i6ruC9JZL1gERT1wjtwXFlh7CjE7ZJ+/vcRZRkIYIb6p4g=='),
      fetch('/gfbm/rutas.json').then(function (r) { return r.json(); })
    ]).then(function (res) {
      var rutas = res[2];
      var L = window.L;
      var caja = document.getElementById('mapa');
      caja.innerHTML = '';
      mapa = L.map(caja, { scrollWheelZoom: false, tap: true }).setView(SALIDA, 14);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19, subdomains: 'abcd',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(mapa);
      var colores = { 'gran-fondo': '#4481c2', 'medio-fondo': '#3ba935' };
      capaRuta = L.geoJSON(rutas, {
        style: function (f) { return { color: colores[f.properties.id], weight: f.properties.id === 'gran-fondo' ? 5 : 4, opacity: .85 }; }
      }).addTo(mapa);
      var icono = function (color, texto) {
        return L.divIcon({ className: '', iconSize: [30, 30], iconAnchor: [15, 15],
          html: '<div style="width:30px;height:30px;border-radius:50%;background:' + color + ';color:#fff;border:3px solid #fff;box-shadow:0 1px 6px rgba(0,0,0,.35);font:800 13px/24px Archivo,sans-serif;text-align:center">' + texto + '</div>' });
      };
      var gmaps = function (lat, lon) { return 'https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lon + '&travelmode=walking'; };
      L.marker(SALIDA, { icon: icono('#031847', '★'), zIndexOffset: 1000 }).addTo(mapa)
        .bindPopup('<b>Salida y meta</b><br>Frente a la Cámara de Comercio, Transversal 19 # 23-141<br><a href="' + gmaps(SALIDA[0], SALIDA[1]) + '" target="_blank" rel="noopener">Cómo llegar a pie</a>');
      LUGARES.forEach(function (l) {
        L.marker([l.lat, l.lon], { icon: icono(l.color || '#A8461F', l.letra || '•') }).addTo(mapa)
          .bindPopup('<b>' + l.nombre + '</b>' + (l.texto ? '<br>' + l.texto : '') + '<br><a href="' + gmaps(l.lat, l.lon) + '" target="_blank" rel="noopener">Cómo llegar</a>');
      });
    }).catch(function () {
      document.getElementById('mapa').innerHTML = '<div class="mapa-sin">No se pudo cargar el mapa (¿sin señal?). La salida y la meta están frente a la Cámara de Comercio de Duitama, Transversal 19 # 23-141.</div>';
    });
  }

  function enlazarMapa() {
    $('#btn-ciudad').addEventListener('click', function () { iniciarMapa(); if (mapa) mapa.setView(SALIDA, 14); });
    $('#btn-ruta').addEventListener('click', function () { iniciarMapa(); if (mapa && capaRuta) mapa.fitBounds(capaRuta.getBounds(), { padding: [16, 16] }); });
    $('#btn-yo').addEventListener('click', function () {
      iniciarMapa();
      if (!mapa) return;
      mapa.locate({ setView: true, maxZoom: 16 });
      mapa.once('locationfound', function (e) {
        if (capaYo) capaYo.remove();
        capaYo = window.L.circleMarker(e.latlng, { radius: 9, color: '#fff', weight: 3, fillColor: '#0894cc', fillOpacity: 1 }).addTo(mapa).bindPopup('Estás aquí').openPopup();
      });
      mapa.once('locationerror', function () { alert('No pudimos ver tu ubicación. Revisa el permiso de ubicación del navegador.'); });
    });
    var caja = document.getElementById('domingo');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entradas) {
        if (entradas.some(function (x) { return x.isIntersecting; })) { iniciarMapa(); io.disconnect(); }
      }, { rootMargin: '600px 0px' });
      io.observe(caja);
    } else {
      iniciarMapa();
    }
  }

  // ---------- Sin señal ----------
  function sinRed() {
    var aviso = $('#sin-red');
    var pinta = function () { aviso.classList.toggle('visible', !navigator.onLine); };
    window.addEventListener('online', pinta);
    window.addEventListener('offline', pinta);
    pinta();
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/gfbm/sw.js', { scope: '/gfbm/' }).catch(function () {});
    }
  }

  restaurar();
  document.getElementById('calculadora').addEventListener('input', calcular);
  document.getElementById('calculadora').addEventListener('change', calcular);
  $('#btn-cal').addEventListener('click', calendario);
  calcular();
  enlazarMapa();
  sinRed();
})();
