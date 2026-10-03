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
        // Curva del Divino Niño (5.857265, -73.025647, de Sergio): km 136,1 del GPX.
        { km: 136, nombre: 'Curva del Divino Niño', nota: 'Subida al Cogollo · la barra del Gran Fondo', curva: true },
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
        // Curva del Divino Niño: km 96,5 de 103,1 en el GPX = 93,6 % del recorrido.
        { km: 94, nombre: 'Curva del Divino Niño', nota: 'Subida al Cogollo · la barra del Gran Fondo', curva: true },
        { km: 97, nombre: 'Mirador del Cogollo', nota: 'Empieza el descenso a Duitama' }
      ]
    }
  };

  // Margen del cálculo: ±8 % del tiempo pedaleando, y llegar a la meta 15 min
  // antes del extremo temprano (unos 45 min antes de la hora estimada).
  var MARGEN = 0.08;
  var ANTES_MIN = 15;
  // Caminata de la Cámara de Comercio a la curva: ~4 km y 210 m de subida.
  var CAMINATA_CURVA_MIN = 75;

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
    var curva = null;
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
      if (p.curva) { li.className = 'curva'; curva = t; }
      li.innerHTML = '<time>' + hora(t).corta + '</time><span>' + p.nombre + ' <small>km ' + String(p.km).replace('.', ',') + (nota ? ' · ' + nota : '') + '</small></span>';
      pasos.appendChild(li);
    });
    var enCurva = document.getElementById('hora-curva');
    if (enCurva && curva) {
      // Para llegar antes que él: el extremo temprano de su paso, menos la caminata
      // (unos 4 km con 210 m de subida desde la Cámara de Comercio).
      var tempranoCurva = salida + (curva - salida) * (1 - MARGEN);
      var salir = abajo5(tempranoCurva - CAMINATA_CURVA_MIN);
      enCurva.textContent = c.nombre + ' a ' + v.toFixed(v % 1 ? 1 : 0).replace('.', ',') + ' km/h: pasa por la Curva del Divino Niño hacia las ' + hora(curva).larga + '. Para verlo, sal de la Cámara de Comercio a más tardar a las ' + hora(salir).larga + '.';
    }
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
      var colores = { 'gran-fondo': '#4481c2', 'medio-fondo': '#3ba935', 'cogollo': '#FFC93C' };
      capaRuta = L.geoJSON(rutas, {
        style: function (f) { return { color: colores[f.properties.id], weight: f.properties.id === 'cogollo' ? 9 : (f.properties.id === 'gran-fondo' ? 5 : 4), opacity: f.properties.id === 'cogollo' ? .95 : .85 }; },
        onEachFeature: function (f, capa) { if (f.properties.id === 'cogollo') capa.bindPopup('<b>Subida al Cogollo</b><br>Crono 5 del Gran Fondo. La Curva del Divino Niño está a mitad de la subida.'); }
      }).addTo(mapa);
      var icono = function (color, texto) {
        return L.divIcon({ className: '', iconSize: [30, 30], iconAnchor: [15, 15],
          html: '<div style="width:30px;height:30px;border-radius:50%;background:' + color + ';color:' + (color === '#FFC93C' ? '#12131A' : '#fff') + ';border:3px solid #fff;box-shadow:0 1px 6px rgba(0,0,0,.35);font:800 13px/24px \'Hanken Grotesk\',sans-serif;text-align:center">' + texto + '</div>' });
      };
      var gmaps = function (lat, lon) { return 'https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lon + '&travelmode=walking'; };
      L.marker(SALIDA, { icon: icono('#12131A', '★'), zIndexOffset: 1000 }).addTo(mapa)
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

  // ---------- Buscador ----------
  // Lo que la gente escribe → la sección que lo responde. Sin servidor.
  var INDICE = [
    { t: 'Curva del Divino Niño', s: 'Barra, sopa de leña gratis', h: '#divino-nino', k: 'curva divino nino sopa barra ver carrera animar alentar cogollo mondongo gratis' },
    { t: '¿A qué hora llega?', s: 'Calculadora de llegada', h: '#llegada', k: 'hora llega llegada calcular calculadora tiempo meta cuanto tarda' },
    { t: 'Domingo sin carro', s: 'Vías cerradas, parqueaderos y mapa', h: '#domingo', k: 'vias cierre cierres cerradas transito carro parqueadero parqueo parquear domingo mapa ruta moverse' },
    { t: 'Agenda del fin de semana', s: 'Kits, Expo Bici, rodada, premiación', h: '#agenda', k: 'agenda horario horarios kit kits expo feria rodada viernes sabado domingo premiacion salida' },
    { t: 'Planes a pie', s: 'Café, niños, salida y meta', h: '#planes', k: 'planes plan ninos familia desayuno desayunar cafe centro plaza catedral' },
    { t: 'Para la víspera', s: 'Pueblito, termales, Pantano de Vargas', h: '#vispera', k: 'pueblito boyacense termales paipa pantano vargas turismo pasear visitar' },
    { t: 'La Ciclería Café Taller', s: 'La casa del Gran Fondo', h: '#aliados', k: 'cicleria cafe taller casa gran fondo visitar cafe moniquira' },
    { t: 'Rugantino di Roma', s: 'Restaurante italiano', h: '#aliados', k: 'comer comida restaurante restaurantes italiano pizza pasta almorzar almuerzo cenar cena' },
    { t: 'Fusionario Casa', s: 'Cocina de fusión', h: '#aliados', k: 'comer comida restaurante restaurantes fusion almorzar almuerzo cenar cena' },
    { t: 'Hotel Nivari Duitama', s: 'Hotel aliado', h: '#dormir', k: 'dormir hotel hoteles hospedaje alojamiento habitacion' },
    { t: 'Teléfonos', s: 'Asistencia médica, mecánica y 123', h: '#telefonos', k: 'telefono telefonos emergencia emergencias medica mecanica ayuda 123 llamar' },
    { t: 'Resultados', s: 'Finalap, el cronometrador', h: '#llegada', k: 'resultados finalap tiempos chip clasificacion' },
    { t: 'Tienda oficial de La 10', s: 'En el sitio del Gran Fondo', h: '#gran-fondo', k: 'tienda jersey buzo comprar recuerdos camiseta' }
  ];
  function normal(s) { return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
  function buscar(q) {
    var palabras = normal(q).split(/\s+/).filter(function (w) { return w.length > 1; });
    if (!palabras.length) return [];
    return INDICE.map(function (e) {
      var texto = normal(e.t + ' ' + e.k);
      var puntos = palabras.reduce(function (n, w) { return n + (texto.indexOf(w) !== -1 ? 1 : 0); }, 0);
      return { e: e, p: puntos };
    }).filter(function (x) { return x.p > 0; }).sort(function (a, b) { return b.p - a.p; }).slice(0, 5).map(function (x) { return x.e; });
  }
  function enlazarBuscador() {
    var form = document.getElementById('buscar');
    var campo = document.getElementById('buscar-texto');
    var lista = document.getElementById('resultados');
    if (!form || !campo || !lista) return;
    function pintar() {
      var q = campo.value.trim();
      if (!q) { lista.hidden = true; lista.innerHTML = ''; return; }
      var r = buscar(q);
      lista.innerHTML = r.length
        ? r.map(function (e) { return '<li><a href="' + e.h + '">' + e.t + ' <small>' + e.s + '</small></a></li>'; }).join('')
        : '<li><a href="#divino-nino">No encontramos eso. Prueba con comer, dormir, hora o curva <small>→</small></a></li>';
      lista.hidden = false;
    }
    campo.addEventListener('input', pintar);
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var r = buscar(campo.value);
      if (r.length) { lista.hidden = true; location.hash = r[0].h; campo.blur(); } else { pintar(); }
    });
    lista.addEventListener('click', function (ev) { if (ev.target.closest('a')) { lista.hidden = true; } });
  }

  // ---------- Botón fijo ----------
  // Aparece cuando ya pasaste la portada y se esconde mientras la calculadora está a la vista.
  function enlazarFijo() {
    var fijo = document.getElementById('fijo');
    var portada = document.querySelector('.portada');
    var calc = document.getElementById('llegada');
    if (!fijo || !portada || !calc || !('IntersectionObserver' in window)) return;
    var verPortada = true, verCalc = false;
    function pinta() { if (!verPortada && !verCalc) fijo.removeAttribute('data-oculto'); else fijo.setAttribute('data-oculto', ''); }
    new IntersectionObserver(function (e) { verPortada = e[0].isIntersecting; pinta(); }).observe(portada);
    new IntersectionObserver(function (e) { verCalc = e[0].isIntersecting; pinta(); }, { threshold: 0.15 }).observe(calc);
  }

  restaurar();
  enlazarBuscador();
  enlazarFijo();
  document.getElementById('calculadora').addEventListener('input', calcular);
  document.getElementById('calculadora').addEventListener('change', calcular);
  $('#btn-cal').addEventListener('click', calendario);
  calcular();
  enlazarMapa();
  sinRed();
})();
