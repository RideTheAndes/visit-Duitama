import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..');

// 1. Read allowlist
const allowlistPath = path.join(__dirname, 'facts-allowlist.txt');
let allowlist = [];
if (fs.existsSync(allowlistPath)) {
  allowlist = fs.readFileSync(allowlistPath, 'utf8').split('\n').map(l => l.trim()).filter(l => l.length > 0);
}

// 2. Read PENDING-FACTS.md
const pendingFactsPath = path.join(repoRoot, 'docs', 'PENDING-FACTS.md');
const pendingFactsContent = fs.readFileSync(pendingFactsPath, 'utf8');
const validVerifyIds = new Set();
for (const match of pendingFactsContent.matchAll(/\|\s*`([^`]+)`\s*\|/g)) {
  validVerifyIds.add(match[1]);
}
const usedVerifyIds = new Set();

const filesToScrape = [
  'explorations/a-the-guide.html',
  'explorations/b-trust-bridge.html',
  'explorations/c-five-am.html',
  'explorations/d-verified-network.html'
];

let violations = [];
let jsonLdViolations = [];

for (const relPath of filesToScrape) {
  const filePath = path.join(repoRoot, relPath);
  const content = fs.readFileSync(filePath, 'utf8');

  // a) fact--pending check
  const spanRegex = /<span[^>]*class="[^"]*fact--pending[^"]*"[^>]*>([\s\S]*?)<\/span>/g;
  let spanMatch;
  while ((spanMatch = spanRegex.exec(content)) !== null) {
    const spanTag = spanMatch[0];
    const dataVerifyMatch = spanTag.match(/data-verify="([^"]+)"/);
    const titleMatch = spanTag.match(/title="Pending verification"/);

    if (!dataVerifyMatch || !titleMatch) {
      violations.push(`[fact--pending invalid] ${relPath}: missing data-verify or title="Pending verification" in ${spanTag}`);
    } else {
      const verifyId = dataVerifyMatch[1];
      usedVerifyIds.add(verifyId);
      // b) validity in PENDING-FACTS.md
      if (!validVerifyIds.has(verifyId)) {
        violations.push(`[invalid data-verify] ${relPath}: data-verify="${verifyId}" not found in PENDING-FACTS.md in ${spanTag}`);
      }
    }
  }

  // d) Extract JSON-LD (excepción #10)
  const scriptRegex = /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let scriptMatch;
  while ((scriptMatch = scriptRegex.exec(content)) !== null) {
      const jsonContent = scriptMatch[1];
      const numRegex = /\b\d+(?:[,.]\d+)?(?:[:]\d{2})?(?:\s*(?:km|m|h|AM|PM|°C))?\b/gi;
      let matches = jsonContent.match(numRegex) || [];
      for (const m of matches) {
          if (!allowlist.includes(m.trim())) {
              jsonLdViolations.push(`[JSON-LD exception] ${relPath}: found unverified fact "${m.trim()}"`);
          }
      }
  }

  // c) Extract text and attributes outside .fact--pending
  let cleanHtml = content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  cleanHtml = cleanHtml.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
  cleanHtml = cleanHtml.replace(/<span[^>]*class="[^"]*fact--pending[^"]*"[^>]*>[\s\S]*?<\/span>/gi, '');

  let attrsText = [];
  for (const match of cleanHtml.matchAll(/\b(?:aria-label|alt)="([^"]*)"/gi)) {
      attrsText.push(match[1]);
  }
  for (const match of cleanHtml.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/gi)) {
      attrsText.push(match[1]);
  }

  let textOnly = cleanHtml.replace(/<[^>]+>/g, ' ');
  let fullText = textOnly + ' ' + attrsText.join(' ');
  // Decode some HTML entities
  fullText = fullText.replace(/&nbsp;/gi, ' ').replace(/&[a-zA-Z]+;/g, ' ');
  fullText = fullText.replace(/\s+/g, ' ');

  // Replace exact allowlist items in text
  const sortedAllowlist = [...allowlist].sort((a, b) => b.length - a.length);
  for (const item of sortedAllowlist) {
      const esc = item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const itemRegex = new RegExp(`\\b${esc}\\b`, 'g');
      fullText = fullText.replace(itemRegex, ' ');
  }

  // Now search for remaining potential facts:
  // - digits (with optional commas/dots) followed by units
  // - emails
  // - whatsapp numbers (+57)
  const factRegex = /\b(?:\d+(?:[,.]\d+)?(?:[:]\d{2})?(?:\s*(?:km|m|h|AM|PM|°C))?|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,})\b|\+?57\s?\d{3}\s?\d{3}\s?\d{4}/gi;
  for (const m of fullText.match(factRegex) || []) {
      const v = m.trim();
      // Ignore if it's purely letters or empty
      if (v.length > 0 && /[0-9@]/.test(v)) {
          violations.push(`[unverified fact] ${relPath}: found "${v}" outside .fact--pending`);
      }
  }
}

// b) check unused IDs
for (const id of validVerifyIds) {
    if (!usedVerifyIds.has(id)) {
        violations.push(`[unused data-verify] PENDING-FACTS.md: unused ID "${id}"`);
    }
}

// Remove duplicates
violations = [...new Set(violations)].sort();
jsonLdViolations = [...new Set(jsonLdViolations)].sort();

const allViolations = [...violations, ...jsonLdViolations];

// Compare with baseline if it exists
const baselinePath = path.join(__dirname, 'facts-baseline.txt');
let baseline = [];
if (fs.existsSync(baselinePath)) {
    baseline = fs.readFileSync(baselinePath, 'utf8').split('\n').filter(l => l.length > 0);
}

const isCI = process.env.CI === 'true' || process.argv.includes('--ci');

if (baseline.length > 0 && isCI) {
    const newViolations = allViolations.filter(v => !baseline.includes(v));
    const resolvedViolations = baseline.filter(v => !allViolations.includes(v));

    if (newViolations.length > 0) {
        console.error("❌ CI FAILED: Found NEW unverified facts or violations:");
        newViolations.forEach(v => console.error(v));
        process.exit(1);
    } else if (resolvedViolations.length > 0) {
        console.log("✅ CI PASSED, but you fixed some violations! Update facts-baseline.txt");
    } else {
        console.log("✅ CI PASSED: All violations match baseline.");
    }
} else if (process.argv.includes('--update-baseline')) {
    fs.writeFileSync(baselinePath, allViolations.join('\n') + '\n', 'utf8');
    console.log(`Updated baseline at ${baselinePath} with ${allViolations.length} violations.`);
} else {
    // Just report
    console.log("Violations:");
    violations.forEach(v => console.log(v));
    console.log("\nJSON-LD Exceptions:");
    jsonLdViolations.forEach(v => console.log(v));
    console.log(`\nFound ${allViolations.length} total violations.`);
}
