# Visit Duitama — exploración de landing (Paso 9)

Cuatro direcciones de landing page para Visit Duitama — mismo sistema de diseño, mismo inventario de contenido, distinta jerarquía — entregadas como prototipos HTML autónomos para decidir cuál va a producción. La fuente de verdad de esta fase es [`BRIEF.md`](BRIEF.md).

## Cómo evaluar

Abrí [`index.html`](index.html) (doble clic, sin servidor): muestra las cuatro direcciones en iframes móvil/desktop con la rúbrica del §11 al lado. Cada dirección también abre sola:

| Dirección | Apuesta | Archivo |
|---|---|---|
| A · The Guide | Autoridad editorial y captura orgánica | [`explorations/a-the-guide.html`](explorations/a-the-guide.html) |
| B · The Trust Bridge | Conversión: rostro + reserva sobre el pliegue | [`explorations/b-trust-bridge.html`](explorations/b-trust-bridge.html) |
| C · 5:00 AM | Memorabilidad: el scroll que amanece | [`explorations/c-five-am.html`](explorations/c-five-am.html) |
| D · The Verified Network | Doble conversión: el registro verificado | [`explorations/d-verified-network.html`](explorations/d-verified-network.html) |

## Estructura

- `shared/tokens.css` — tokens canónicos (duplicados inline en cada HTML).
- `docs/DECISIONS.md` — planes de la Pasada 1, decisiones y autocrítica contra la rúbrica.
- `docs/COPY-EN.md` — todo el copy en inglés, editable sin tocar HTML.
- `docs/PENDING-FACTS.md` — registro maestro de datos sin verificar (subrayado punteado Ruana en las páginas).
- `docs/PHOTO-BRIEF.md` — slots fotográficos con encuadre, sujeto y ratio (los placeholders llevan el brief encima).

Sin frameworks, sin build, sin trackers. Los puntos de decisión están marcados con `data-event` para instrumentar después.
# visit-Duitama
El repo de Visit Duitama
