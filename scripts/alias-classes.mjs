// Shortens long Tailwind class lists in the markup. Every long literal className="..." in src/**/*.tsx is replaced by a
// short alias (k1, k2, ...) whose rule in src/aliases.css applies exactly the same utilities. The page HTML carries the
// short name instead of 100-300 characters of utilities (text-to-HTML ratio, transfer size).
// Run `node scripts/alias-classes.mjs` after writing a new long className literal; already shortened ones are left alone.
// Tokens Tailwind generates nothing for (group, peer, animate-in, ...) stay in the attribute as they are.
// A second pass shortens the class strings inside className={...} expressions (template literals, ternaries, constants),
// but only where the pieces of one expression set disjoint CSS properties, so the cascade cannot change.
import fs from 'node:fs';
import path from 'node:path';
import { compile } from 'tailwindcss';
import ts from 'typescript';

const root = path.resolve(import.meta.dirname, '..');
const CSS_FILE = path.join(root, 'src/aliases.css');
const MIN_LENGTH = 30;

const twDir = path.join(root, 'node_modules/tailwindcss');
const compiler = await compile('@import "tailwindcss";', {
  loadStylesheet: async (id, base) => ({
    path: id,
    base,
    content: fs.readFileSync(id === 'tailwindcss' ? path.join(twDir, 'index.css') : path.join(twDir, id.replace(/^tailwindcss\//, '')), 'utf8'),
  }),
});
let lastLength = compiler.build([]).length;
const validCache = new Map();
function generatesCss(token) {
  if (validCache.has(token)) return validCache.get(token);
  const len = compiler.build([token]).length;
  const ok = len !== lastLength;
  lastLength = len;
  validCache.set(token, ok);
  return ok;
}

// Existing aliases (rule text -> name) so reruns reuse and extend the file.
const existing = fs.existsSync(CSS_FILE) ? fs.readFileSync(CSS_FILE, 'utf8') : '';
const byRule = new Map();
let next = 1;
for (const m of existing.matchAll(/\.k(\d+)\s*\{\s*@apply ([^;]*);/g)) {
  byRule.set(m[2].trim(), 'k' + m[1]);
  next = Math.max(next, Number(m[1]) + 1);
}
let added = '';

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.tsx')) files.push(p);
  }
})(path.join(root, 'src'));

let replaced = 0;
for (const file of files.sort()) {
  const src = fs.readFileSync(file, 'utf8');
  const out = src.replace(/className="([^"{}$]+)"/g, (all, value) => {
    if (value.length < MIN_LENGTH) return all;
    const tokens = value.split(/\s+/).filter(Boolean);
    if (tokens.length < 3 || tokens.every((t) => /^k\d+$/.test(t))) return all;
    const apply = tokens.filter(generatesCss);
    const keep = tokens.filter((t) => !generatesCss(t));
    if (apply.length < 3) return all;
    const rule = apply.join(' ');
    let name = byRule.get(rule);
    if (!name) {
      name = 'k' + next++;
      byRule.set(rule, name);
      added += `.${name} { @apply ${rule}; }\n`;
    }
    replaced++;
    return `className="${[name, ...keep].join(' ')}"`;
  });
  if (out !== src) fs.writeFileSync(file, out);
}


// ---- second pass: strings inside className={...} expressions ----
const loadStylesheet = async (id, base) => ({
  path: id,
  base,
  content: fs.readFileSync(id === 'tailwindcss' ? path.join(twDir, 'index.css') : path.join(twDir, id.replace(/^tailwindcss\//, '')), 'utf8'),
});
const baseLines = new Set(compiler.build([]).split('\n'));
const propCache = new Map();
async function propsOf(token) {
  if (propCache.has(token)) return propCache.get(token);
  const c = await compile('@import "tailwindcss";', { loadStylesheet });
  const set = new Set();
  for (const line of c.build([token]).split('\n')) {
    if (baseLines.has(line)) continue;
    const m = line.match(/^\s*([a-z-]+)\s*:/);
    if (m && !m[1].startsWith('--') && !['syntax', 'inherits', 'initial-value'].includes(m[1])) set.add(m[1]);
  }
  propCache.set(token, set);
  return set;
}
async function segProps(text) {
  const set = new Set();
  for (const t of text.split(/\s+/).filter(Boolean)) if (generatesCss(t)) for (const p of await propsOf(t)) set.add(p);
  return set;
}
const exclusive = (a, b) => a.path.some(([id, br]) => b.path.some(([id2, br2]) => id === id2 && br !== br2));
const aliasFor = (apply) => {
  const rule = apply.join(' ');
  let name = byRule.get(rule);
  if (!name) {
    name = 'k' + next++;
    byRule.set(rule, name);
    added += `.${name} { @apply ${rule}; }\n`;
  }
  return name;
};
function rewrite(text) {
  const lead = text.match(/^\s*/)[0];
  const trail = text.match(/\s*$/)[0];
  const tokens = text.split(/\s+/).filter(Boolean);
  const apply = tokens.filter(generatesCss);
  if (apply.length < 2 || text.trim().length < 14) return null;
  return lead + [aliasFor(apply), ...tokens.filter((t) => !generatesCss(t))].join(' ') + trail;
}

let replacedExpr = 0;
for (const file of files.sort()) {
  const src = fs.readFileSync(file, 'utf8');
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  // string constants that might be class lists
  const consts = new Map();
  (function find(n) {
    if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name) && n.initializer && (ts.isStringLiteral(n.initializer) || ts.isNoSubstitutionTemplateLiteral(n.initializer))) {
      consts.set(n.name.text, { node: n.initializer, refs: 0, ok: 0, bad: false });
    }
    ts.forEachChild(n, find);
  })(sf);
  const edits = [];
  const constUse = [];
  let condId = 0;

  const exprs = [];
  (function find(n) {
    if (ts.isJsxAttribute(n) && n.name.getText() === 'className' && n.initializer && ts.isJsxExpression(n.initializer) && n.initializer.expression) exprs.push(n.initializer.expression);
    // helpers such as `const linkClass = (active) => `...${active ? 'a' : 'b'}``
    if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name) && /class|cls/i.test(n.name.text) && n.initializer && ts.isArrowFunction(n.initializer) && !ts.isBlock(n.initializer.body)) exprs.push(n.initializer.body);
    ts.forEachChild(n, find);
  })(sf);

  for (const expr of exprs) {
    const segs = [];
    let ok = true;
    (function visit(n, pth) {
      if (!ok) return;
      if (ts.isParenthesizedExpression(n)) return visit(n.expression, pth);
      if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) return void segs.push({ start: n.getStart() + 1, end: n.getEnd() - 1, text: n.text, path: pth });
      if (ts.isTemplateExpression(n)) {
        segs.push({ start: n.head.getStart() + 1, end: n.head.getEnd() - 2, text: n.head.text, path: pth });
        for (const sp of n.templateSpans) {
          visit(sp.expression, pth);
          segs.push({ start: sp.literal.getStart() + 1, end: sp.literal.getEnd() - (ts.isTemplateTail(sp.literal) ? 1 : 2), text: sp.literal.text, path: pth });
        }
        return;
      }
      if (ts.isConditionalExpression(n)) {
        const id = condId++;
        visit(n.whenTrue, [...pth, [id, 't']]);
        visit(n.whenFalse, [...pth, [id, 'f']]);
        return;
      }
      if (ts.isBinaryExpression(n)) {
        const k = n.operatorToken.kind;
        if (k === ts.SyntaxKind.AmpersandAmpersandToken) return visit(n.right, pth);
        if (k === ts.SyntaxKind.PlusToken || k === ts.SyntaxKind.BarBarToken) { visit(n.left, pth); return visit(n.right, pth); }
      }
      if (ts.isIdentifier(n) && consts.has(n.text)) {
        const c = consts.get(n.text);
        return void segs.push({ const: n.text, text: c.node.text, path: pth });
      }
      if (n.kind === ts.SyntaxKind.NullKeyword || (ts.isIdentifier(n) && n.text === 'undefined')) return;
      ok = false;
    })(expr, []);
    const refNames = segs.filter((x) => x.const).map((x) => x.const);
    if (!ok || !segs.length) { for (const nm of refNames) consts.get(nm).bad = true; continue; }
    // pieces that can be on the same element must not set the same CSS property
    const props = [];
    for (const sg of segs) props.push(await segProps(sg.text));
    let clash = false;
    for (let i = 0; i < segs.length && !clash; i++) for (let j = i + 1; j < segs.length && !clash; j++) {
      if (exclusive(segs[i], segs[j])) continue;
      for (const p of props[i]) if (props[j].has(p)) { clash = true; break; }
    }
    if (clash) { for (const nm of refNames) consts.get(nm).bad = true; continue; }
    for (const sg of segs) {
      if (sg.const) { consts.get(sg.const).ok++; continue; }
      const text = rewrite(sg.text);
      if (text !== null) edits.push({ start: sg.start, end: sg.end, text });
    }
  }
  // constants: alias only when every use sits in a checked className expression
  for (const [name, c] of consts) {
    if (c.bad || !c.ok) continue;
    let total = 0;
    (function count(n) {
      if (ts.isIdentifier(n) && n.text === name && !(ts.isVariableDeclaration(n.parent) && n.parent.name === n)) total++;
      ts.forEachChild(n, count);
    })(sf);
    if (total !== c.ok) continue;
    const text = rewrite(c.node.text);
    if (text !== null) edits.push({ start: c.node.getStart() + 1, end: c.node.getEnd() - 1, text });
  }
  if (!edits.length) continue;
  let out = src;
  for (const e of edits.sort((a, b) => b.start - a.start)) out = out.slice(0, e.start) + e.text + out.slice(e.end);
  fs.writeFileSync(file, out);
  replacedExpr += edits.length;
}

if (!existing) fs.writeFileSync(CSS_FILE, '/* Generated and extended by scripts/alias-classes.mjs. Each .kN applies the utilities listed in its rule. */\n@layer utilities {\n' + added + '}\n');
else if (added) fs.writeFileSync(CSS_FILE, existing.replace(/\}\s*$/, added + '}\n'));
console.log(`alias-classes: ${replaced} className literals and ${replacedExpr} expression pieces shortened, ${byRule.size} aliases in src/aliases.css`);
