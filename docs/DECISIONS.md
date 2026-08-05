# DECISIONS — Landing Visit Duitama

Registro de decisiones de la fase de exploración. Todo lo que no está en `BRIEF.md` y hubo que decidir, vive aquí.

---

## Pasada 1 — Planes por dirección

### Dirección A — "The Guide"

**(a) Tesis del hero:** la página abre como la primera hoja de una guía de campo, no como un billboard. H1: *"The resident's field guide to Duitama, Boyacá."* Debajo, un índice numerado (01–10) con anclas a cada sección y un dato exacto junto a cada entrada del índice — el índice *es* el hero.

**(b) Elemento de firma:** **la ficha de referencia** — todo el documento se comporta como un cuaderno técnico: columna editorial de ~68ch con un riel de margen fijo (desktop) que numera las secciones en mono y marca la posición de scroll. Cero espectáculo; la autoridad está en la densidad.

**(c) Orden de secciones:** Nav → Hero-índice → **Know Before You Go** (alto, es la promesa) → Guides → Franja de confianza → Real Boyacá → Experiencia insignia → Move Like a Local → Behind the Destination → Franja proveedores → Footer. Sobre el pliegue (móvil): H1 + primera línea editorial + índice con 4 datos.

**(d) Wireframe móvil:**

```
┌──────────────────┐
│ nav (lockup·menu)│
│ FIELD GUIDE ·EN  │
│ H1 (Fraunces)    │
│ intro 2 líneas   │
│ 01 Get there  ·d │
│ 02 When       ·d │
│ 03 Eat        ·d │
│ 04 Move       ·d │
├──────────────────┤
│ KNOW BEFORE YOU  │
│ [tabla mono]     │
└──────────────────┘
```

*Anti-default:* el primer borrador tenía hero con foto panorámica + índice debajo; se eliminó la foto del hero por completo — una guía se abre por el índice, no por la portada. Eso también gana el test del placeholder.

---

### Dirección B — "The Trust Bridge"

**(a) Tesis del hero:** el miedo se disuelve con una persona concreta que responde. Hero partido: retrato (placeholder fase 2, rostro + nombre) y, al lado, el bloque de reserva completo de la experiencia insignia — anatomía §5.4 íntegra sobre el pliegue en desktop. H1: *"Someone in Duitama answers you in English."*

**(b) Elemento de firma:** **el mensaje respondido** — una conversación real maquetada (pregunta de viajero con timestamp, respuesta nuestra 27 minutos después) renderizada como hilo de chat en el hero. La prueba de la promesa, no la promesa.

**(c) Orden:** Nav (CTA Verde Reserva) → Hero rostro+chat → Experiencia insignia (bloque conversión completo) → Franja de confianza → Real Boyacá → Know Before You Go → Move Like a Local → Guides → Behind → Franja proveedores → Footer. Barra sticky inferior móvil con precio + Book (única dirección que la usa en la landing; §6.1 la pide en fichas, aquí es parte de la apuesta).

**(d) Wireframe móvil:**

```
┌──────────────────┐
│ nav ──── [Book]  │
│ H1 corto         │
│ [retrato 1:1]    │
│ chat Q ·21:14    │
│ chat A ·21:41    │
│ ── insignia ──   │
│ título Fraunces  │
│ ·SAT ·5AM ·3H    │
│ [Book · $precio] │
│ [Ask first]      │
│ sellos ×3        │
├──────────────────┤
│ sticky: $ [Book] │
└──────────────────┘
```

*Anti-default:* riesgo OTA. Se auditó: cero estrellas de rating, cero contadores de urgencia, cero "only 2 left". La prueba social es un mensaje respondido con hora, no un score.

---

### Dirección C — "5:00 AM"

**(a) Tesis del hero:** una sola imagen mental: el mercado abre a las cinco. Hero en Madrugada (#232C39), hora azul, tipografía enorme de Fraunces, un reloj en mono como eyebrow. H1: *"The market opens at five."*

**(b) Elemento de firma:** **el scroll que amanece** — el fondo de la página progresa cromáticamente Madrugada → azul pre-alba → Cielo → Neblina profunda → Neblina → casi-blanco (en la reserva) a medida que se baja; cada sección lleva un marcador de hora en mono que avanza (5:00 → 6:10 → 7:30 → …). Solo CSS, cero imágenes: LCP es texto — la dirección de mayor riesgo de performance se resuelve sin JS ni fotos.
Sub-decisión: sobre fondos oscuros, el dato verificable viaja en un **chip de papel** (fondo Neblina, texto Teja profunda) — la Teja nunca cambia de trabajo y el contraste queda AA. El dato interrumpe la atmósfera llevando su propio papel: ese contraste es la marca.

**(c) Orden:** Nav (oscura) → Hero 5:00 → Real Boyacá (5:40, doña Carmen primero) → Experiencia insignia (6:10, fondo ya claro = transaccional) → Move Like a Local (7:30) → Know Before You Go (9:00) → Franja confianza → Guides → Behind → Proveedores → Footer (vuelve a Madrugada: el ciclo cierra).

**(d) Wireframe móvil:**

```
┌──────────────────┐
│ nav oscura       │
│ ·5:00 AM (chip)  │
│ H1 ENORME        │
│ itálica 1 línea  │
│ ▼ scroll         │
├─ fondo aclara ───┤
│ ·5:40 carmen     │
│ [retrato]        │
├─ cielo → neblina┤
│ ·6:10 insignia   │
│ bloque reserva   │
└──────────────────┘
```

*Anti-default:* la versión obvia era hero con foto de amanecer + overlay. Prohibido (siluetas al atardecer/pintoresco) y además frágil sin fotos. El amanecer se cuenta con color de fondo y hora exacta, no con paisaje.

---

### Dirección D — "The Verified Network"

**(a) Tesis del hero:** el producto es la lista. Hero = **el registro de verificación** en vivo: filas reales de partners (nombre, especialidad, horario, atiende-en-inglés, fecha de verificación) con la V del isotipo como marca de chequeo. H1: *"Every name on this list was verified in person."*

**(b) Elemento de firma:** **el ledger** — estética de registro público: tabla de hairlines, sello Verified Partner como componente estructural repetido, columna "VERIFIED" en mono con fecha. Nada de stat-tiles ni contadores hero (descalificados por §8); la escala se muestra enumerando, no sumando.

**(c) Orden:** Nav → Hero-ledger → Franja de confianza (qué significa "verified": los 4 chequeos) → Red completa / Real Boyacá fusionados (cada persona es una entrada expandida del ledger) → Experiencia insignia (entrada destacada de la red) → Know Before You Go → Move Like a Local → Guides → Behind → **Franja proveedores prominente** (segunda conversión, botón outline Madrugada) → Footer.

**(d) Wireframe móvil:**

```
┌──────────────────┐
│ nav              │
│ H1               │
│ ┌ledger────────┐ │
│ │✓ Fusionario  │ │
│ │  ·TUE–SAT    │ │
│ │✓ Rugantino   │ │
│ │✓ Casa Ambient│ │
│ │✓ d.Carmen    │ │
│ └──────────────┘ │
│ what "✓" means   │
├──────────────────┤
│ entrada expandida│
└──────────────────┘
```

*Anti-default:* riesgo de frialdad. Cada fila del ledger termina en un dato gastronómico con sabor (el plato exacto, la hora del pan) — el directorio huele a comida, no a base de datos.

---

## Decisiones transversales (fase de construcción)

1. **Datos no confirmados = pendientes.** El brief solo confirma la existencia de dos datos dudosos (§10), pero la regla se extiende: **toda cifra externa no verificada** (distancias, tarifas de bus, temperaturas, precios, duraciones, cupos) entra al HTML con `.fact--pending` + `data-verify` y se lista en `PENDING-FACTS.md`. Políticas propias (cancelación, tiempo de respuesta) no son pendientes: las definimos nosotros y quedan registradas en `COPY-EN.md`.
2. **Precio en el botón (§5.4) vs honestidad (§10):** el precio de la insignia (COP 120.000) es propuesta no confirmada. Va dentro del botón Verde Reserva (la anatomía manda) y el marcador de pendiente vive en la fila de datos inmediatamente encima del botón — el botón no puede llevar subrayado punteado sin romper su lectura.
3. **CTA de nav:** Verde Reserva en nav solo cuando el ancla lleva directo al bloque de reserva (B y D). En A y C la nav usa enlace outline neutro — disciplina conservadora de color.
4. **Transición ES del registro de proveedores (§6.2):** el botón "List your business" lleva debajo una línea en mono: `Continues in Spanish · El registro es en español`. El viajero no la nota; el proveedor local la lee como bienvenida. El destino (página en español) queda fuera de alcance.
5. **Barra sticky de reserva:** solo en B. §6.1 la exige en fichas de experiencia (fuera de alcance §12); en B se adelanta como parte de su apuesta de conversión y se evalúa en la rúbrica 3.
6. **Placeholders:** `<div role="img" aria-label="[brief fotográfico]">` con gradiente de paleta + brief en mono 11px + `aspect-ratio` fijo. No se usan `<img>` hasta que existan fotos.
7. **Íconos:** set mínimo de 5 (§3.7) inline SVG, 24×24, trazo 2px, color `currentColor` heredando Madrugada, contenedor con borde hairline. Nunca color de acento.
8. **Quotes de proveedores:** las citas en itálica de Fraunces son borradores de copy pendientes de validación con cada proveedor — marcadas en `COPY-EN.md`, no en el HTML (no son "datos", son voz).
9. **JS:** un único bloque de ~30 líneas por página: log de `data-event` a `console` (stub de analítica), `scroll_depth_50`, y en B el toggle de la barra sticky. Todas las animaciones en CSS bajo `@media (prefers-reduced-motion: no-preference)`.
10. **JSON-LD:** `Organization` + `TouristDestination` en las cuatro; `Product/Offer` (precio marcado draft aquí, en el schema va el valor propuesto) y `FAQPage` donde el bloque KBYG lo soporta.

---

## Pasada 2 — Autocrítica por dirección (rúbrica §11)

### A — The Guide
- **Primer dato:** inmediato — el índice del hero lleva 4 datos en mono; la altitud está en la cabecera del índice. ✔
- **Camino a reserva (móvil):** largo por diseño (~2 pantallas de scroll + índice como atajo `05`). Es el riesgo declarado de la dirección; el índice-ancla lo mitiga. Rúbrica 3 baja, asumida.
- **Corrección hecha:** el primer borrador tenía panorámica en el hero; se eliminó — la guía abre por el índice. También se añadió tracking de sección activa en el riel (IntersectionObserver, ~15 líneas) por ser el elemento de firma.
- **Color:** Verde Reserva solo en botón Book; nav usa outline. Teja solo en `.fact`. ✔
- **Gastronomía por sección:** verificada una a una (hero caldo · KBYG caldo/sopa · guides arepas · trust changua · move panela/almojábana/longaniza · behind caldo · partners restaurante · footer "where to eat first"). ✔

### B — The Trust Bridge
- **Riesgo OTA auditado:** cero ratings, cero contadores de urgencia, cero "only X left". La prueba social es un hilo respondido con timestamps y el nombre propio del proveedor. ✔
- **Barra sticky:** solo móvil, aparece únicamente cuando el bloque de reserva no está en viewport (no duplica CTA visible). `aria-hidden` sincronizado.
- **Primer dato:** "REPLIES IN ENGLISH · WITHIN 1 H" bajo el H1; primer dato *pendiente* (caldo ~8) al final del chat. ✔
- **Camino a reserva:** 1 toque (nav Book) o 1 pantalla de scroll. Mejor de las cuatro, como pide su apuesta.

### C — 5:00 AM
- **Anti-pintoresco:** el amanecer se narra con pasos de color de fondo y reloj en mono — sin fotos de amanecer, sin siluetas. El paso intermedio `--predawn #2B3A4E` es mezcla Madrugada→Cielo; queda documentado como token derivado (no nuevo trabajo semántico).
- **Performance:** LCP es texto sobre color plano; cero imágenes. La dirección "descalificable por LCP" es en la práctica la más liviana (33 KB). ✔
- **Disciplina Teja en oscuro:** el dato viaja en chip de papel (`.fact--chip`) — Teja nunca cambia de trabajo y el contraste es AA. Los relojes narrativos (5:40, 7:30…) **no** usan Teja: no son datos verificables, son estructura narrativa.
- **Corrección hecha:** la animación de revelado quedaba invisible sin JS; se gateó con `html.js` para que sin JS todo sea visible. `prefers-reduced-motion` la elimina.
- **Itálica:** máximo una por pantalla (hero + citas de personas). Sin mezclar romana/itálica en un mismo bloque. ✔

### D — The Verified Network
- **Anti stat-tile:** el hero enumera (ledger), no suma. Nada de "número grande + label + 3 stats". ✔
- **Isotipo como marca de verificación:** se usa el isotipo COMPLETO (V + D) a 22px — la regla §3.4 prohíbe la V sola; a ese tamaño la D degrada a punto y está bien. La fila "in review" no lleva marca.
- **Frialdad mitigada:** cada fila del ledger termina en plato con nombre (caldo, cubios, pasta, desayuno de huerta); "in review" habla de comerse el papeleo. La franja de proveedores es la más prominente de las cuatro (fondo Madrugada + 3 pasos), como pide su doble conversión — botón outline, jamás Verde Reserva. ✔
- **Camino a reserva:** 1 toque (nav Book → entrada destacada).

### Transversal (post-construcción)
- **Peso:** A 38 KB · B 33 KB · C 33 KB · D 38 KB · comparador 12 KB — muy por debajo de 500 KB. Sin imágenes; LCP dominado por texto + Google Fonts con `display=swap`.
- **Auditoría "VD":** grep sobre clases, IDs y copy — cero ocurrencias.
- **`#FFFFFF`:** cero en las cuatro direcciones (un `#fff` accidental en el comparador se corrigió a `--ui-white`).
- **Distinción entre direcciones:** A = documento editorial con riel · B = comercio con rostro y chat · C = narrativa cromática oscuro→claro · D = registro tabular. Ninguna comparte layout de hero ni jerarquía.
- **Pendiente conocido:** los `og:image` apuntan a rutas futuras (Paso 8 — no hay fotos ni assets OG). Documentado en el propio HTML.
