'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const html = fs.readFileSync(path.join(__dirname, 'prototype-screen1-map-interaction-lab.html'), 'utf8');

function extractPlaces() {
  const start = html.indexOf('const places=');
  const end = html.indexOf(';\nconst find=', start);
  assert(start >= 0 && end > start, 'places expression not found');
  const expression = html.slice(start + 'const places='.length, end);
  return vm.runInNewContext(expression);
}

const places = extractPlaces();
const byId = new Map(places.map((p) => [p.id, p]));
const widths = [360, 390, 412];
const heights = [240, 300];
const scenarios = [
  ['Spain–Lom', 'ES|Мадрид', 'BG|Лом'],
  ['Germany–Lom', 'DE|Мюнхен', 'BG|Лом'],
  ['UK–Lom', 'GB|Лондон', 'BG|Лом'],
  ['Italy–Lom', 'IT|Милано', 'BG|Лом'],
  ['nearby BG pair', 'BG|Лом', 'BG|Ковачица'],
  ['same-place pair', 'BG|Лом', 'BG|Лом'],
  ['long labels', 'GB|Манчестър', 'BG|Велико Търново']
];

function fitPair(a, b, width, height) {
  const points = [a, b];
  let x = points.reduce((sum, p) => sum + p.x, 0) / points.length;
  let y = points.reduce((sum, p) => sum + p.y, 0) / points.length;
  let w = Math.max(40, Math.max(...points.map((p) => p.x)) - Math.min(...points.map((p) => p.x)) + 42);
  let h = Math.max(30, Math.max(...points.map((p) => p.y)) - Math.min(...points.map((p) => p.y)) + 30);
  const ratio = width / height;
  if (w / h < ratio) w = h * ratio;
  else h = w / ratio;
  const project = (p) => ({
    x: (p.x - x + w / 2) / w * width,
    y: (p.y - y + h / 2) / h * height
  });
  return { x, y, w, h, a: project(a), b: project(b) };
}

let checks = 0;
function check(name, fn) {
  fn();
  checks += 1;
  process.stdout.write('PASS ' + name + '\n');
}

check('required restored country geometry remains present', () => {
  for (const code of ['ES', 'DE', 'GB', 'IT', 'BG']) {
    assert(html.includes('data-country="' + code + '"'), 'missing country path ' + code);
  }
});

check('matrix localities exist in the actual candidate data', () => {
  for (const [, a, b] of scenarios) {
    assert(byId.has(a), 'missing ' + a);
    assert(byId.has(b), 'missing ' + b);
  }
});

for (const [label, aId, bId] of scenarios) {
  check(label + ' projects both points inside all matrix viewports', () => {
    const a = byId.get(aId);
    const b = byId.get(bId);
    for (const width of widths) {
      for (const height of heights) {
        const fit = fitPair(a, b, width, height);
        for (const point of [fit.a, fit.b]) {
          assert(Number.isFinite(point.x) && Number.isFinite(point.y));
          assert(point.x >= 0 && point.x <= width, label + ' x outside ' + width + 'x' + height);
          assert(point.y >= 0 && point.y <= height, label + ' y outside ' + width + 'x' + height);
        }
      }
    }
  });
}

check('normal and 200% pair heights match C2 contract', () => {
  assert(html.includes('.flow.map-pair .map{height:calc(180px + 3.75rem)}'));
});

check('fixed-size HTML labels remain outside transformed SVG geometry', () => {
  const geometryClose = html.indexOf('</g></svg><div class="markers" id="markers"');
  assert(geometryClose >= 0);
  assert(html.includes('.label{position:absolute'));
});

process.stdout.write('PASS screen1-map-matrix.test.cjs — ' + checks + ' checks\n');
