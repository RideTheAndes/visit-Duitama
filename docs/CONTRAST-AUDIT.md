# CONTRAST-AUDIT — verificación WCAG 2.1 de la paleta

Auditoría de contraste de todos los pares texto/fondo y componentes UI realmente usados en las cuatro direcciones. Método: luminancia relativa y ratio según WCAG 2.1 (§1.4.3 texto, §1.4.11 no-texto), calculados programáticamente sobre los hex de `shared/tokens.css`. Umbrales: **4.5:1** texto normal · **3:1** texto grande (≥24px, o ≥18.66px bold) y componentes gráficos/UI.

**Fecha:** agosto 2026 · **Alcance:** A, B, C, D + comparador.

---

## Veredicto

> **Se aprueba la paleta actual. No se recomienda adoptar una paleta nueva.**
>
> El núcleo del sistema es excepcionalmente sólido: 36 de los 42 pares en uso pasan AA, y los pares estructurales (cuerpo, dato, conversión) pasan con margen — Madrugada sobre ambos fondos es AAA (12–13.5:1), el dato Teja profunda es AAA (7.5–8.4:1) y el CTA Verde Reserva cumple el 5.1:1 que el brief documenta. Las 6 fallas encontradas eran **de uso, no de tono**: colores de acento (Ruana, Páramo, Cielo) empleados como texto pequeño o anillo de foco fuera de la superficie para la que fueron calibrados. Se resolvieron con **dos tokens derivados** que conservan el trabajo semántico y el matiz de marca, más dos reglas de contexto. Cambiar la paleta habría sido rediseñar la identidad para arreglar seis celdas de una matriz; oscurecer dos acentos solo-para-texto es la vía práctica.

---

## Resultados — pares que pasan (selección estructural)

| Par (uso) | Ratio | Nivel |
|---|---|---|
| Cuerpo · Madrugada / Neblina | 12.03:1 | AAA |
| Cuerpo · Madrugada / casi-blanco | 13.47:1 | AAA |
| Cuerpo · Madrugada / Neblina profunda | 10.95:1 | AAA |
| Secundario · ink-soft / Neblina | 6.45:1 | AA |
| **Dato 13px · Teja profunda / Neblina** | **7.51:1** | **AAA** |
| Dato · Teja profunda / casi-blanco | 8.40:1 | AAA |
| **CTA · casi-blanco / Verde Reserva** | **5.09:1** | **AA** |
| CTA hover · casi-blanco / verde hover | 6.25:1 | AA |
| Link · Cielo / Neblina | 4.69:1 | AA |
| Link · Cielo / casi-blanco | 5.25:1 | AA |
| Eyebrow 12px · Páramo / Neblina | 4.74:1 | AA |
| Micro-momento itálica 22px+ · Teja / Neblina | 5.04:1 | AA (grande) |
| Punto waypoint 6px (gráfico) · Teja / Neblina | 5.04:1 | ≥3:1 ✓ |
| Altimetría (gráfico) · Páramo / Neblina | 4.74:1 | ≥3:1 ✓ |
| C · Neblina / Madrugada (footer, hero) | 12.03:1 | AAA |
| C · Neblina / pre-alba `#2B3A4E` | 9.87:1 | AAA |
| C · casi-blanco / Cielo (escena hora azul) | 5.25:1 | AA |
| C · dato en chip de papel sobre oscuro | 7.51:1 | AAA |
| Franja ocre / Madrugada (footer facts, quotes oscuras) | 4.59:1 | AA |
| Todos los rgba() compuestos de C/D sobre Madrugada | 6.0–9.1:1 | AA–AAA |

## Resultados — fallas encontradas y corrección aplicada

| # | Par | Ratio | Umbral | Corrección |
|---|---|---|---|---|
| 1 | Ruana `#BB8B2E` como texto 11px (tag "Moderate") / casi-blanco | 2.93:1 | 4.5 | Nuevo token `--ocre-text: #8A6415` (5.13:1) |
| 2 | Ruana como texto 11px / Neblina | 2.62:1 | 4.5 | `--ocre-text` (4.58:1) |
| 3 | Ruana badge "In review" (D) / casi-blanco | 2.93:1 | 4.5 | `--ocre-text` en texto y borde |
| 4 | Páramo `#5B6E4F` como texto 12px / Neblina profunda | 4.31:1 | 4.5 | Nuevo token `--verde-text: #55684A` (4.71:1) |
| 5 | Anillo de foco Cielo / Madrugada (footers, franjas oscuras, escenas de C) | 2.57:1 | 3.0 | En contenedores oscuros el anillo pasa a Neblina (12.03:1); sobre Cielo, a casi-blanco (5.25:1) |
| 6 | C · lead `rgba(casi-blanco,.88)` / Cielo | 4.47:1 | 4.5 | Alpha al 100% (5.25:1) |

## Reglas de uso resultantes

1. **`--ocre` (Ruana original)** queda para: bordes y subrayado punteado de pendiente (decorativos), la D del isotipo sobre oscuro, y texto sobre fondos Madrugada (4.59:1 ✓). **Nunca como texto <18px sobre fondos claros** — ahí se usa `--ocre-text`.
2. **`--verde` (Páramo original)** queda para: gráficos de ruta (≥3:1 en todos los claros ✓) y eyebrows sobre Neblina/casi-blanco (4.74–5.30:1 ✓). Sobre Neblina profunda, texto en `--verde-text`.
3. **Anillo de foco:** Cielo sobre claros; Neblina sobre oscuros; casi-blanco sobre Cielo. (En `shared/tokens.css`: utilidad `.on-dark`.)
4. Los tonos derivados **no crean trabajos semánticos nuevos**: `--ocre-text` sigue siendo "dificultad media / pendiente", `--verde-text` sigue siendo "etiqueta editorial". Solo cambia la luminancia cuando el color debe leerse como texto pequeño.

## Qué se descartó y por qué

- **Adoptar una paleta nueva:** descartado. Las fallas no venían de los tonos centrales (todos AAA/AA holgados) sino de estirar acentos decorativos a rol de texto. Una paleta nueva rompería la identidad heredada (§3 del brief: "restricciones, no sugerencias") sin ganar nada que dos derivados no ganen.
- **Aclarar los fondos en vez de oscurecer los acentos:** descartado — Neblina/casi-blanco son la base de la marca y ya son los fondos más claros posibles sin caer en `#FFFFFF` (prohibido).
- **Subir el tamaño de los tags a 18px+ para usar el umbral de texto grande:** descartado — 11px mono uppercase es parte del lenguaje del sistema; cambiar la tipografía para salvar un color es la cola moviendo al perro.
