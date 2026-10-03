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
3. **Identidad propia, decidida con Sergio el 3 oct (tarde), tras cuatro rondas en el lienzo «Identidad Visit Duitama»** (https://claude.ai/artifact/QQNrHtWGQD7gF6yFDWfEfp). Dirección G «Destino» (como Visit Bogotá: foto, titular con la búsqueda, buscador, categorías, tarjetas): ultramar #3341F0 + maíz #FFC93C, tinta #12131A. Hanken Grotesk para leer y **Ultra** para el letrero «DUITAMA» con la base en arco (guiño al UTAH de Visit Utah, pero como texto: Google lo lee) y las cifras grandes. La bandera de Duitama (Acuerdo 022 de 1961: verde mitad, negro y rojo cuartos; tonos del escudo de Wikimedia #01A350 / #1A1A1A / #ED1C24) solo como el punto de «visit·duitama» y el favicon. Las almenas de la torre del escudo separan secciones. El rojo de la bandera marca los avisos (vías cerradas). Deja atrás el BRIEF (terracota, Fraunces, Plex Mono) y la estética del GFBM. No hay botón de compra: Visit Duitama orienta, no vende (Ley 300/1996 y Ley 2068/2020).
4. **Español primero.** El 70 % del público del GFBM es de Bogotá (Plausible, sep 2026). El inglés
   del BRIEF queda para la landing definitiva.
5. **Analítica**: Cloudflare Web Analytics, sitio `visitduitama.com` (sin cookies, solo páginas vistas).
   Los atajos `/qr`, `/ig`, `/web` y `/kit` redirigen a `/gfbm/` y cuentan cada uno como página
   propia: así se sabe de dónde llega la gente sin parámetros.
6. **SEO**: título y descripción con la búsqueda real («Qué hacer en Duitama durante el Gran Fondo…»), JSON-LD (WebPage, SportsEvent, TouristDestination con atracciones, ItemList de aliados), `robots.txt` y `sitemap.xml`. Falta dar de alta el dominio en Search Console (necesita la cuenta de Google de Sergio).
7. **Sin señal**: un service worker guarda la página la primera vez que se abre (`sitio/gfbm/sw.js`).
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
| Premiación hacia las 2:30 p.m. (tentativa) | Sergio, 3 oct 2026 |
| Cronometraje y resultados: Finalap (de Deportec) | Sergio («Final Lab, el mismo de Portec») + finalap.com, que tiene eventos GFBM 2016–2025 |
| La Ciclería Café Taller, Cra. 16 # 19-28: casa del GFBM, abierta vie y sáb, Café Boyacense de Moniquirá | Sergio, 3 oct 2026; dirección también en `EVENT.contact` del repo gfbm. Coordenadas aproximadas (TripAdvisor/Restaurant Guru) |
| Rugantino di Roma, Cra. 13 # 17A-23, horario | rugantinodiroma.com/contactenos; coordenadas OSM |
| Fusionario Casa, Cl. 13 # 17-26 | Restaurant Guru (horario sin confirmar) |
| Curva del Divino Niño: sopa gratis (casi siempre mondongo), caminata guiada | Sergio, 3 oct 2026 |
| La curva está en la subida al Cogollo (km 133–138 GF; base en el km 93,4 de 103,1 del GPX del MF) | Inferencia: crono 5 de la guía + Boyacá 7 Días (2020) ubica la imagen del Divino Niño en el sector El Cogollo, que el GPX cruza en el km 135. **Falta la ubicación exacta** |
| Hotel Nivari Duitama, 1,3 km de la salida, Cra. 13 # 18-191 | `EVENT.hotel` del repo gfbm |

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
- Curva del Divino Niño: coordenadas exactas, hora y punto de encuentro de la caminata guiada (Sergio).
- «Alma»: no aparece en Duitama en ninguna fuente; falta dirección o Instagram (Sergio).
- Marcas aliadas de la Expo Bici y de gastronomía (vie–dom): las pasa Sergio.
- Canal de contacto: el WhatsApp de Sergio (falta el número).

## Siguiente

- **Dom 4 – mar 6:** directorio verificado (8–10 lugares), QR para el stand y para la historia de Instagram (`/qr`, `/ig`), versión EN si da.
- **Mié 7 – jue 8:** enlace desde gfboyacamundial.com (`/es/enlaces/` y «Qué sigue»: lo mezcla Sergio en el repo `gfbm`).
- **Lun 12 (festivo):** encuesta de 5 preguntas al acompañante (investigación, p. 21) y lectura de la analítica.

## Cómo actualizar

Editar `sitio/gfbm/index.html` (textos), `sitio/gfbm/lugares.js` (puntos del mapa) o `CARRERA` en
`sitio/gfbm/app.js` (horas y kilómetros) y hacer push a `piloto-gfbm` o `main`: el flujo publica solo.
La ruta se regenera con `python3 scripts/rutas-geojson.py <carpeta de los GPX> sitio/gfbm/rutas.json`.
