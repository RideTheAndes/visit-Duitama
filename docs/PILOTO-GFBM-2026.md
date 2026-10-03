# Piloto GFBM 2026 — Duitama para quien acompaña

Primera pieza pública de Visit Duitama: una página para los acompañantes de La 10 del Gran Fondo
Boyacá Mundial (9–11 oct 2026). Sale de la investigación «Modelado estratégico y operativo de la
experiencia de acompañantes» (nivel 1, MVP): práctica 1 (tiempos de paso y llegada) y práctica 2
(guía digital «Quédate en Duitama»), con la regla de no mandar a nadie lejos el domingo por la mañana.

**En vivo:** https://visitduitama.com/gfbm/ (la raíz redirige ahí mientras dure el piloto).

## Decisiones (3 oct 2026)

1. **Se publica `sitio/` y nada más**, con GitHub Pages y el flujo `.github/workflows/pages.yml`. Las
   exploraciones de la landing no salen. Despliegan `main` y `piloto-gfbm` (política de ramas del
   entorno `github-pages`).
2. **GitHub Pages y no Netlify**: el sitio del GFBM gasta créditos de Netlify en su semana más
   cargada y un segundo sitio en el mismo saldo podía apagarlo. El dominio está en Cloudflare (DNS
   solo, nube gris) apuntando a GitHub Pages.
3. **Estética del GFBM, firma de Visit Duitama.** Archivo, azul noche, amarillo y GF azul / MF verde
   salen de `src/styles/global.css` del repo `gfbm`, para que el acompañante reconozca el evento. Se
   conservan el isotipo y el punto de dato (BRIEF §3.3–3.4) y el subrayado punteado Ruana para lo
   pendiente. Esto **suspende para el piloto** las reglas de color del BRIEF §3.1. No hay
   botón de compra: Visit Duitama orienta, no vende (Ley 300/1996 y Ley 2068/2020, ver la investigación).
4. **Español primero.** El 70 % del público del GFBM es de Bogotá (Plausible, sep 2026). El inglés
   del BRIEF queda para la landing definitiva.
5. **Analítica**: Cloudflare Web Analytics, sitio `visitduitama.com` (sin cookies, solo páginas vistas).
   Los atajos `/qr`, `/ig`, `/web` y `/kit` redirigen a `/gfbm/` y cuentan cada uno como página
   propia: así se sabe de dónde llega la gente sin parámetros.
6. **Sin señal**: un service worker guarda la página la primera vez que se abre (`sitio/gfbm/sw.js`).
   El domingo la red se satura cerca de la meta. Si se cambia algo grande, hay que subir `VERSION`.

## De dónde sale cada dato

| Dato | Fuente |
|---|---|
| Kit y Expo Bici: vie 10–19 h, sáb 9–19 h, Cámara de Comercio, Transversal 19 # 23-141 | Guía del participante 0.2, p. 5–6 |
| Rodada: encuentro 6:45, salida 7:00, 38 km, ~3 h, recorrido | Guía 0.2, p. 4 |
| Corrales 4:50–5:50, cierre de vías 5:30, parqueaderos (Colegio Rafael Reyes, UPTC por la Cra. 18) | Guía 0.2, p. 10 |
| Salida GF 6:00 / MF 6:15, km de cada punto, cortes Monguí 10:30 y Tobasía 12:00 | Guía 0.2, p. 7, 8 y 13 |
| Tobasía aplica a GF y MF; Gran Fondo 143,5 km | Sergio, 3 oct 2026 |
| Salida y meta en el mismo punto; salida a 2.531 m | Track oficial (`GranFondo2026.gpx`: 97 m entre el primer y el último punto) |
| Teléfonos de asistencia médica 320 426 4995 y mecánica 320 426 6001 | Guía 0.2, p. 7–8 |
| Vehículos acompañantes prohibidos | Guía 0.2, regla 10 |
| Coordenadas de plaza, catedral, Pueblito, Colegio Rafael Reyes y UPTC | OpenStreetMap (Nominatim), 3 oct 2026 |
| Termales de Paipa 7:00–21:00 todos los días | termalesdepaipa.com, consultado el 3 oct 2026 |
| 123, línea nacional de emergencias | Fuente oficial (verificación del 3 oct) |

**Descartado por la verificación del 3 oct:** la entrada al Pueblito de $7.000 (en 2024 era $6.000;
2026 sin dato), las visitas del Viñedo de Puntalarga (un blog de sep 2026 dice que se suspendieron),
el «Museo Diocesano de Arte Religioso» (no hay evidencia de que funcione) y la «Casona Culturama» (no
verificada; Culturama es el Instituto de Cultura y Bellas Artes de Duitama).

## Pendiente (lo marcado «por confirmar» en la página)

- Cafés y panaderías que abren antes de las 8 a.m. el domingo: llamar o ir a ver. OSM no trae horarios.
- Horario y precio 2026 del Pueblito Boyacense, y si abre el domingo por la mañana.
- Seguimiento en vivo por chip: preguntar a la organización quién cronometra y si hay enlace público.
- Hora de la premiación y horas de reapertura de vías (Tránsito / PMU).
- Punto de reencuentro: los tótems por letra del apellido (práctica 4) dependen de la organización.

## Siguiente

- **Dom 4 – mar 6:** directorio verificado (8–10 lugares), QR para el stand y para la historia de Instagram (`/qr`, `/ig`), versión EN si da.
- **Mié 7 – jue 8:** enlace desde gfboyacamundial.com (`/es/enlaces/` y «Qué sigue»: lo mezcla Sergio en el repo `gfbm`).
- **Lun 12 (festivo):** encuesta de 5 preguntas al acompañante (investigación, p. 21) y lectura de la analítica.

## Cómo actualizar

Editar `sitio/gfbm/index.html` (textos), `sitio/gfbm/lugares.js` (puntos del mapa) o `CARRERA` en
`sitio/gfbm/app.js` (horas y kilómetros) y hacer push a `piloto-gfbm` o `main`: el flujo publica solo.
La ruta se regenera con `python3 scripts/rutas-geojson.py <carpeta de los GPX> sitio/gfbm/rutas.json`.
