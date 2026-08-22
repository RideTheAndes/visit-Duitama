# Rappi en Duitama y viabilidad de una plataforma local de domicilios

**Investigación de escritorio · Agosto 2026 · v1.0**

> Alcance: (1) qué tan presente está Rappi en Duitama hoy, (2) qué tan realista es montar una
> plataforma equivalente con alcance municipal, (3) infraestructura, permisos y costos reales.
> Todo dato con fuente va enlazado al final. Todo dato sin fuente verificable está marcado ⏳ y
> vive en la tabla del §12 — misma regla que `docs/PENDING-FACTS.md`: nada inventado se presenta
> como hecho.

---

## 0. Veredicto en cinco líneas

1. **Rappi ya opera Duitama en serio**, no de forma marginal: ~160 restaurantes listados,
   supermercados (Éxito/Hiper Express, Tatá, Colsubsidio), droguerías (La Rebaja, Colsubsidio) y
   reclutamiento activo de repartidores en la ciudad.
2. **Copiar Rappi a escala Duitama no cierra números.** El mercado municipal soporta un negocio de
   ~COP 200–450 millones de ingreso anual en régimen de crucero, no una startup de venture.
3. **Sí es realista un negocio rentable y pequeño** si se ataca lo que Rappi hace mal en ciudad
   intermedia: comisión inasumible para el comercio local, catálogo corto (tiendas de barrio,
   fruvers, ferreterías, gas, agua, mandados), efectivo y soporte humano local.
4. **El cuello de botella no es la tecnología** (COP 25–200 M según ruta), sino densidad de pedidos,
   oferta confiable de domiciliarios y caja para aguantar 18–24 meses.
5. **El riesgo regulatorio cambió de signo en 2025–2026**: la Ley 2466 de 2025 y el Decreto 0991 de
   2026 obligan a aportes a seguridad social por repartidores de plataformas (60% plataforma / 40%
   trabajador en salud y pensión; 100% ARL a cargo de la plataforma). Eso encarece el modelo de
   flota propia y **favorece al que ya tiene escala**. El modelo que menos se expone es el que no
   controla la flota.

---

## 1. Qué hay hoy en Duitama

### 1.1 Rappi

| Señal | Evidencia |
|---|---|
| Cobertura de restaurantes | Página de ciudad activa: *"Comida a domicilio Duitama en 160 restaurantes"* |
| Verticales activas | Restaurantes, mercado/supermercados, farmacias (La Rebaja, Colsubsidio), marcas (Tatá, Éxito Hiper Express, Bocatos, Milkshake Duitama) |
| Oferta laboral | Landing propia `rappi.com.co/repartidor/duitama` → busca flota localmente |
| Contexto nacional | En nov-2025 Rappi relanzó operación en **más de 20 ciudades intermedias**, con meta declarada de llegar a **50 ciudades** en Colombia; Turbo (entrega en minutos) se extendió a 7 ciudades nuevas |
| Crecimiento en intermedias | Ibagué +63%, Popayán +47%, Cartagena +45% en pedidos año contra año |

**Lectura:** Duitama no es un mercado virgen. La demanda ya está educada (la gente sabe pedir por
app, pagar en app y esperar 35–45 min) y eso **baja el costo de evangelización** para un entrante.
Pero también significa que el entrante no compite contra la nada: compite contra una marca con
inversión en marketing nacional, cupones y usuarios con la app ya instalada.

### 1.2 Los demás

- **iFood y Domicilios.com salieron/consolidaron** del mercado colombiano; el duopolio efectivo hoy
  es **Rappi + DiDi Food**. No hay evidencia pública de que DiDi Food opere Duitama ⏳ (su expansión
  documentada va por Medellín, Costa Caribe, Santanderes).
- **Competencia local existente:** hay al menos un operador local visible — `domicilios.enduitama.com`,
  que se anuncia como servicio de domicilios de Duitama con pedidos por WhatsApp, seguimiento y
  pagos digitales. No pude auditar su catálogo ni su tracción desde este entorno ⏳; **es la primera
  visita de campo obligatoria** antes de invertir un peso.
- **El canal real dominante en ciudad intermedia sigue siendo WhatsApp + teléfono + domiciliario
  propio del restaurante.** Ese, y no Rappi, es el competidor de volumen.

---

## 2. Tamaño real del mercado

| Variable | Valor | Fuente / supuesto |
|---|---|---|
| Población Duitama 2025 | **135.991 hab.** | Proyección DANE (censo 2018) |
| Población adulta (18+) | 103.164 (75,9%) | DANE |
| Mayores de 60 | 21.521 (15,8%) | DANE — segmento de baja adopción de app |
| Corredor industrial (Paipa–Duitama–Sogamoso–Nobsa–Firavitoba) | **~300.000 hab.** | Proyecto Área Metropolitana del Alto Chicamocha |
| Hogares con internet fijo o móvil (Colombia) | 73,9% | MinTIC/DANE 2025 |

**Modelo de demanda (supuestos explícitos, todos ⏳ hasta validación de campo):**

- Usuarios potenciales de delivery = adultos 18–60 en zona urbana ≈ **75.000**.
- Penetración de "pide domicilio por app al menos 1 vez/mes" en ciudad intermedia: **20–30%** →
  15.000–22.000 usuarios activos.
- Frecuencia: **1,5–2,5 pedidos/mes**.
- **Mercado total de pedidos por app en Duitama: ~25.000–50.000 pedidos/mes** (≈ 800–1.700/día),
  repartidos hoy entre Rappi, el operador local y el canal WhatsApp directo.

Captura realista de un entrante local bien ejecutado: **5% año 1 → 15–20% año 3**, es decir
**60–120 pedidos/día al inicio y 250–400/día en crucero**. Ese es el techo honesto del negocio
municipal. Con el corredor completo (Sogamoso pesa más comercio que Duitama) el techo se triplica —
por eso **la tesis defendible es "corredor", no "Duitama sola"**.

---

## 3. Tres modelos posibles (y cuál recomiendo)

### Modelo A — Marketplace con flota propia (clon de Rappi)
Controlás oferta, demanda y logística. Comisión 15–20% + tarifa de domicilio.
- ➕ Máximo control de experiencia y datos.
- ➖ Máxima exposición: capital de trabajo, seguridad social de repartidores (Ley 2466/Decreto 0991),
  ARL 100% a cargo, gestión de efectivo, rotación de flota, picos de demanda.
- **Veredicto:** el más caro y el más regulado. No lo recomiendo como punto de partida.

### Modelo B — SaaS de pedidos para el comercio (el comercio pone su domiciliario)
Vendés catálogo digital + pedidos + pagos + seguimiento; el restaurante usa su propio motorizado.
Ingreso por **suscripción** (COP 150.000–350.000/mes por comercio) o comisión baja (5–8%).
- ➕ Sin exposición laboral, sin flota, margen bruto altísimo, cash-flow predecible.
- ➖ No resuelve el problema del cliente final (un solo lugar para pedir todo); ticket de venta bajo;
  hay que vender comercio por comercio.
- **Veredicto:** el más seguro. Es un negocio de software, no de logística.

### Modelo C — Agregador con logística tercerizada  ← **recomendado**
Vos ponés la demanda, el catálogo y la marca; **la entrega la ejecuta una empresa de mensajería/
domicilios local ya formalizada** (o los domiciliarios propios del comercio en horas pico), bajo
contrato de prestación de servicios con obligación acreditada de seguridad social.
- Comisión al comercio **12–18%** (vs. 25–32% de Rappi) + tarifa de domicilio al cliente.
- ➕ Diferencial comercial inmediato y verificable ("le cuesta la mitad que Rappi"), sin construir
  flota, con riesgo laboral trasladado a un tercero que ya lo administra.
- ➖ Dependés de un proveedor logístico; menos control de tiempos; hay que auditar que el tercero
  sí cotice (o la UGPP te alcanza igual por solidaridad ⏳ — consulta laboral obligatoria).
- **Veredicto:** mejor relación riesgo/velocidad para Duitama. Permite empezar en semanas y migrar a
  flota propia solo cuando la densidad lo justifique.

---

## 4. Economía unitaria (Modelo C)

Todos los valores en COP y marcados ⏳ — son estimaciones a validar con 20 comercios y 2 semanas de
operación piloto.

| Concepto | Por pedido | Nota |
|---|---|---|
| Ticket promedio | 38.000 ⏳ | Rango típico ciudad intermedia 30.000–45.000 |
| Comisión al comercio (15%) | **+5.700** | Rappi cobra 25–32% + IVA |
| Tarifa de domicilio al cliente | +5.000 ⏳ | Duitama urbana es compacta: trayectos de 1–4 km |
| Pago al domiciliario / tercero | −5.000 | Se traslada íntegra en Modelo C |
| Pasarela de pagos (≈3% + fijo sobre pagos digitales) | −700 | Wompi ≈2,99% + fijo tarjeta / 1,49% PSE; ePayco 2,79–3,5% |
| Soporte, mensajería, mapas, incidencias | −600 ⏳ | Reembolsos, pedidos caídos, WhatsApp API |
| **Margen de contribución** | **≈ 4.400** | ~11,6% del ticket |

**Punto de equilibrio:**

| Estructura fija mensual | Monto ⏳ |
|---|---|
| 2 personas (operación + comercial), con prestaciones (~1,5× salario) | 5.500.000 |
| Software (SaaS/white-label, hosting, APIs, WhatsApp) | 1.500.000 |
| Marketing local (pauta, cupones, activaciones) | 3.000.000 |
| Contable, legal, oficina pequeña, varios | 2.000.000 |
| **Total** | **12.000.000** |

→ **Break-even ≈ 2.700 pedidos/mes ≈ 90 pedidos/día.**
Con 250 pedidos/día en crucero: ingreso ≈ COP 33 M/mes, utilidad operativa ≈ 21 M/mes antes de
impuestos. **Es un buen negocio de dueño-operador. No es una startup escalable sin salir de Duitama.**

Con Modelo A (flota propia) hay que sumar seguridad social concurrente, ARL, dotación y tiempos
muertos: el margen de contribución cae a ~2.000–2.500/pedido y el break-even se dispara por encima
de 200 pedidos/día — **fuera del alcance realista del municipio en año 1**.

---

## 5. Infraestructura tecnológica

### 5.1 Qué hay que construir (mínimo funcional)

| Superficie | Qué hace | Recomendación para Duitama |
|---|---|---|
| **Cliente** | Catálogo, carrito, pago, seguimiento | **PWA (web app), no app nativa.** Instalable, sin fricción de store, actualizable en minutos. App nativa solo cuando haya >150 pedidos/día |
| **Comercio** | Recibe, acepta, marca listo | Panel web + **tablet** (o WhatsApp con confirmación humana en la fase 0) |
| **Repartidor** | Asignación, ruta, prueba de entrega, liquidación | App web móvil ligera + WhatsApp para excepciones |
| **Backoffice** | Catálogo, precios, cobros, conciliación de efectivo, soporte, reportes | Lo más importante y lo que siempre se subestima |

### 5.2 Stack y servicios

- **Base:** Next.js/React + Postgres (Supabase o Neon) + Vercel/Railway. Realtime para estado de pedido.
- **Mapas y ruteo:** Google Maps Platform (geocoding + distance matrix) o Mapbox/OSM para bajar costo.
  Duitama es compacta: no se necesita optimización de rutas sofisticada al inicio.
- **Pagos:** **Wompi** (Bancolombia) es la elección natural — tarjetas, PSE, **Nequi**, Daviplata,
  Bancolombia, efectivo Efecty/Baloto. Alternativas: ePayco, Bold, Mercado Pago.
  ⚠️ **Contar con que 50–70% de los pedidos serán en efectivo** ⏳ → hay que diseñar conciliación y
  cierre de caja diario del domiciliario desde el día 1. Este es un problema operativo, no técnico.
- **Mensajería:** WhatsApp Cloud API (plantillas de estado de pedido) — es el canal donde de verdad
  está el usuario en Boyacá. Costo por conversación iniciada por el negocio.
- **Observabilidad y soporte:** Sentry + un buzón único (WhatsApp Business) con SLA de 2 min en pico.

### 5.3 Build vs. buy vs. white-label

| Ruta | Costo de arranque ⏳ | Costo mensual ⏳ | Tiempo | Cuándo tiene sentido |
|---|---|---|---|---|
| **White-label / SaaS de delivery** | COP 12–35 M | 800 k–2,5 M | 2–6 semanas | **Recomendado para validar.** Techo: poca personalización y dependencia del proveedor |
| **Desarrollo a medida (equipo local o freelance)** | COP 80–250 M | 1,5–4 M | 4–7 meses | Cuando el modelo ya está validado y el diferencial está en el producto |
| **Fase 0 sin producto** (WhatsApp + catálogo web estático + planilla) | COP 2–5 M | <500 k | 1–2 semanas | **Empezá acá.** Valida demanda real sin escribir la plataforma |

**Recomendación fuerte:** los primeros 90 días no requieren plataforma. Requieren un número de
WhatsApp, un catálogo web decente, 20 comercios y dos motorizados. Si eso no genera 40 pedidos/día,
la plataforma no lo va a arreglar.

---

## 6. Infraestructura operativa (lo que hunde a estos proyectos)

1. **Catálogo.** Digitalizar 100+ menús con precios y fotos es el costo oculto más grande: ~2–4 h por
   comercio, más mantenimiento cada vez que suben precios. Presupuestá una persona dedicada.
2. **Oferta de domiciliarios.** En ciudad intermedia el problema no es la demanda, es tener 6–10
   motorizados disponibles **exactamente** de 11:30–14:00 y 18:30–21:00. Sin eso, el ETA se rompe y
   el usuario vuelve a Rappi y no regresa.
3. **Efectivo.** Cierre diario, arqueo, riesgo de pérdida y de fraude. Regla: liquidación diaria,
   tope de efectivo por domiciliario.
4. **Soporte humano local.** Es el único diferencial que Rappi estructuralmente no puede igualar:
   que conteste una persona de Duitama que sabe dónde queda el barrio.
5. **Horario y clima.** Duitama a ~2.590 m: lluvia y frío en la noche disparan la demanda y hunden la
   oferta de motos al mismo tiempo. Hay que tener tarifa dinámica desde el inicio.

---

## 7. Marco legal, permisos y trámites

### 7.1 Constitución y registros base

| Trámite | Entidad | Nota |
|---|---|---|
| Constitución de **SAS** + matrícula mercantil | **Cámara de Comercio de Duitama** | Objeto social: intermediación tecnológica / servicios de plataforma. Costo según activos ⏳ |
| **RUT** y responsabilidad de IVA | DIAN | La comisión es un servicio gravado con **IVA 19%** |
| **Facturación electrónica** | DIAN | Obligatoria; se factura al comercio la comisión, no el valor del pedido |
| **Registro de industria y comercio (ICA)** | Secretaría de Hacienda de Duitama | Tarifa de servicios según Estatuto Tributario Municipal (Acuerdo 041 de 2008 y modificatorios) ⏳ |
| **Concepto de uso de suelo** + **Bomberos** | Secretaría de Planeación / Cuerpo de Bomberos | Solo si hay oficina/bodega física |
| **Registro de marca** (clases 35, 39, 42) | SIC | Opcional pero crítico: sin marca registrada, el nombre es tomable. Tasa por clase ⏳ |

### 7.2 Repartidores — el punto caliente (cambió en 2025–2026)

- **Ley 2466 de 2025** (reforma laboral, sancionada el 25-jun-2025) creó el régimen de **trabajadores
  digitales de reparto**: afiliación obligatoria a seguridad social sean independientes o
  subordinados; **concurrencia de aportes 60% plataforma / 40% trabajador** en salud y pensión;
  **100% del aporte a riesgos laborales a cargo de la plataforma**; prohibición de suspender,
  restringir o cancelar cuentas de forma automatizada **sin revisión humana y sin derecho de
  apelación**; sanciones de la **UGPP** por no afiliar o no pagar.
- **Decreto 0991 de 2026** reglamentó afiliación, cotización y pago (incluida la forma de calcular el
  **IBC**). Está en disputa abierta: el gremio (Alianza In) pide derogarlo alegando que se aparta de
  la Ley 2466 y que la seguridad social "podría subir más de 200%". **Verificá el estado vigente de
  esta norma antes de firmar cualquier modelo de flota** ⏳ — es un blanco móvil.
- Consecuencia de diseño: **cualquier plataforma con flota propia arranca con un costo laboral que no
  existía en 2023**. El Modelo C (logística tercerizada con un operador formal que acredite
  cotizaciones) es la forma más limpia de convivir con esto, siempre bajo concepto de un laboralista
  local — la afiliación explícitamente *no* genera relación laboral, pero la operación mal diseñada
  sí puede generarla por realidad sobre formalidad.
- Requisitos del repartidor a exigir y auditar: licencia A2, SOAT y tecnomecánica vigentes, casco
  reglamentario, antecedentes. Verificar restricciones locales de tránsito (parrillero, pico y placa)
  con la Secretaría de Tránsito de Duitama ⏳.

### 7.3 Comercio electrónico y consumidor

- **Ley 1480 de 2011 (Estatuto del Consumidor)** + normas de comercio electrónico: deberes de
  información (precio total, tiempo de entrega, políticas), **derecho de retracto**, **reversión del
  pago**, y — clave para marketplaces — obligación de mantener **registro de los vendedores** con
  nombre/razón social, documento de identificación, dirección física de notificaciones y teléfonos.
  Esto delimita tu responsabilidad frente a la del comercio: **implementalo en el onboarding, no
  después.**
- **Ley 527 de 1999**: validez de mensajes de datos, firma electrónica de los contratos con comercios.
- Términos y Condiciones + contrato de intermediación con el comercio + política de reembolsos
  escritos desde el día 1. La SIC sanciona por publicidad engañosa y por incumplir plazos anunciados.

### 7.4 Protección de datos (habeas data)

- **Ley 1581 de 2012** aplica desde el primer usuario: autorización previa e informada, aviso de
  privacidad, política de tratamiento publicada, canal para derechos del titular, medidas de
  seguridad.
- **RNBD (Registro Nacional de Bases de Datos):** obligatorio solo para sociedades con **activos
  superiores a 100.000 UVT** (≈ COP 4.980 millones en 2025) y entidades públicas. Una plataforma
  nueva **no** estará obligada a registrar — pero **sí** a cumplir todo lo demás. Sanciones de hasta
  2.000 SMMLV.
- Ubicación de conductores en tiempo real = dato personal sensible en la práctica: definí retención,
  finalidad y acceso.

### 7.5 Sectorial (según qué se entregue)

| Vertical | Requisito |
|---|---|
| Alimentos preparados | La responsabilidad sanitaria es del comercio (Resolución 2674/2013). Si vos operás **cocina oculta o dark store**, la responsabilidad pasa a ser tuya: concepto sanitario, manipulación de alimentos, Secretaría de Salud |
| Medicamentos | Solo a través de droguerías habilitadas; **no** medicamentos de control especial |
| Licores | Verificación de edad, restricción de horarios y ley seca municipal; Ley 124 de 1994 |
| Mensajería / "mandados" | ⚠️ El servicio de **mensajería expresa** requiere habilitación de MinTIC con objeto social postal, **capital mínimo de 1.000 SMMLV**, área mínima de 80 m² por sede y cobertura en 4 departamentos (Ley 1369 de 2009, Res. 724 de 2010). Las plataformas se estructuran como **intermediarios tecnológicos**, no como operadores postales, para no caer en ese régimen. **Si vas a ofrecer "mandados" genéricos, esto exige concepto legal previo** ⏳ |

---

## 8. Presupuesto de arranque (Modelo C, fase validación → año 1)

| Rubro | Monto ⏳ |
|---|---|
| Constitución, marca, contratos, concepto laboral y de datos | 8–15 M |
| Producto: white-label o MVP a medida | 12–35 M |
| Catálogo inicial (60–100 comercios: fotos, digitación) | 6–12 M |
| Marketing de lanzamiento (3 meses) | 12–20 M |
| Capital de trabajo / subsidio de tarifas (6 meses de pérdida) | 60–100 M |
| **Total para llegar a break-even** | **COP 100–180 millones** |

Un intento serio de **Modelo A (flota propia, clon de Rappi)** no baja de **COP 400–700 M** con
horizonte de 24 meses, y compite de frente contra el jugador con más caja del sector. **No lo
recomiendo.**

---

## 9. Cómo se pierde (riesgos, ordenados por probabilidad)

1. **Densidad insuficiente** → ETAs largos → churn. El delivery es un negocio de densidad, no de
   cobertura. Mejor 6 barrios impecables que la ciudad entera mal servida.
2. **Rappi responde con cupones.** Puede subsidiar Duitama con caja de otras 50 ciudades; vos no.
   Nunca compitas por precio al consumidor: competí por **comisión al comercio** y por **catálogo
   que Rappi no tiene**.
3. **Regulación laboral en movimiento** (Decreto 0991 y su litigio). Diseñá para que un cambio de
   norma no reviente el modelo.
4. **Fuga de comercios**: el restaurante te usa para ahorrar comisión y te salta con el cliente
   recurrente. Contrarrestá con datos, promociones y facturación clara, no con cláusulas de
   exclusividad que nadie va a poder hacer cumplir.
5. **Efectivo y fraude.**
6. **Quemar la caja en producto antes de validar demanda.** El error más común y el más caro.

---

## 10. Ruta de validación de 90 días (antes de escribir la plataforma)

| Semanas | Qué | Criterio de continuar |
|---|---|---|
| 1–2 | Campo: auditar `domicilios.enduitama.com` y cualquier otro operador local; pedir 15 domicilios por Rappi en Duitama midiendo ETA real, disponibilidad de flota y fallos | Se documenta un fallo repetible de Rappi (ETA >45 min, catálogo corto, comisión que ahoga al comercio) |
| 2–4 | Entrevistar **25 comercios**: ¿qué comisión pagan?, ¿cuánto venden por Rappi?, ¿tienen domiciliario propio?, ¿pagarían 15%? | ≥12 comercios firman carta de intención |
| 3–6 | Fase 0 sin producto: catálogo web + WhatsApp + 2 motorizados, 1 zona (centro + 4 barrios) | ≥30 pedidos/día en semana 6 |
| 6–12 | Medir recompra a 30 días, costo por pedido real, tasa de fallo | Recompra ≥35% y margen de contribución ≥COP 3.500/pedido |

**Solo si el tablero anterior pasa, se compra o se construye plataforma.** Ese orden es la diferencia
entre COP 15 M de aprendizaje y COP 150 M de lección.

---

## 11. Relación con Visit Duitama

Hay adyacencia real y hay trampa:

- **A favor:** Visit Duitama ya está construyendo la relación con restaurantes y comercios locales y
  la tesis de marca es exactamente esta — *"que el dueño del restaurante cobre por primera vez lo que
  su trabajo vale"*. Una plataforma que le quita 15 puntos de comisión a Rappi es esa misma frase,
  ejecutada hacia adentro.
- **En contra:** son dos negocios distintos. Uno es marketing de destino en inglés para viajero
  internacional; el otro es logística de última milla en español para el residente. Comparten
  clientes (los comercios) pero no comparten producto, equipo, ritmo ni métricas.
- **Recomendación:** no fusionarlos. Si se hace, que sea como **segunda unidad**, después de que la
  landing de Visit Duitama esté en producción y validada, y reutilizando únicamente lo que sí es
  reutilizable: la relación con comercios, la marca de confianza local y el sistema de diseño.

---

## 12. Datos por verificar (⏳)

| id | Dato usado provisionalmente | Cómo verificar | Estado |
|---|---|---|---|
| `rappi-restaurant-count` | ~160 restaurantes en Rappi Duitama | Abrir la app en Duitama y contar por categoría | ⏳ |
| `rappi-eta-duitama` | ETA real y tasa de fallo de Rappi en Duitama | 15 pedidos propios en horas pico, 2 semanas | ⏳ |
| `didi-duitama` | DiDi Food no opera Duitama | Instalar DiDi Food con ubicación en Duitama | ⏳ |
| `competidor-local` | `domicilios.enduitama.com` activo y con catálogo | Visita web + pedido de prueba + entrevista | ⏳ |
| `ticket-promedio` | COP 38.000 | 20 comercios: ticket promedio de su canal domicilio | ⏳ |
| `mix-efectivo` | 50–70% de pedidos en efectivo | Preguntar a comercios y a domiciliarios | ⏳ |
| `comision-real-rappi` | 25–32% + IVA a comercios de Duitama | Ver 5 liquidaciones reales de aliados | ⏳ |
| `tarifa-ica-duitama` | Tarifa ICA servicios en Duitama | Estatuto Tributario Municipal vigente / Secretaría de Hacienda | ⏳ |
| `costo-camara-comercio` | Costo de matrícula SAS | Cámara de Comercio de Duitama (608) 760 4181 | ⏳ |
| `decreto-0991-vigencia` | Decreto 0991 de 2026 vigente y aplicable | Concepto de laboralista + seguimiento a la demanda del gremio | ⏳ |
| `mensajeria-expresa` | Intermediación tecnológica no requiere habilitación MinTIC | Concepto legal escrito antes de ofrecer "mandados" | ⏳ |
| `oferta-motorizados` | 6–10 motorizados disponibles en pico | Convocatoria de prueba en Duitama | ⏳ |
| `restriccion-transito` | Restricciones de parrillero/pico y placa | Secretaría de Tránsito de Duitama | ⏳ |

---

## 13. Fuentes

- Rappi Duitama — restaurantes: https://www.rappi.com.co/duitama/restaurantes
- Rappi Duitama — supermercados: https://www.rappi.com.co/duitama/tiendas/tipo/market
- Rappi — repartidores en Duitama: https://www.rappi.com.co/repartidor/duitama
- Rappi — comisión a restaurantes: https://merchants.rappi.com/es-co/cuanto-cobra-rappi-a-los-restaurantes
- Semana — comisiones de apps de domicilios hasta 35%: https://www.semana.com/semana-tv/semana-noticias/articulo/hasta-35-de-comision-estarian-cobrando-apps-de-domicilios-a-los-restaurantes/687148/
- La República — Rappi Turbo y expansión a ciudades intermedias: https://www.larepublica.co/empresas/rappi-turbo-llego-a-siete-ciudades-y-completo-cobertura-para-22-millones-de-usuarios-3862728
- Semana — Rappi planea llegar a 50 ciudades: https://www.semana.com/economia/empresas/articulo/rappi-planea-llegar-a-50-ciudades-en-colombia-esta-es-su-hoja-de-ruta/202136/
- Portafolio — Rappi frente a la competencia (iFood, Uber Eats): https://www.portafolio.co/negocios/empresas/rappi-y-apps-de-domicilios-fortaleza-frente-a-la-competencia-ifood-y-ubereats-573128
- Domicilios en Duitama (operador local): https://domicilios.enduitama.com/
- Población Duitama 2025 (DANE): https://telencuestas.com/censos-de-poblacion/colombia/2025/boyaca/duitama
- Perfil DANE Duitama (CNPV): https://sitios.dane.gov.co/cnpv/app/views/informacion/perfiles/15238_infografia.pdf
- Corredor industrial de Boyacá / Alto Chicamocha: https://es.wikipedia.org/wiki/Corredor_industrial_de_Boyac%C3%A1
- Universidad Externado — análisis Ley 2466 de 2025 (plataformas de reparto): https://derlaboral.uexternado.edu.co/analisis-y-opinion/nueva-regulacion-para-los-trabajadores-de-plataformas-digitales-de-reparto-analisis-critico-de-la-ley-2466-de-2025/
- Noticias RCN — Decreto 0991 de 2026: https://www.noticiasrcn.com/economia/decreto-0991-de-2026-cambios-para-repartidores-1048352
- El Colombiano — gremio pide derogar el Decreto 0991: https://www.elcolombiano.com/negocios/apps-domicilios-piden-derogar-decreto-991-seguridad-social-repartidores-GE39683995
- Portafolio — impacto en seguridad social de repartidores: https://www.portafolio.co/economia/empleo/repartidores-de-rappi-y-plataformas-enfrentarian-cambios-en-seguridad-social-gremio-alerta-impacto-en-el-empleo-499965
- SIC — Registro Nacional de Bases de Datos: https://www.sic.gov.co/registro-nacional-de-bases-de-datos
- Holland & Knight — obligaciones RNBD 2025 (umbral 100.000 UVT): https://www.hklaw.com/en/insights/publications/2025/01/obligaciones-del-registro-nacional-de-bases-de-datos-personales
- CCCE — formalización en comercio electrónico: https://ccce.org.co/noticias/hacia-la-formalizacion-de-tu-negocio-en-el-comercio-electronico/
- MinTIC — requisitos de mensajería expresa: https://mintic.gov.co/portal/715/articles-125190_archivo_pdf_requisitos_mensajeria_expresa.pdf
- Comparativa de pasarelas de pago Colombia 2026: https://www.studiocontra.co/es/ideas/payment-gateways-in-colombia-2026-fees-how-to-choose
- MinTIC — conectividad de hogares: https://www.mintic.gov.co/portal/715/w3-article-437305.html
- Cámara de Comercio de Duitama: https://ccduitama.org.co/
- Estatuto Tributario del Municipio de Duitama: https://tramites1.suit.gov.co/registro-web/suit_descargar_archivo?A=38508
