# SEO / TECHNICAL / ACCESSIBILITY / AGENTIC-WEB AUDIT — Visit Duitama repository

**Scope:** entire repository `RideTheAndes/visit-Duitama` (13 files, ~3,580 lines — 100 % read).
**Date:** 2026-08-23 · **Audit language:** English (matches the site's public language).
**Method:** full manual read of every file; cross-file greps; programmatic re-computation of the WCAG contrast matrix; JSON-LD parsing; gzip weight measurement; external checks on the Google Fonts payload and Duitama reference data. Every finding is tagged **[CONFIRMED]** (verified in the code or by measurement) or **[RECOMMENDATION]** (judgment/strategy). Nothing here is speculative without being labeled as such.

---

## 0. WHAT THIS REPOSITORY ACTUALLY IS (read first)

The audit request framed this as "a production-grade website." **It is not one yet, and it does not claim to be.** The repository is **Step 9 of the Visit Duitama roadmap**: four self-contained landing-page prototypes (`explorations/a–d`), an internal comparator (`index.html`, correctly `noindex`), a canonical token sheet (`shared/tokens.css`) and a documentation set (`BRIEF.md`, `docs/`). BRIEF.md §0 says explicitly: *"No es construir el sitio final."* There is no framework, no build system, no package manager, no deployment config, no robots.txt, no sitemap — **by explicit design** (BRIEF §7.1: vanilla HTML/CSS/JS, files that open by double-click).

Two naming clarifications:

1. The GitHub **org** is RideTheAndes; the **product in this repo** is *Visit Duitama*. BRIEF §5.1 describes Ride The Andes as a related cycling brand that the site bridges to "sin ser su vocero." The cycling-tourism search intents in the audit request ("cycling routes near Duitama," "cycling in the Colombian Andes") are targeted **by this site's** Move Like a Local / Guides content — that mapping is already in BRIEF §7.4 and is correct.
2. The audit therefore has three honest jobs, and this report is organized around them:
   - **(a) Real defects in what exists** — bugs and inconsistencies in the four prototypes (there are several, including two confirmed WCAG failures).
   - **(b) The launch gap list** — everything a production deployment needs that is legitimately absent today, so that "prototype phase" never silently becomes "launched without robots.txt."
   - **(c) Strategy** — content, entity, geographic and agentic-web architecture for the production site.

**Overall quality note:** this is the most disciplined pre-production repo I have audited. The self-imposed rules (unverified data carries `.fact--pending` + `data-verify`; a written contrast audit; decisions logged with self-criticism) are exactly the habits that make sites trustworthy to humans, Google and AI agents. I re-computed 10 ratios from `docs/CONTRAST-AUDIT.md` programmatically — **all 10 reproduce to the second decimal.** The findings below should be read as sharpening a strong foundation, not rescuing a weak one.

---

## EXECUTIVE VERDICT

**State: pre-production prototype set of unusually high craft, with a small number of real defects and one systemic blind spot.**

The four prototypes already do most things production tourism sites get wrong: single `<h1>` per page, correct landmark structure, skip links, focus rings tuned per background, `prefers-reduced-motion` respected, text-based LCP, 10 KB gzipped documents, honest metadata, JSON-LD present, zero trackers, zero secrets. The performance budget is not just met, it is embarrassed (33–38 KB raw vs a 500 KB budget).

The systemic blind spot: **the honesty system stops where machines and assistive technology begin.** The brand's signature move — marking every unverified fact — is implemented as a dotted underline plus a `title` tooltip (invisible to touch users, unreliable for screen readers, absent from extracted text) and is *contradicted* by the JSON-LD, which asserts the same unverified price, altitude and schedule as bare machine-readable fact. The pages also all claim the same production URL (`og:url = https://visitduitama.com/`) while the domain itself is still listed as un-purchased in `PENDING-FACTS.md`, and the four drafts carry **no noindex**, so any review deployment would put four competing near-duplicates of an unregistered brand domain into the index.

None of this is expensive to fix. Phase 1 below is roughly a day of work plus two purchases (domain, WhatsApp line). The larger opportunity is Phase 3–4: the three "Guides" cards are currently dead `href="#"` stubs, and those three articles — *Bogotá→Duitama*, *Where to eat*, *Cycling the Andes from Duitama* — are precisely the long-tail/geo queries this brand can win. The landing page is the storefront; those pages are the SEO engine, and today the engine doesn't exist yet (by declared scope, §12).

Answering the ultimate question — *"is this site structured so an AI agent or search engine can discover, understand, trust and recommend it?"* — today's honest answer is: **the HTML layer is already better prepared than most live tourism sites; the entity layer, URL layer and content layer do not exist yet.** The roadmap below gets each to "yes."

---

## A. CRITICAL PROBLEMS (must fix — all confirmed)

**A1. Four indexable drafts all claiming the production root URL.** [CONFIRMED]
Every exploration sets `og:url` to `https://visitduitama.com/` (a-the-guide.html:11, b-trust-bridge.html:11, c-five-am.html:11, d-verified-network.html:11) and none has `<meta name="robots" content="noindex">` or `<link rel="canonical">` (grep: 0 occurrences across all four; only the comparator has noindex). The moment these files are deployed anywhere public for stakeholder review (GitHub Pages, Netlify preview), Google can index four near-duplicate documents, each telling social scrapers and crawlers "I am visitduitama.com/". **Fix now:** add `noindex` to all four prototypes; add a launch-checklist line to remove it from the winner and give that page a real `rel=canonical`. (The classic failure mode — shipping the staging noindex to production — is why the checklist line matters as much as the tag.)

**A2. The canonical domain is asserted everywhere but not yet secured.** [CONFIRMED in-repo]
`docs/PENDING-FACTS.md:35` lists `email-domain · hello@visitduitama.com · Compra de dominio + correo · ⏳`. Meanwhile `og:url`, JSON-LD `Organization.url`, and `mailto:hello@visitduitama.com` (all four footers) already commit to that domain, and footers link `instagram.com/visitduitama`. If the .com or the handle is taken or squatted before purchase, every metadata decision, the schema identity and the printed email are wrong — and a squatter receives mail meant for the brand. (I could not verify registration status from this sandbox — the egress proxy blocks that host — but the repo's own ledger says it's pending.) **Register the domain + handle before any public deployment. This is the single highest-leverage 30 minutes available.**

**A3. Unverified facts are asserted as bare truth in JSON-LD.** [CONFIRMED]
The visible layer marks the price, altitude, market hour, bus data etc. as pending. The structured-data layer does not: `"price": "120000"` (all four, e.g. a-the-guide.html:40) while the page itself displays "PRICE PENDING CONFIRMATION" (a-the-guide.html:557); FAQ answers embed the literal string "(pending verification)" (a-the-guide.html:45–47 and equivalents in b/c/d), which is both an admission that the data isn't ready for schema and a string that could surface verbatim in machine summaries. `docs/DECISIONS.md` #2/#10 records this as a deliberate draft-phase tradeoff — fine for a prototype, **but it must be on the launch-blocking list:** before go-live either the facts are verified (removing the caveats everywhere) or the unverified values come out of the schema. A brand whose thesis is "concreto siempre" cannot ship structured data its own HTML disclaims. Google can also treat markup that mismatches page presentation as spammy structured data.

**A4. WCAG AA failure in D's "In review" ledger row.** [CONFIRMED by computation]
`d-verified-network.html:122` — `.lrow--review{opacity:0.65}` composites the whole row over the near-white ledger. Effective ratios (computed): row title 4.51:1 (passes only because it's 18 px bold), `.dish` 14 px text **3.12:1 (fails 4.5:1)**, `.badge-review` 10 px text **2.66:1 (fails)**. `docs/CONTRAST-AUDIT.md` checked rgba composites on dark grounds but not element-`opacity` composites on light — this row slipped through its net. **Fix:** don't dim with `opacity`; use the already-derived AA tokens (`--ocre-text` for the badge, `--ink-soft` at full alpha for the dish line) and mute the *mark column only*.

**A5. A's elevation profile is hidden from assistive technology while carrying a written label.** [CONFIRMED]
`a-the-guide.html:584` wraps the La Rusia SVG — which itself declares `role="img"` + a good `aria-label` (line 585) — in `<div class="alti" aria-hidden="true">`. The container's `aria-hidden` wins: screen-reader users get nothing, and the carefully written label is dead code. B, C and D expose identical SVGs correctly (no hidden wrapper — e.g. b-trust-bridge.html:402), so this is an inconsistency, not a policy. **Fix:** delete the `aria-hidden="true"` on the wrapper.

**A6. D's ledger ARIA table breaks the links inside it.** [CONFIRMED]
`d-verified-network.html:247–319`: `role="table"` on the container, `role="row"` **on `<a>` elements**, `role="cell"` on spans. `role="row"` overrides the anchor's link role, so screen readers announce table rows, not links — the primary interaction (row → partner entry) is semantically erased. The declared grid is also malformed: the header row exposes 2 `columnheader`s while body rows expose 4 cells. **Fix:** drop all table roles and keep the styled links (simplest, honest — it's a list of links), or use a real `<table>` with the link on the name cell. The visual "ledger" stays identical.

**A7. B's sticky booking bar traps focusable content behind `aria-hidden`.** [CONFIRMED]
`b-trust-bridge.html:517–523` + script :541–545. The bar contains a real `<a class="btn-cta">` and is hidden via `transform` + `aria-hidden="true"` — but it is never removed from the tab order, so keyboard/switch users on mobile widths can focus a link that AT says doesn't exist (WCAG 1.3.2/4.1.2 problem). There is also a state mismatch: visibility requires `scrollY>300` but the `aria-hidden` expression omits that term, so in the 0–300 px band the bar can be visually hidden yet `aria-hidden="false"`. **Fix:** toggle the `inert` attribute (or `visibility:hidden`) together with the class, and derive both from one boolean.

**A8. The pending-fact marker is imperceivable to exactly the audiences the rule exists for.** [CONFIRMED behavior, systemic]
`.fact--pending` = dotted underline + `cursor:help` + `title="Pending verification"`. `title` tooltips don't exist on touch (the brief's own majority audience), are inconsistently exposed by screen readers, and vanish in reader modes, text extraction and AI-agent DOM reads (the honest signal survives only as a `data-verify` attribute). The only human-readable legend lives in the comparator's footnote — an internal tool. **Fix (small):** add visually-hidden text inside the span (`<span class="sr-only">(pending verification)</span>`) and one visible one-line legend per page (e.g., footer: "Dotted facts are still being verified — see how we handle facts"), which is also on-brand honesty worth showing off. This turns the repo's best idea into something machines and all humans can actually perceive.

**A9. No mobile navigation menu on any direction.** [CONFIRMED]
All four hide `.nav-links` below 760–820 px (`display:none`, e.g. a-the-guide.html:141–142) and provide no toggle. On phones — ">60 % of traffic" per BRIEF §6.1 — the nav is logo + one CTA. A partially mitigates via the hero index; B, C, D have no in-page substitute. Crawlers rendering mobile-first still see the anchors in the DOM (so this is not an indexing problem *today*), but for humans and for agents driving a mobile viewport, four promised destinations (Experiences · Guides · Partners · About) are unreachable except by scrolling blind. `DECISIONS.md` doesn't record this as a decision — it looks like scope-trimming that fell through the cracks. **Decide it explicitly:** either a disclosure menu (~20 lines, no framework needed) or a documented "single-page scroll is the mobile nav" decision. When the real multi-page site exists this becomes mandatory.

---

## B. HIGH-IMPACT SEO IMPROVEMENTS (launch-phase)

**B1. Head completeness for the winning direction.** [CONFIRMED gaps]
Zero occurrences across all four of: `rel="canonical"`, `rel="icon"`/favicon of any kind, `theme-color`, `og:site_name`, `og:locale`, `og:image:width/height/alt`, `twitter:image`. Also `og:image` points to assets that don't exist yet (`/og/field-guide.png` etc. — commented "pending: real OG asset, Step 8"), so any share today renders a broken preview card. At launch the winner needs: canonical (self-referential, one host, decide www vs apex and http→https redirects at the host level), favicon set + `theme-color` (`#232C39` fits), `og:site_name="Visit Duitama"`, `og:locale="en_US"`, a real 1200×630 OG image + `og:image:alt`, `twitter:image`. Cheap, mechanical, and the difference between a link that looks alive and one that looks abandoned in every WhatsApp/Slack/iMessage share — which for a WhatsApp-centric brand is the front door.

**B2. Titles and descriptions — small sharpening.** [MIXED]
Measured: titles 40–61 chars (safe), descriptions 143–185. Confirmed nits: A's title repeats "Duitama" twice ("Visit Duitama — The Resident's Field Guide to Duitama, Boyacá") — drop the second instance or restructure ("The Resident's Field Guide · Duitama, Boyacá"); D's 185-char description will truncate around ~160. Recommendation-level: C's title carries no place-word beyond the brand ("The Market Opens at Five") — defensible as the memorability play, but the winner's title should keep *Duitama, Boyacá, Colombia* signals; C's meta description already does. C's and D's `<h1>`s likewise contain no place name (the location lives in adjacent leads/deks) — acceptable, but note the tradeoff was never logged in DECISIONS.md; log it.

**B3. Self-host the fonts.** [CONFIRMED cost; recommendation]
Measured: the Google Fonts CSS is 16.5 KB with 41 `@font-face` subset blocks; a modern browser will fetch ~9 woff2 faces (Fraunces 600 + 500i, Plex Mono 400/500, Franklin 300/400/500/600/700 — est. 150–270 KB) from a third-party origin, render-blocking via the stylesheet. Three reasons to self-host at production: (1) performance — removes two connection setups from the critical path and lets you `preload` the two above-the-fold faces; (2) **GDPR — the brief's named reader is "someone in Berlin"; German case law (LG München I, 2022) held that serving Google Fonts from Google's CDN transmits visitor IPs unlawfully without consent.** A tourism brand courting German-speaking travelers should not open with a GDPR foot-fault; (3) resilience on weak 4G (BRIEF's own Villa de Leyva hostel scenario). Also trim: Franklin 300 is used only for leads (400 reads fine there) and Plex Mono 500 is barely used — dropping two faces is ~40 KB. Add `font-display: swap` (kept) plus `size-adjust`-tuned fallbacks for Fraunces↔Georgia to kill the remaining CLS from swap.

**B4. Dead links must never ship.** [CONFIRMED: 5× `href="#"` per exploration]
Guide cards (×3), "List your business", and the WhatsApp footer link are `href="#"` in all four (by declared scope, §12). Fine in a prototype; in production each becomes a real URL — see §E/H for what those URLs should be. Add a pre-launch grep (`grep -c 'href="#"'` must be 0) to whatever checklist gates deployment.

**B5. Mark language switches.** [CONFIRMED]
Zero `lang="es"` attributes in any exploration, yet Spanish strings render on English pages: "El registro es en español" (partner strips), and — bigger — every photo-placeholder `aria-label`/slot caption is Spanish ("plano medio · doña Carmen sirviendo caldo…"). Screen readers will read Spanish with an English voice. Add `lang="es"` on those spans now. **Flag before Step 8 (photography):** BRIEF §7.3 says the placeholder brief text *becomes the production alt text* — but those briefs are written in Spanish, so following the rule literally ships Spanish alt text on an English site. Write the production alts in English when photos land; keep the Spanish only in `PHOTO-BRIEF.md`.

**B6. Trailing metadata hygiene for the four-as-a-set.** [RECOMMENDATION]
While the four coexist (review deployments), differentiate them defensively even under noindex: give each a distinct `og:url` matching its actual path (or drop `og:url` until launch). Four documents asserting the same identity is exactly the ambiguity that confuses scrapers and LLM crawlers, which don't all honor noindex.

---

## C. AI / AGENTIC-WEB IMPROVEMENTS

What already works (worth protecting): content is server-delivered static HTML — every fact readable without executing JS; landmarks and heading order are clean; link text is descriptive ("How to get from Bogotá to Duitama", never "click here"); the mono fact rows are unusually machine-friendly (`SATURDAYS · 5:00 AM`, `25 KM · +1,100 M` parse trivially); `data-verify` attributes give agents a literal machine-readable uncertainty flag, which almost no site on the web has. An agent can answer "what is this site, who runs it, where, what does it sell" from any of the four pages in one read.

**C1. One identity, not four.** [CONFIRMED problem / see A1]
An agent landing on this repo's deployment today finds four different homepages with four different H1s, all claiming to be visitduitama.com. Until the winner is chosen, the noindex fix (A1) is also the agent fix. After launch: one page, one canonical, one schema graph.

**C2. Resolve the "real thread" ambiguity — it is a trust landmine.** [CONFIRMED text; decision needed]
b-trust-bridge.html:253 captions the hero chat "A real thread, last Tuesday". `DECISIONS.md` calls it "una conversación real maquetada" — a mock-up *of a real conversation*, or a mocked conversation presented as real? If the thread is not verbatim-real, this is fabricated social proof, which (a) violates the brand's own §10 honesty rule, (b) is exactly the kind of claim AI systems increasingly cross-check, and (c) poisons E-E-A-T if ever called out. Also "last Tuesday" rots: it is relative, unverifiable, and false the week after deployment. **Fix:** if real — keep, add consent, replace "last Tuesday" with a real date (`<time datetime="2026-08-12">`); if illustrative — recaption honestly ("What a typical thread looks like"), which costs almost nothing in persuasion and preserves the site's most valuable asset: never having lied.

**C3. Machine-readable dates.** [CONFIRMED absence]
No `<time>` elements anywhere; "VERIFIED 2026" (D, ×4) and the chat timestamps are plain text. Agents deciding "is this information current?" — one of the audit's explicit questions — need dateable signals. At launch: `<time datetime>` on verification dates, a visible "facts last checked: {date}" line near the KBYG block, and `dateModified` in WebPage schema. For a brand selling *up-to-dateness* ("we check the hours twice"), exposing freshness machine-readably is a differentiator, not a chore.

**C4. Name the operator.** [CONFIRMED gap; recommendation]
Four providers have names, faces and quotes; the operator is only "we" and "The person who replies" (b:270, deliberately anonymous while SLOT 07 is unshot). For E-E-A-T and for agents answering "who runs this?", the production site needs at least one named human (founder/team) with a sentence of bio, in HTML and as `Person` → `worksFor` → Organization in the graph. Anonymous "residents" is a weaker trust claim than one named resident.

**C5. `llms.txt` (optional, cheap).** [RECOMMENDATION]
An emerging convention, low cost, on-brand: a root `llms.txt` summarizing the site in ~20 lines for LLM crawlers (what Visit Duitama is, where Duitama is, what's bookable, what's verified-pending, canonical contact). Not a ranking factor; purely an agent affordance. Do it at launch, not before (it would otherwise advertise the drafts).

**C6. Keep the no-JS guarantee as a tested invariant.** [RECOMMENDATION]
C's scene-reveal is correctly gated on `html.js` (c-five-am.html:97–101, script :508) so no-JS and reduced-motion users see everything — but scripted crawlers *do* run JS, and sections outside the render viewport stay `opacity:0` until intersection. Google indexes DOM content regardless of visibility, so the risk today is low, but the safer pattern (and my recommendation if C wins) is reveal-by-default, animate-only-on-intersect — same aesthetics, zero dependence on crawler viewport behavior. Whichever direction wins, add "every fact visible with JS disabled" to the launch checklist; it is currently true and worth keeping true.

---

## D. TECHNICAL IMPROVEMENTS (architecture, performance, code quality)

**Performance verdict:** [CONFIRMED by measurement] documents are 33–38 KB raw / 9.6–10.8 KB gzipped, zero images, LCP is styled text, animations are CSS-only, JS is ~30 lines per page. Projected CWV on any competent static host: LCP well under 2.5 s on 4G (fonts are the only variable — see B3), CLS ≈ 0 (aspect-ratio boxes reserve all media space; the only CLS sources are font swap and B's sticky bar overlaying content), INP trivially good, TTFB = host-dependent. The DECISIONS.md weight claims (A 38 · B 33 · C 33 · D 38 KB) reproduce exactly. **The performance work is done; the only job is not to ruin it with photography** (BRIEF already caps hero ≤200 KB — hold that line, AVIF/WebP with explicit width/height when `<img>` replaces the placeholders).

**D1. Token duplication is currently in sync — keep it that way mechanically.** [CONFIRMED]
BRIEF §7.1 mandates inline tokens + `shared/tokens.css` duplicate. Verified: the four inline `:root` blocks match tokens.css values (including the post-audit `--ocre-text`/`--verde-text`); C's extra `--predawn`/`--line-light` are documented derivations; the comparator omits tokens it doesn't use. No drift today — but five copies with no build step *will* drift. Add a 10-line check script (compare inline `:root` against tokens.css) run manually or as a pre-commit/CI step. Costless insurance.

**D2. Small confirmed code smells** (all prototype-acceptable; fix in the winner):
- b-trust-bridge.html:216 `body{padding-bottom:0}` — a no-op leftover; and when the sticky bar shows, it overlaps footer content because no space is reserved.
- a-the-guide.html:630 `class="section partner"` sets a background that inline `style="background:transparent"` immediately cancels — contradictory leftover.
- a-the-guide.html:580 duplicates `.facts-row` styles inline because the class is scoped to `.book` — route cards 2/3 use bare divs instead; three different patterns for one row type on one page.
- a-the-guide.html:567 `aria-hidden="false"` — explicit default, does nothing.
- Inline `style=""` count per exploration: 12/18/36/25 — fine for one-file prototypes; consolidate into classes in the production build.
- The isotype SVG is pasted 3–7× per page [CONFIRMED counts]; in production define once as `<symbol>` + `<use>` (still no build step needed).
- `console.log` analytics stub (2× per page) is per-brief (§7.5) and correctly contract-first (`data-event`); strip the logs at launch, keep the attributes.

**D3. A's hero index numbering skips 03.** [CONFIRMED]
a-the-guide.html:389–393 renders 01, 02, 04, 05, 06 (curated subset keeping section numbers). To a careful human — or an agent counting a list — it reads as a bug. Either renumber the subset 01–05 or include all eight entries.

**D4. No CI at all.** [CONFIRMED absence; recommendation]
No `.github/workflows`, no HTML validation, no link check. For *this* phase that's fine. At production add a three-job action: html-validate, a link checker (fails on `href="#"`), and the token-sync check from D1. One afternoon, permanent guardrail.

**D5. Repo hygiene.** [CONFIRMED] No `.gitignore` (nothing to ignore yet — fine), no LICENSE (private brand content — fine, add "all rights reserved" if the repo ever goes public), README's last two lines are the pre-existing stub ("# visit-Duitama / El repo de Visit Duitama") appended after the real README — trivial dedupe.

---

## E. CONTENT OPPORTUNITIES (what should exist and doesn't)

Current indexable content = one landing page (×4 drafts). That can rank for the brand and a couple of primary intents; it cannot build topical authority alone. The topical map, ordered by (impact × effort), reusing the site's own planned assets first:

**Tier 1 — the three Guides already promised on the page** (dead cards today; each maps 1:1 to a §7.4 target query):
1. `/guides/bogota-to-duitama` — "how to get from Bogotá to Duitama" (transactional-informational, low competition, evergreen; the bus data is already drafted in KBYG/PENDING-FACTS).
2. `/guides/where-to-eat-in-duitama` — "where to eat in Duitama Colombia"; nine tables, prices, the four partners as anchors → this page also becomes the internal-link hub feeding every partner entity.
3. `/guides/cycling-from-duitama` — "cycling in the Colombian Andes", "cycling routes Boyacá"; three climbs with the altimetry SVGs already built. This is also the natural, honest bridge page to Ride The Andes (§5.1).

**Tier 2 — pages the architecture already implies:**
4. `/experiences/5am-market-run` — the signature experience detail page (BRIEF §12 defers it; it's the conversion URL every guide should link to, and the correct home for Product/Offer schema instead of the homepage).
5. `/partners` — the Verified registry as its own page (D's ledger, whichever direction wins) + `/partners/join` — the Spanish signup landing (the currently dead "List your business"; `lang="es"`, its own ES metadata).
6. One page per route: `/routes/la-rusia`, `/routes/pueblito-boyacense`, `/routes/santa-rosa-circuit` — GPX download, altimetry, food stops. Route pages are the most linkable asset a cycling destination can publish (Strava/komoot forums, cycling blogs link to them).

**Tier 3 — authority expansions (post-launch):** altitude/acclimatization explainer ("Duitama altitude — what 2,590 m feels like"); market guide ("Duitama's Saturday market, hour by hour" — C's narrative is nearly this article already); day-trip pages (Paipa hot springs, Lago de Tota, Villa de Leyva ↔ Duitama); seasonal "when to visit Boyacá"; "Boyacá food glossary" (cubios, guatila, longaniza, almojábana — terms the site already uses and travelers will Google mid-read).

Anti-goal, per the brief's own §12 discipline: do not spin up ten thin pages at once. Three excellent guides + the experience page beat twelve stubs — thin pages would *damage* the "concreto siempre" positioning.

---

## F. GEOGRAPHIC SEO OPPORTUNITIES

Current geo signals [CONFIRMED]: "Duitama, Boyacá, Colombia" appears in titles (A, D), descriptions (all), eyebrows, footers and PostalAddress schema; Bogotá appears as origin ("190 km", Terminal Norte); Santa Rosa de Viterbo, Pueblito Boyacense, La Rusia, Plaza de los Libertadores, Tunja (via) and Villa de Leyva (in BRIEF only) appear in body copy. That's a genuinely good base — the geography is woven into content, not stuffed.

Gaps and next moves:
1. **No coordinates anywhere.** Add `geo` (GeoCoordinates) to TouristDestination and later `Place` entities. (Mark the exact figures for verification per house rules.)
2. **No entity anchors.** Duitama is ambiguous to machines only until you say `sameAs: ["https://en.wikipedia.org/wiki/Duitama", "https://www.wikidata.org/wiki/Q1011125"]` — Q1011125 is Duitama's Wikidata ID (verified during this audit). Same treatment later for Boyacá, Lago de Tota, Páramo de la Rusia.
3. **No containment chain.** `containedInPlace`: Duitama → Boyacá → Colombia turns isolated mentions into a geographic graph Google's and LLMs' location understanding can walk.
4. **Unaddressed geo intents with real volume and near-zero competition in English** (each maps to a Tier-2/3 page, never to stuffing the landing): "Duitama vs Villa de Leyva", "day trips from Villa de Leyva" (position Duitama as the un-touristed base), "Paipa hot springs from Duitama", "Lago de Tota cycling", "things to do in Boyacá", "Sogamoso/Tibasosa" mentions inside route pages.
5. **The English-from-inside moat is the geo strategy.** Nearly all competing content for these queries is Spanish-language or agency-written from Bogotá. Every English page with exact local data (bus platform numbers, market hours, ATM locations) is close to uncontested. The brief already knows this (§1); the point here is that *each* such intent needs *a* page — the landing alone can't hold them all.

---

## G. STRUCTURED-DATA STRATEGY

Present today [CONFIRMED]: valid-JSON `@graph` with Organization, TouristDestination, Product+Offer, FAQPage on each exploration; zero `@id`s, zero cross-references — four isolated nodes, not a graph. Missing types that match visible content; no fabrication found (good). Two expectation-settings: **FAQPage rich results have been restricted (since Aug 2023) to well-known government/health sites — keep the markup for semantics and AI comprehension, but expect no SERP feature.** Product rich results target merchandise; a tour may validate but won't get shopping treatment — the markup still helps agents extract price/availability, so keep it, honestly (see A3).

Target graph for the production page (one page, one graph, everything `@id`-linked):

```
#organization  Organization ("Visit Duitama")
  url, logo, email, foundingLocation → #duitama
  contactPoint { contactType: "customer support",
                 availableLanguage: ["en","es"],   ← literally the brand promise, machine-readable
                 hoursAvailable: 06:00–21:00 COT }
  sameAs: [instagram, …]
  knowsAbout: [#duitama, cycling, gastronomy]
#website       WebSite (publisher → #organization)
#webpage       WebPage (isPartOf → #website, about → #duitama, dateModified)
#duitama       TouristDestination / City
  geo (GeoCoordinates), containedInPlace → Boyacá → Colombia
  sameAs: [Wikipedia, Wikidata Q1011125]
  touristType: ["cyclists","food travelers"]
#market-run    Product (or TouristTrip) — lives on /experiences/5am-market-run at maturity
  provider/seller → #organization
  areaServed → #duitama
  offers: Offer (price only once verified; availability honest)
#carmen …      LocalBusiness/FoodEstablishment per verified partner (D's registry pages)
  address, servesCuisine, knowsLanguage, parentOrganization relationship via memberOf program
FAQPage        mainEntity questions (keep; answers only with verified facts)
BreadcrumbList on every non-home page once the multi-page site exists
```

Rules that matter more than any single type: every node gets an `@id` and relationships reference those `@id`s (that's what makes it a knowledge graph instead of confetti); nothing enters the graph that isn't visible on the page; nothing unverified enters at all (A3); when a Ride The Andes web presence exists, cross-link the two Organizations (`sameAs`/`memberOf`/`knowsAbout`) so engines learn the brand family instead of guessing.

---

## H. INTERNAL-LINKING STRATEGY

Today: single-page anchors, done well (A's dual TOC — hero index + desktop rail with scroll-tracking — is an excellent crawl/agent affordance; D's ledger rows anchor to entries; every card is an `<a>` with rich text). Orphans/click-depth are not yet meaningful. The strategy below is for the Phase-3 multi-page site — specific, per the audit's requested format:

| From → To | Anchor concept | Reason |
|---|---|---|
| Home (KBYG "Getting there" row) → /guides/bogota-to-duitama | "the full bus guide" | The KBYG row is the teaser; the guide is the ranking page. Converts the site's strongest snippet into its strongest crawl path. |
| Home (each route card) → /routes/{route} | route name | Cards already exist; pointing them at real URLs creates the routes cluster with zero new UI. |
| /guides/where-to-eat → each partner entry (/partners#… or partner pages) | dish + place ("caldo at doña Carmen's stall") | Passes food-intent authority to the entities that convert; anchors are natural sentences, not labels. |
| /guides/cycling-from-duitama → /routes/la-rusia (+ siblings) | "the La Rusia climb, in detail" | Hub→spoke; the guide ranks broad ("cycling Boyacá"), routes rank specific ("La Rusia climb"). |
| /routes/santa-rosa-circuit → /guides/where-to-eat | "longaniza santarrosana" | The brand's gastronomy-transversal rule (§5.2) *is* an internal-linking rule — food mentions in every section are pre-written contextual anchors. Use them. |
| /experiences/5am-market-run → /guides/where-to-eat + home #know | "what else to eat" / "know before you go" | Keeps the conversion page connected so it accrues authority instead of being a dead-end checkout. |
| Every subpage → Home | breadcrumb "Visit Duitama › Guides › …" | BreadcrumbList + visible trail = hierarchy for users, crawlers and agents in one stroke. |
| /partners/join (ES) ↔ /partners (EN) | "back to the registry" | The documented ES↔EN transition (§6.2) needs both hreflang-style clarity and a human path back. |

Two structural rules: nothing deeper than 2 clicks from home (the map above satisfies this); and when guides multiply, the *guide hub* (not the homepage) becomes the linking center for informational pages — protects the landing's conversion focus.

URL conventions to fix now, cheaply, in a one-page doc: lowercase, hyphens, English, no dates in slugs, no trailing-slash ambiguity (pick one, redirect the other), `/guides/…`, `/routes/…`, `/experiences/…`, `/partners` — and per BRIEF §3.6, no "vd" anywhere in paths.

---

## I. WEIRD / UNCOMMON FINDINGS (deserve a second look)

1. **"A real thread, last Tuesday"** (b:253) — see C2. The single most consequential ambiguity in the repo.
2. **`role="table"` links** (D ledger) — see A6. Uncommon pattern that reads as sophistication and functions as breakage.
3. **`aria-hidden="true"` wrapping a labeled SVG** (a:584) — see A5. Two accessibility intentions cancelling each other.
4. **Four pages, one og:url** — see A1/C1. Prototype artifact that becomes an SEO incident the day it's deployed.
5. **Schema contradicts the page's own honesty markers** — see A3. The only place the brand's best rule is broken is its most machine-read layer.
6. **Hero index numbering 01→02→04** (a:389–393) — see D3.
7. **`opacity:0.65` dimming as a semantic state** (D "In review") — see A4; state conveyed only by dimness + badge; the badge text saves it semantically, the contrast fails it visually.
8. **`body{padding-bottom:0}` no-op + unreserved sticky-bar space** (b:216) — leftover of an abandoned approach.
9. **`background:transparent` cancelling the class's own background** (a:630).
10. **Spanish aria-labels on an English page** (all placeholder `role="img"` divs) — see B5; becomes a production alt-text policy bug if PHOTO-BRIEF's "brief = alt" rule is followed literally.
11. **Google Fonts CDN vs the Berlin persona** — see B3; not weird code, but a strategy/implementation contradiction worth the name.
12. **The comparator's contenteditable scorecard** (index.html:118) — scores vanish on reload by design ("solo en memoria"); documented, but a `?scores=` URL-param serializer would cost 10 lines if the team ever wants to share scored links. Optional.
13. **`title` attributes as the only tooltip mechanism** — see A8; a 1999 affordance carrying a 2026 brand's core promise.
14. **README tail duplication** — the original two-line stub survives at the bottom of the rewritten README (:25–26).
15. **What was *not* found** (positive findings from targeted sweeps): zero `#FFFFFF`/`#fff` violations, zero "VD" abbreviations (both brand rules hold under grep), zero trackers, zero localStorage (per §7.1), zero secrets/keys/env files, zero broken heading hierarchies, exactly one `<h1>` per page, JSON parses clean in all four. The discipline claimed in DECISIONS.md is real.

---

## J. SECURITY / PRODUCTION HYGIENE

- **No secrets, tokens, keys or env files anywhere in the repo or its git history** (4 commits + merges reviewed). [CONFIRMED]
- **No forms exist yet** — the booking flow is mocked with `<button type="button">`, so there is no insecure form surface today. When the real booking/partner forms arrive: HTTPS-only, no card data touching the site (use the PSP's fields), and the ES partner form gets the same treatment. [CONFIRMED / forward-looking]
- **`console.log` event stubs** ship debug output to every visitor's console — intentional per §7.5, remove at launch. [CONFIRMED]
- **Third-party surface = exactly one** (Google Fonts). No SRI is possible on Google's dynamic CSS; self-hosting (B3) eliminates the class of concern (availability, privacy, GDPR). [CONFIRMED]
- **Unregistered identity assets** (domain, WhatsApp number, possibly the Instagram handle) referenced in public metadata — the real security item in this repo; see A2. Squatting the domain of a pre-launch brand whose materials are public on GitHub is a known pattern. Register before the repo/site gets any publicity. [CONFIRMED in-repo]
- **Public repo caution:** BRIEF.md and PENDING-FACTS.md expose the full strategy, unconfirmed pricing and partner pipeline. If the repository is public, that's a business-privacy choice someone should make deliberately, not by default. [RECOMMENDATION — repo visibility not verifiable from this sandbox]

---

## PRIORITIZED ACTION PLAN

### PHASE 1 — FIX NOW (this week, in this repo)
| # | What | Why | Files | Impact | Difficulty | Priority |
|---|---|---|---|---|---|---|
| 1.1 | Register visitduitama.com + WhatsApp line; confirm @visitduitama handle | Every byte of metadata already depends on them (A2) | external | Existential for brand identity | Trivial (money, not code) | P0 |
| 1.2 | Add `<meta name="robots" content="noindex">` to all four explorations + "remove at launch" line in DECISIONS | Prevents four draft near-duplicates entering the index (A1) | explorations/*.html, docs/DECISIONS.md | High | Trivial | P0 |
| 1.3 | Remove unverified price/altitude/schedule values from JSON-LD or gate them on verification; delete "(pending verification)" strings from FAQ answers | Machine layer must obey the honesty rule (A3) | explorations/*.html (script blocks) | High (trust + guidelines) | Easy | P0 |
| 1.4 | Fix D "In review" row contrast (drop `opacity`, use AA tokens) | Confirmed WCAG AA failure (A4) | d-verified-network.html | Medium | Easy | P1 |
| 1.5 | Remove `aria-hidden="true"` from A's `.alti` wrapper | Confirmed AT information loss (A5) | a-the-guide.html:584 | Medium | Trivial | P1 |
| 1.6 | Replace D's ledger ARIA-table roles with plain links (or a real table) | Link semantics erased for SR users (A6) | d-verified-network.html | Medium | Easy | P1 |
| 1.7 | B sticky bar: toggle `inert`/visibility with one shared boolean | Focusable content inside aria-hidden (A7) | b-trust-bridge.html | Medium | Easy | P1 |
| 1.8 | Make `.fact--pending` perceivable: sr-only text + one visible legend per page | The honesty system must reach touch/SR/agents (A8) | all four + shared/tokens.css | High (brand-defining) | Easy | P1 |
| 1.9 | Decide mobile nav (disclosure menu or documented single-page decision) | >60 % of traffic currently has no menu (A9) | all four, docs/DECISIONS.md | Medium | Easy–Medium | P1 |
| 1.10 | Resolve the B chat caption (real+dated or honestly framed) | Fabricated-proof risk (C2) | b-trust-bridge.html, docs/COPY-EN.md | High (trust) | Trivial | P1 |
| 1.11 | Micro-fixes: A index renumber; a:630 style contradiction; b:216 no-op; `lang="es"` spans; README tail | Confirmed smells (D2/D3/B5/I14) | as listed | Low each | Trivial | P2 |

### PHASE 2 — HIGH ROI (at "winner chosen", pre-launch)
| # | What | Why | Files | Impact | Difficulty | Priority |
|---|---|---|---|---|---|---|
| 2.1 | Winner gets: canonical, favicon set, theme-color, og:site_name/locale, real 1200×630 OG image + og:image:alt + twitter:image | Complete, working social/search identity (B1) | winner html + /og asset | High | Easy | P0 |
| 2.2 | robots.txt + XML sitemap + custom 404 + host-level redirects (www/apex, http→https, trailing slash) | Crawl plumbing that doesn't exist yet | new files + host config | High | Easy | P0 |
| 2.3 | Self-host fonts (subset woff2, preload 2 critical faces, size-adjust fallbacks); drop Franklin 300 + Plex Mono 500 | LCP, GDPR-Berlin, resilience (B3) | winner html/css | High | Medium | P1 |
| 2.4 | Linked schema graph with @ids (G): Organization+contactPoint(en/es)+logo, WebSite, WebPage, TouristDestination(geo, containedInPlace, sameAs Wikipedia/Wikidata Q1011125) | Entity disambiguation; the knowledge-graph seed (G, F2–F3) | winner html | High | Easy–Medium | P1 |
| 2.5 | Verify the PENDING-FACTS ledger (altitude, market hour, bus data, price) and flip markers site-wide | Unblocks schema honesty + brand claim; audit note: external sources support 2,590 m (Britannica says ~2,530) — IGAC check stands | content-wide | High | Medium (fieldwork) | P1 |
| 2.6 | Name the operator (About block + Person schema) | E-E-A-T + "who runs this?" (C4) | winner html | Medium-High | Easy | P2 |
| 2.7 | CI: html-validate + link check (fail on `href="#"`) + token-sync script | Guardrails before content scales (D1/D4/B4) | .github/workflows | Medium | Easy | P2 |
| 2.8 | Real WhatsApp deep link (wa.me) + verified contact row | Primary conversion channel becomes functional | winner html | High | Trivial | P0 (with 1.1) |

### PHASE 3 — GROW ORGANIC VISIBILITY (first 1–3 months post-launch)
| # | What | Why | Impact | Difficulty | Priority |
|---|---|---|---|---|---|
| 3.1 | Publish the three Guides (Bogotá→Duitama; Where to eat; Cycling from Duitama) at /guides/… | The promised cards become the SEO engine; each maps to a §7.4 target intent (E Tier 1) | Very high | Medium | P0 |
| 3.2 | /experiences/5am-market-run detail page; move Product/Offer schema there | Conversion URL + honest schema home (E4) | High | Medium | P1 |
| 3.3 | Route pages ×3 with GPX + altimetry (/routes/…) | Most linkable cycling assets; long-tail geo wins (E6) | High | Medium | P1 |
| 3.4 | Implement the internal-link map + BreadcrumbList (H) | Turns pages into a graph; ≤2-click depth | High | Easy | P1 |
| 3.5 | /partners registry page + /partners/join (ES, `lang="es"`, own metadata) | Second conversion route becomes real (§6.2) | Medium-High | Medium | P2 |
| 3.6 | Google Business Profile + Search Console + analytics wired to the existing data-event contract | Local pack presence; measurement without retrofitting | High | Easy | P1 |

### PHASE 4 — AGENTIC WEB (months 2–4, cheap and differentiating)
| # | What | Why | Impact | Difficulty | Priority |
|---|---|---|---|---|---|
| 4.1 | `<time datetime>` on all dates + visible "facts last checked" + dateModified in schema | Agents' currency question, answered (C3) | Medium-High | Easy | P1 |
| 4.2 | llms.txt at root | 20-line agent affordance (C5) | Low-Medium | Trivial | P2 |
| 4.3 | Per-partner LocalBusiness/FoodEstablishment nodes (address, hours once verified, servesCuisine, knowsLanguage) linked into the graph | The Verified registry becomes machine-readable — the product *is* structured data (G) | High | Medium | P1 |
| 4.4 | Keep/verify the no-JS content guarantee in CI (render without JS, assert facts present) | Protects the current biggest agentic asset (C6) | Medium | Easy | P2 |
| 4.5 | Publish the pending-fact semantics (a footnote page explaining data-verify) | Turns the honesty ledger into a public differentiator agents can cite | Medium | Easy | P3 |

### PHASE 5 — LONG-TERM AUTHORITY (quarters 2–4)
| # | What | Why | Impact | Difficulty | Priority |
|---|---|---|---|---|---|
| 5.1 | Grow the registry (D's "three kitchens & one páramo guide" → published entries) | Content velocity + unique data no OTA has | High | Ongoing | P1 |
| 5.2 | Tier-3 content: altitude explainer, market hour-by-hour, day trips (Paipa, Tota, Villa de Leyva), food glossary (E/F) | Topical authority for "Boyacá travel" in English | High | Medium | P2 |
| 5.3 | Cross-entity work with Ride The Andes when its site exists (mutual sameAs/memberOf, cycling-guide cross-links, shared route data) | Brand-family knowledge graph; cycling authority compounds | Medium-High | Easy | P2 |
| 5.4 | Link acquisition where cyclists and travelers already are: GPX/route submissions (komoot/Strava communities), Boyacá/Colombia travel forums, the partners' own sites linking their Verified entry, alcaldía/tourism-board relations | Backlinks from topical + local relevance, not directories | High | Ongoing | P2 |
| 5.5 | Evaluate ES version per the 6–12-month plan; if yes: /es/ tree + hreflang pairs (the partner-join page will have piloted the mechanics) | Double the addressable queries incl. domestic tourism | High | High | P3 |
| 5.6 | Events coverage (market days, cycling events) with Event schema *only when real dated events exist* | Fresh, entity-rich content; honest schema only | Medium | Medium | P3 |

---

## APPENDIX — VERIFICATION LOG

- **Files read:** 13/13, full contents. Git history: 4 commits + 2 merges inspected; no deleted-file secrets.
- **Greps (all four explorations unless noted):** canonical/favicon/robots/hreflang/theme-color = 0 hits; `href="#"` = 5 per file; `lang="es"` = 0; `#fff|#FFFFFF` = 0 ✓; `\bVD\b|vd-` = 0 ✓; `console.log` = 2 per exploration, 0 in comparator; isotype SVG = 3/3/3/7 (+1 comparator); inline `style=` = 12/18/36/25.
- **Measurements:** raw/gzip: index 12,447/3,784 B; A 38,252/10,833; B 32,965/9,602; C 33,575/9,759; D 37,871/9,995 — matches DECISIONS.md claims. Google Fonts CSS (Chrome UA): 16,536 B, 41 @font-face subset blocks, 9 faces requested.
- **JSON-LD:** parses in all four; types [Organization, TouristDestination, Product, FAQPage]; `@id` = none (confirmed isolated nodes).
- **Contrast:** 10 ratios from CONTRAST-AUDIT.md re-computed — all match exactly (12.03, 7.51, 5.09, 5.13, 4.58, 4.71, 4.59, 2.57, 4.74, 5.04). New failures found via element-opacity compositing (D `.lrow--review`): name 4.51:1 (passes as large text), dish 3.12:1 **fail**, badge 2.66:1 **fail**.
- **External:** visitduitama.com reachability **not verifiable** from this sandbox (egress proxy 403 on CONNECT) — finding A2 rests on PENDING-FACTS.md's own ledger. Duitama elevation cross-check: Wikipedia/Wikidata (Q1011125) and most sources list ~2,590 m; Britannica lists ~2,530 m — the site's pending-verification flag on altitude is justified and the IGAC plan is the right resolution.
- **Not verified / out of reach:** GitHub Pages/hosting status; Instagram handle availability; repo visibility (public/private); real-world bus schedules and market hours (the repo's own verification plan covers these).
