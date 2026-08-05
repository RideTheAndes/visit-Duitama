# BRIEF — Landing Page Visit Duitama
### Documento de encargo para Claude Code · v1.0 · Agosto 2026

> **Cómo usar este documento:** ponelo en la raíz del repo como `BRIEF.md`. Es la única fuente de verdad para esta fase. Todo lo que se construya se valida contra este archivo. Si algo no está aquí y hay que decidirlo, se decide y se documenta en `docs/DECISIONS.md` — no se improvisa en silencio.

---

## 0. Resumen del encargo en una frase

Explorar **cuatro direcciones distintas de landing page** para Visit Duitama — mismo sistema de diseño, mismo inventario de contenido, distinta jerarquía y distinto trabajo dominante — y entregarlas como prototipos HTML autónomos, comparables lado a lado, para decidir cuál se lleva a producción.

**No es** construir el sitio final. **Es** producir evidencia visual suficiente para tomar una decisión con criterio.

---

## 1. Contexto de marca (leer completo antes de escribir una línea de código)

### Qué es Visit Duitama

Plataforma de marketing de destino y experiencias, en inglés, dirigida al viajero internacional, operada desde Duitama, Boyacá, Colombia. Fase actual: pre-lanzamiento. Esta landing es el **Paso 9 de la Hoja de Ruta** (sitio web MVP).

### Propósito de doble dirección

- **Hacia afuera:** ser la voz local que guía al viajero internacional con autoridad y calidez — eliminando la *fricción del miedo* y convirtiendo a Duitama en un destino con sentido.
- **Hacia adentro:** demostrarle a Duitama que su valor es mayor de lo que ella misma cree.

El turista extranjero no es el protagonista: es el catalizador. El protagonista es el dueño del restaurante que por primera vez cobra lo que su trabajo vale.

### Esencia

> *El experto residente que convierte el potencial invisible en valor visible.*

### Mantra interno

> *"No están creyendo en nosotros. Están creyendo en sí mismos."*

### Arquetipo

**El Sabio Explorador con alma de Activador.** Conoce el territorio mejor que nadie y no necesita demostrarlo. No observa: actúa, contagia, abre puertas.

### Ventaja competitiva estructural

Somos los únicos que hablan de este territorio **en inglés, desde adentro**. Ninguna agencia de Bogotá puede replicar esto. La landing tiene que *sentirse* así: no como un portal de turismo, sino como el amigo que vive allá y responde con datos exactos.

### Norte editorial (test obligatorio para cada sección)

> *"Si alguien lee esto desde Berlín o desde el mercado de Duitama, ¿los dos sienten que esto fue hecho para ellos?"*

---

## 2. Las dos reglas duras que gobiernan todo

### 2.1 "Concreto siempre"

**Cada sección de la landing debe contener al menos un dato verificable y específico** — hora, nombre propio, precio, distancia, altitud, día de la semana. Nunca adjetivos como sustituto de información.

- ✅ `The market opens at 5. The caldo runs out by 8.`
- ❌ `An unforgettable experience that will awaken your senses.`

Los datos verificables viven **siempre en IBM Plex Mono, color Teja profunda, precedidos por el punto Teja de 6px**. Esa combinación es la firma del sistema: entrena al usuario en segundos a reconocer "esto es un hecho exacto".

### 2.2 Anti-pintoresco

La marca rechaza explícitamente la estética de postal rural:

**Prohibido:** tipografías handwritten o caligráficas · motivos florales, heráldicos o de escudo municipal · HDR saturado · siluetas al atardecer · dron genérico a 90° · fotos de stock · modelos · "Colombia is magical realism" · banderas y colores nacionales como recurso decorativo · texturas de papel rasgado, sellos vintage, cintas.

La calidez humana la aporta la **itálica de Fraunces**, no una fuente escrita a mano. Nunca.

---

## 3. Sistema de diseño (heredado — NO se rediseña, se aplica)

Estos tokens vienen de *Identidad Visual v1.0* y *Sistema Digital v1.1*. Son restricciones, no sugerencias. Las cuatro direcciones comparten exactamente estos valores.

### 3.1 Color y su trabajo semántico

```css
:root{
  --paper:        #ECEEE6;  /* Neblina — fondo de marca, secciones editoriales */
  --ui-white:     #FAFAF7;  /* Casi-blanco cálido — fondo transaccional. NUNCA #FFFFFF */
  --paper-deep:   #E2E4D8;  /* Alternancia, callouts */
  --ink:          #232C39;  /* Madrugada — texto, footer, estados activos */
  --ink-soft:     #4C5561;  /* Texto secundario */
  --terracota:    #A8461F;  /* Teja — EXCLUSIVO: marcador de dato verificable */
  --terracota-deep:#7E3416; /* Teja profunda — texto de dato en mono */
  --verde:        #5B6E4F;  /* Páramo — etiquetas editoriales, gráficos de ruta */
  --cta:          #1F7A4D;  /* Verde Reserva — EXCLUSIVO CONVERSIÓN */
  --cta-hover:    #166B41;
  --ocre:         #BB8B2E;  /* Ruana — dificultad media, D del isotipo en oscuro */
  --cielo:        #3E6E8E;  /* Cielo Boyacense — links y estados de foco */
  --line:         rgba(35,44,57,0.14);
}
```

**Reglas inviolables de color:**

| Regla | Detalle |
|---|---|
| Verde Reserva `#1F7A4D` | Aparece **únicamente** en botones de reserva/compra y widgets transaccionales. En ningún otro elemento del sitio. Jamás. Si el ojo lo ve, significa "puedo comprar aquí". |
| Teja `#A8461F` | **Únicamente** marcador de dato verificable (punto + texto mono). Jamás en botones. |
| Cielo Boyacense | Links de texto y anillo de foco. No es CTA (corrección documentada respecto a v1.0). |
| Fondos | Páginas transaccionales = casi-blanco. Secciones editoriales = Neblina. En páginas transaccionales el color de marca se retira y la fotografía + el botón toman el protagonismo. |

### 3.2 Tipografía — tres capas

```css
/* Fraunces (serif, 600 romana / 500 itálica) — AUTORIDAD */
/* Libre Franklin (sans, 300–700) — USABILIDAD */
/* IBM Plex Mono (400/500) — DATO */
```

| Capa | Familia | Uso | Escala |
|---|---|---|---|
| 1 · Autoridad | Fraunces 600 | H1–H2, nombres de experiencias, cabeceras de patrimonio y gastronomía | H1 desktop 48–64px / móvil 32–40px · H2 24–36px. **Nunca en párrafos largos.** |
| 2 · Usabilidad | Libre Franklin | Cuerpo, menús, filtros, formularios, botones | Cuerpo mín. 16px móvil / 17–18px desktop. Line-height 1.5–1.6. Labels 500, 13–14px, sentence case. |
| 3 · Dato | IBM Plex Mono | Precios, distancias, horarios, altimetría, capacidad, políticas | 11–15px. Uppercase con letter-spacing 0.1–0.16em solo en eyebrows. |
| Micro-momento humano | Fraunces **itálica** 500 | Citas de proveedores, una línea por pantalla máximo | 22–28px, color Teja |

**Regla dura heredada:** nunca itálica y romana de Fraunces mezcladas en el mismo bloque de texto.

### 3.3 El elemento de firma — el punto de referencia (waypoint)

```css
.fact{
  font-family:'IBM Plex Mono',monospace;
  font-size:13px;
  color:var(--terracota-deep);
  display:inline-flex; align-items:center; gap:8px;
}
.fact::before{
  content:""; width:6px; height:6px; border-radius:50%;
  background:var(--terracota); flex-shrink:0;
}
```

Este componente es lo que hace reconocible a la marca. Debe aparecer en todas las direcciones, en todas las secciones, y debe ser el elemento más repetido del sitio después del texto de cuerpo.

### 3.4 Isotipo — código exacto, no se rediseña

La V asimétrica (Visit) verificando la D (Duitama). Lectura: *"comprobado: Duitama"*.

```html
<!-- Sobre fondo claro -->
<svg viewBox="0 0 100 110" width="40" height="44" aria-hidden="true">
  <path d="M24 30 L44 66 L80 12" fill="none" stroke="#232C39"
        stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M37 80 L37 102 A11 11 0 0 0 37 80 Z" fill="#A8461F"/>
</svg>

<!-- Sobre Madrugada -->
<svg viewBox="0 0 100 110" width="40" height="44" aria-hidden="true">
  <path d="M24 30 L44 66 L80 12" fill="none" stroke="#ECEEE6"
        stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M37 80 L37 102 A11 11 0 0 0 37 80 Z" fill="#BB8B2E"/>
</svg>
```

**Reglas del isotipo:**
- Prohibida la rotación y el espejado (la D espejada es una C).
- Respiro V–D = 1× el grosor del trazo. Inviolable.
- Bajo 32px, el trazo y la D engordan proporcionalmente (compensación óptica). A 16px la D lee como punto — es degradación elegante, está bien.
- La letra D **solo existe dentro del isotipo y del sello Verified Partner**. Jamás como viñeta, marcador o adorno editorial.
- Si alguien "simplifica" el símbolo quitándole la D, lo devuelve al montón genérico. No se toca.

### 3.5 Wordmark y lockup

```
VISIT                      ← label pequeño, Libre Franklin 500, tracking amplio
Duitama                    ← Fraunces 600, dominante
2.590 M ASL · BOYACÁ, CO   ← línea de dato, IBM Plex Mono, Teja profunda
```

El wordmark incorpora el primer dato verificable dentro de la marca misma. **La altitud está pendiente de verificación — ver §10.**

Lockup horizontal para navbar: isotipo 26×29px + "Visit Duitama" en Fraunces 600 16px, gap 9px.

### 3.6 Prohibición de copy

**Jamás abreviar la marca como "VD"** en textos, handles, hashtags, nombres de archivo, nombres de clase CSS, IDs, nombres de componente o comentarios de código. "VD" es abreviatura anticuada de enfermedad venérea en inglés. Siempre "Visit Duitama" completo o `visitduitama`. Esta regla aplica también al código fuente — nada de `vd-header`, `vdLogo`, `VDButton`.

### 3.7 Iconografía

Pictogramas literales (no abstractos) · trazo uniforme 2px sin rellenos · retícula 24×24 · esquinas redondeadas · siempre dentro de contenedor de contraste · **el ícono nunca lleva color de acento** (los colores tienen trabajos semánticos reservados) · estado activo invierte: fondo Madrugada, trazo Neblina · acompañado de label en Franklin 13px en su primera aparición.

Set mínimo: senderismo · ciclismo · gastronomía de origen · hospedaje sostenible · punto de interés.

---

## 4. Dirección fotográfica (y cómo se representa sin fotos todavía)

No hay banco fotográfico aún (es el Paso 8 de la Hoja de Ruta). **No se usa stock, ni Unsplash, ni imágenes generadas.** Cada slot de imagen se representa con un placeholder CSS que:

1. Usa un degradado derivado de la paleta (Páramo→verde profundo para paisaje; Teja→marrón profundo para gastronomía; Madrugada→azul para hora azul).
2. Lleva **encima, en mono 11px, el brief fotográfico del slot**: encuadre, hora del día, sujeto, y si aplica el nombre del proveedor.
   Ej.: `SLOT 03 · plano medio · Julián Tolosa emplatando · luz de ventana · 4:3`
3. Respeta el aspect-ratio final exacto (para que el layout no se mueva cuando lleguen las fotos reales).

**Las dos fases fotográficas del funnel:**

| Fase | Dónde | Composición | Trabajo psicológico |
|---|---|---|---|
| 1 · Inspiración | Hero y cabeceras | Panorámica nítida con figura humana al **3–8% del encuadre**. Horizonte alto o bajo, nunca centrado. Hora azul o media mañana. | Asombro + "yo podría estar ahí" |
| 2 · Conversión | Listados y bloques de compra | Plano medio/cerrado. Rostros visibles, interacción genuina. **El proveedor aparece con nombre propio** en caption u overlay. | Proyección y empatía — convierte lo abstracto en concreto |

Formatos: 4:3 en listados, 1:1 en tarjetas móviles. Consistencia de aspect-ratio en toda la grilla — la irregularidad visual es fricción.

---

## 5. Inventario de contenido obligatorio

Las cuatro direcciones usan **exactamente el mismo contenido**. Lo que cambia es el orden, el peso, el ritmo y qué queda por encima del pliegue. Esto hace la comparación justa.

### 5.1 Los cuatro pilares editoriales — cada uno debe estar representado

| Pilar | Qué es | Cómo se ve en la landing |
|---|---|---|
| **Know Before You Go** | Información práctica, honesta y específica que no está en TripAdvisor | Bloque de datos duros: altitud, cómo llegar desde Bogotá, cuándo venir, clima, dinero, seguridad. Denso en mono. |
| **Real Boyacá** | Personas, sabores e historias sin romantizar | Rostros con nombre propio: Julián Tolosa (Fusionario), Davide Baiocco (Rugantino di Roma), Jahir (Casa Ambient), doña Carmen |
| **Move Like a Local** | Rutas y experiencias activas — ciclismo, caminatas, mercados, madrugadas | Componente de altimetría + tarjetas de ruta. Puente orgánico con Ride The Andes, **sin ser su vocero** |
| **Behind the Destination** | El proceso de construir y de elevar a los proveedores | Franja de "estamos construyendo esto" + puerta de entrada para proveedores locales |

### 5.2 La gastronomía es el idioma, no una sección

Como el inglés para un diplomático: no es el tema, es el vehículo. **En cada sección de la landing debe haber, en algún punto, una mesa, un olor, un sabor o un nombre de plato** — incluso en la sección de ciclismo, incluso en la de cómo llegar. Si una sección no tiene eso, no está terminada.

### 5.3 Secciones a incluir (el orden lo define cada dirección)

1. **Nav** — lockup + máximo 4 destinos (Experiences · Guides · Partners · About) + CTA
2. **Hero** — tesis de la marca en una pantalla
3. **Franja de confianza** — por qué este sitio y no una agencia de Bogotá. El "puente de confianza".
4. **La experiencia insignia** — un producto impecable con anatomía de conversión completa (§6)
5. **Know Before You Go** — bloque de datos duros
6. **Real Boyacá** — proveedores con rostro y nombre
7. **Move Like a Local** — altimetría + rutas
8. **Guides / Blog** — 3 artículos destacados (SEO)
9. **Behind the Destination** — construcción en público
10. **Franja para proveedores locales** — segunda ruta de conversión (§6.2)
11. **Footer** — contacto, WhatsApp, `@visitduitama`, sello Verified Partner

### 5.4 Anatomía del bloque de conversión (obligatoria donde haya reserva)

```
Título en Fraunces
  ↓
Dato en Teja/mono (día · hora · duración · capacidad)
  ↓
CTA Verde Reserva con el precio VISIBLE DENTRO del botón
  ↓
Acción secundaria en outline neutro ("Ask a question first")
  ↓
Sellos de confianza — máximo 3, a ≤24px del botón
  ↓
Métodos de pago visibles antes del checkout (Apple Pay · Google Pay · PSE)
```

Sellos de confianza: viven **siempre dentro del bloque de reserva**, nunca en el footer ni en una página "About". La disipación del riesgo tiene que ocurrir en el milisegundo de la decisión. Estilo: outline discreto, mono 11px, check en Verde Reserva. **Más de 3 sellos genera sospecha, no confianza.**

---

## 6. Requisitos de CRO

### 6.1 Ruta del viajero (conversión primaria — Verde Reserva)

- **Móvil primero.** Más del 60% del tráfico llegará por móvil, casi todo desde Instagram, donde la intención aún es blanda.
- **Barra de reserva fija (sticky)** con precio + CTA anclados al borde inferior en fichas de experiencia. El usuario nunca debe "volver a subir" para reservar.
- **Reserva en máximo 3 pantallas:** fecha → datos mínimos (nombre + email + WhatsApp) → pago. Apple Pay / Google Pay / PSE como primera opción visual; el formulario de tarjeta es fallback, no default. *(En esta fase se maqueta el flujo, no se integra pasarela.)*
- **Targets táctiles ≥48×48px**, separación ≥8px.
- **Copy transaccional: estructura sobre prosa.** Frases de máximo 12 palabras. Verbos de acción en botones: "Book now", "Choose a date" — **nunca "Submit"**. La voz narrativa vive en el blog; la ficha de compra habla en hechos.
- Un mismo verbo mantiene su nombre en todo el flujo: el botón que dice "Book" produce una confirmación que dice "Booked".

### 6.2 Ruta del proveedor local (conversión secundaria — NO Verde Reserva)

Esta es la ruta que ninguna plataforma turística tiene y que es la mitad del propósito de la marca. Es un segundo objetivo de conversión, pero **no puede usar Verde Reserva** — ese color está reservado a compra. Usa botón outline Madrugada.

Copy de esta franja: en inglés en el sitio público, pero el destino del enlace es una página que puede recibir al proveedor en español. Documentar esa transición.

Mensaje base (adaptar por dirección): *"We list local providers who serve travelers in English. Listing is free."* — sin discurso de desarrollo comunitario, sin manifiesto. **El propósito se muestra, no se predica.**

---

## 7. Requisitos técnicos

### 7.1 Stack

- **HTML + CSS + JS vanilla.** Sin React, sin frameworks, sin build step.
- Cada dirección es **un archivo `.html` autónomo** que abre con doble clic, sin servidor. Fuentes por Google Fonts CDN.
- Los tokens van inline en cada archivo **y** duplicados en `shared/tokens.css` para reuso futuro.
- HTML semántico y limpio: es probable que la implementación final migre a Webflow o WordPress, así que la estructura debe ser traducible.
- **Sin localStorage ni sessionStorage.** Estado solo en memoria.

### 7.2 Presupuesto de performance

| Métrica | Objetivo |
|---|---|
| LCP | < 2.5s |
| Peso total del documento | < 500KB (sin fuentes) |
| Hero móvil (cuando haya foto real) | ≤ 200KB, WebP/AVIF con lazy loading |
| JS | Solo lo indispensable. Animaciones en CSS. |

Justificación de marca, no solo técnica: el viajero puede estar decidiendo desde una red 4G débil en un hostal de Villa de Leyva. **La velocidad es parte de la "certeza tranquila".**

### 7.3 Accesibilidad — piso de calidad, no se anuncia

- WCAG 2.1 AA como mínimo. Contraste verificado: Madrugada sobre ambos fondos es AAA; Verde Reserva sobre casi-blanco es 5.6:1.
- Anillo de foco visible en Cielo Boyacense, 2px, con offset. Navegación completa por teclado.
- `prefers-reduced-motion: reduce` respetado en toda animación.
- Landmarks semánticos, un solo `<h1>`, jerarquía de encabezados correcta, skip link.
- `alt` de cada placeholder = el brief fotográfico del slot (así el alt real ya queda escrito cuando llegue la foto).

### 7.4 SEO

Idioma: **inglés, 100%.** `lang="en"`. Sin versión en español todavía (evaluación a 6–12 meses post-lanzamiento).

- `<title>`, meta description, Open Graph y Twitter cards completos por dirección.
- JSON-LD: `TouristDestination`, `Organization`, `Product`/`Offer` para la experiencia insignia, `FAQPage` para el bloque Know Before You Go.
- Intenciones de búsqueda objetivo a las que la landing debe hacer puente:
  `things to do in Duitama` · `where to eat in Duitama Colombia` · `how to get from Bogotá to Duitama` · `Boyacá food guide` · `cycling in the Colombian Andes`
- URLs limpias, sin `vd` en ninguna ruta.

### 7.5 Analítica (instrumentación, sin tracker)

Marcar con `data-event` los puntos de decisión, sin instalar ninguna herramienta:
`data-event="book_click"` · `"secondary_cta"` · `"partner_signup"` · `"guide_click"` · `"whatsapp_click"` · `"scroll_depth_50"`.

---

## 8. Las cuatro direcciones a explorar

Mismo sistema, mismo contenido, distinta apuesta. Cada dirección debe defenderse sola: si dos direcciones se parecen, una de las dos está mal ejecutada.

### Dirección A — "The Guide"
**Apuesta:** la landing es la puerta a un cuerpo de conocimiento, no un catálogo.
**Trabajo dominante:** autoridad y captura orgánica. El visitante llega desde Google buscando información práctica y descubre que aquí hay alguien que sabe.
**Cómo se ve:** densa en datos desde el hero. Bloque Know Before You Go alto en la página. Tipografía editorial, ritmo de artículo largo, mono por todas partes. La reserva aparece como consecuencia natural de la confianza, no como interrupción.
**Riesgo a vigilar:** conversión inmediata baja; puede leerse como blog sin negocio.

### Dirección B — "The Trust Bridge"
**Apuesta:** el miedo es la fricción real; se elimina mostrando personas reales con nombre, en inglés, respondiendo.
**Trabajo dominante:** conversión. Rostro + experiencia insignia + sellos por encima del pliegue.
**Cómo se ve:** hero de fase 2 (rostro y acción, no paisaje). Bloque de reserva completo visible temprano. Prueba social y respuesta humana ("we answer in English, usually within the hour").
**Riesgo a vigilar:** puede terminar pareciéndose a cualquier OTA. Lo que la salva es el nombre propio del proveedor y el dato exacto. Auditar duro.

### Dirección C — "5:00 AM"
**Apuesta:** un destino desconocido se recuerda por una imagen mental, no por una lista de features.
**Trabajo dominante:** memorabilidad de marca. Narrativa de la madrugada boyacense como hilo conductor de todo el scroll.
**Cómo se ve:** apertura cinematográfica en hora azul, progresión cromática que amanece a medida que se baja, itálica de Fraunces en momentos exactos, silencio y respiro entre secciones. Los datos aparecen como interrupciones precisas en mono — el contraste entre atmósfera y dato *es* la marca.
**Riesgo a vigilar:** es la dirección con mayor riesgo de caer en lo pintoresco y de reventar el presupuesto de LCP. Si esta dirección no puede cumplir <2.5s, está descalificada.

### Dirección D — "The Verified Network"
**Apuesta:** el producto no es un tour, es una red de proveedores verificados. Esto es lo que más se parece al propósito interno de la marca.
**Trabajo dominante:** doble conversión — el viajero encuentra dónde comer y el proveedor quiere estar en la lista.
**Cómo se ve:** el sello Verified Partner como elemento estructural. Grilla de proveedores con datos duros (horario, especialidad, si atiende en inglés). La experiencia insignia es una entrada más de la red, destacada.
**Riesgo a vigilar:** frialdad de directorio; poca emoción para el viajero que aún no sabe si quiere venir.

### Requisitos comunes a las cuatro

- Cada dirección abre con un **elemento de firma propio** — un solo momento memorable, no cuatro efectos dispersos.
- Cada dirección incluye las 11 secciones del §5.3, aunque con jerarquías distintas.
- Cada dirección pasa el test de Berlín/mercado en cada sección.
- Cada dirección es responsive real hasta 360px de ancho.
- **Ninguna dirección puede tener la resolución "hero con número grande + label pequeño + tres stats + degradado de acento".** Ese es el default de la industria; aquí es descalificación automática.

---

## 9. Entregables

```
/
├── BRIEF.md                        ← este documento
├── index.html                      ← comparador: las 4 direcciones lado a lado + rúbrica
├── explorations/
│   ├── a-the-guide.html
│   ├── b-trust-bridge.html
│   ├── c-five-am.html
│   └── d-verified-network.html
├── shared/
│   └── tokens.css                  ← tokens canónicos para reuso futuro
└── docs/
    ├── DECISIONS.md                ← qué se decidió, por qué, qué se descartó
    ├── COPY-EN.md                  ← todo el copy en inglés, editable sin tocar HTML
    ├── PENDING-FACTS.md            ← datos sin verificar (§10)
    └── PHOTO-BRIEF.md              ← lista de slots fotográficos con encuadre y sujeto
```

`index.html` debe permitir ver las cuatro en iframes móvil y desktop simultáneamente, con la rúbrica del §11 al lado. Ese archivo es la herramienta de decisión.

---

## 10. Datos pendientes de verificación — regla de honestidad

Hay dos datos que **todavía no están confirmados** y que aparecen en el material de marca:

1. **Hora exacta de apertura del mercado campesino** (se ha venido usando 5:00 AM sábados).
2. **Altitud precisa de Duitama** (se ha venido usando ~2.590 m).

Una marca cuya regla es "concreto siempre" no puede publicar un dato falso. Por lo tanto:

```html
<span class="fact fact--pending" data-verify="market-opening-hour">
  Saturdays · 5:00 AM
</span>
```

`.fact--pending` se renderiza con un subrayado punteado en Ruana y un `title` que dice `Pending verification`. Todos los pendientes se listan automáticamente en `docs/PENDING-FACTS.md`. **Ningún dato inventado entra al HTML sin este marcador.** Si un dato no se conoce, se marca; no se rellena.

Esta regla aplica también a precios, distancias y nombres de proveedores no confirmados.

---

## 11. Rúbrica de evaluación

Cada dirección se puntúa 1–5 en:

| # | Criterio | Pregunta de control |
|---|---|---|
| 1 | Test de Berlín/mercado | ¿Un alemán planeando su viaje y un proveedor de Duitama sienten los dos que fue hecho para ellos? |
| 2 | Tiempo al primer dato verificable | ¿Cuántos segundos pasan antes de ver un hecho exacto en mono? Menos es mejor. |
| 3 | Camino a la reserva | ¿Cuántos toques desde el hero móvil hasta el botón de reserva? |
| 4 | Test de la agencia de Bogotá | ¿Alguien podría creer que esto lo hizo una agencia sin presencia local? Si sí, falló. |
| 5 | Presupuesto de performance | LCP y peso dentro de objetivo. |
| 6 | Test del placeholder | ¿La página se sostiene sin fotografía real? Si solo funciona con fotos bonitas, la estructura es débil. |
| 7 | Auditoría anti-pintoresca | Cero elementos de la lista prohibida del §2.2. |
| 8 | Cobertura de pilares | Los cuatro pilares presentes y reconocibles. |
| 9 | Gastronomía transversal | ¿Hay mesa, olor, sabor o nombre de plato en cada sección? |
| 10 | Disciplina de color | Verde Reserva solo en conversión, Teja solo en dato. Cero excepciones. |

---

## 12. Fuera de alcance en esta fase

Explícitamente **no** se construye ahora:

- Backend, base de datos, autenticación, pasarela de pago real (el flujo se maqueta, no se integra).
- CMS o blog funcional (se maquetan 3 tarjetas de artículo con enlaces muertos).
- Versión en español del frontend público.
- Newsletter, tienda de merch, membresías, guías premium, YouTube, TikTok.
- Sistema de reservas con disponibilidad real.
- Página de detalle de experiencia completa (solo el bloque de conversión dentro de la landing).

Cada canal nuevo antes de tener los dos primeros funcionando bien es una distracción que diluye la energía.

---

## 13. Prompt inicial sugerido para Claude Code

> Leé `BRIEF.md` completo antes de escribir código.
>
> Trabajá en dos pasadas. **Pasada 1 — plan:** para cada una de las cuatro direcciones, escribí en `docs/DECISIONS.md` un plan compacto de máximo 200 palabras con (a) la tesis del hero, (b) el elemento de firma único, (c) el orden de las 11 secciones y qué queda sobre el pliegue, (d) un wireframe ASCII móvil. Revisá ese plan contra el brief: si alguna parte se lee como el default que producirías para cualquier landing de turismo, reescribila y anotá qué cambiaste y por qué. No escribas HTML hasta que las cuatro tesis sean claramente distintas entre sí.
>
> **Pasada 2 — construcción:** construí las cuatro en orden A, B, C, D. Después de cada una, autocrítica contra la rúbrica del §11 y corregí antes de pasar a la siguiente. Al final construí `index.html` como comparador.
>
> Regla de oro mientras construís: si estás por escribir un adjetivo donde podría ir un dato, pará y poné el dato — o marcalo como pendiente.

---

## 14. Norte

> *"No salimos cuando todo esté listo. Salimos cuando haya suficiente para ser honestos con el viajero y con Duitama."*

> *"La velocidad, la claridad y el precio exacto también son formas de decir: puedes confiar en nosotros."*

---

*Visit Duitama — Brief de Landing Page v1.0 · Agosto 2026 · Deriva de ADN de Marca v2.0, Línea Editorial v1.0, Sistema Digital v1.1, Isotipo v2.1 y Hoja de Ruta (Paso 9).*
