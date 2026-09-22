'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = __dirname;
const html = fs.readFileSync(path.join(root, 'prototype-screen1-map-interaction-lab.html'), 'utf8');
const citiesSource = fs.readFileSync(path.join(root, 'cities.js'), 'utf8');

function loadCities() {
  const context = vm.createContext({ window: {} });
  vm.runInContext(citiesSource, context, { filename: 'cities.js' });
  return context.window.RODENI_CITIES;
}
const cities = loadCities();

const placesStart = html.indexOf('const places=') + 'const places='.length;
const placesEnd = html.indexOf(';\nconst find=', placesStart);
const places = new Function('return ' + html.slice(placesStart, placesEnd))();

const norm = (s) => String(s || '').trim().replace(/\s+/g, ' ').toLocaleLowerCase('bg');
const bgAll = places.filter((p) => p.country === 'BG');
const bgNormal = bgAll.filter((p) => !p.fallback);

function classify(name) {
  return {
    layerA: (cities.BG || []).some((n) => norm(n) === norm(name)),
    directCanonical: bgNormal.some((p) => norm(p.name) === norm(name)),
    resolverCanonical: bgAll.some((p) => norm(p.name) === norm(name)),
    fallbackFixture: bgAll.some((p) => norm(p.name) === norm(name) && p.fallback)
  };
}

let checks = 0;
function check(name, fn) {
  fn();
  checks += 1;
  process.stdout.write('PASS ' + name + '\n');
}

check('Root remains nationally scoped to Bulgaria', () => {
  assert(html.includes("const code=kind==='root'?'BG':state.country"));
  assert(html.includes("inputField('root','Населено място в България','BG',state.root)"));
});

check('approved Root helper is present', () => {
  assert(html.includes('Избери населеното място в България, което приемаш за свое. Така ще свържем откъде си с мястото, където живееш сега.'));
});

check('approved Root CTA is present', () => {
  assert(html.includes('Виж какво показва картата'));
});

check('compact Current summary includes country and change action', () => {
  assert(html.includes("esc(c.name)+', '+esc(countries[c.country]||c.country)"));
  assert(html.includes('class="quiet status-change" id="back">Промени</button>'));
});

check('Root privacy hint remains explicit', () => {
  assert(html.includes('Изборът още не се публикува и не се брои в картата.'));
});

check('existing Layer-A Bulgaria list is intentionally incomplete', () => {
  assert.deepEqual(cities.BG, ['София','Пловдив','Бургас','Стара Загора']);
});

check('Lom is demo canonical even though not in current Layer-A list', () => {
  const c = classify('Лом');
  assert.equal(c.layerA, false);
  assert.equal(c.directCanonical, true);
});

check('Sofia is Layer-A and direct demo canonical', () => {
  const c = classify('София');
  assert.equal(c.layerA, true);
  assert.equal(c.directCanonical, true);
});

check('Burgas demonstrates Layer-A to controlled resolver canonicalization', () => {
  const c = classify('Бургас');
  assert.equal(c.layerA, true);
  assert.equal(c.directCanonical, false);
  assert.equal(c.resolverCanonical, true);
  assert.equal(c.fallbackFixture, true);
});

check('Stara Zagora demonstrates Layer-A unresolved Root', () => {
  const c = classify('Стара Загора');
  assert.equal(c.layerA, true);
  assert.equal(c.resolverCanonical, false);
});

check('Traykovo demonstrates place absent from current Layer-A and demo fixtures', () => {
  const c = classify('Трайково');
  assert.equal(c.layerA, false);
  assert.equal(c.resolverCanonical, false);
});

check('Root unresolved path remains Root-only unverified pending state', () => {
  assert(html.includes("if(kind==='root')$('unverified').hidden=false"));
  assert(html.includes("state.pending=input.value.trim().slice(0,100);state.root='';state.rootDraft=''"));
});

check('unverified Root cannot become exact canonical aggregate', () => {
  assert(html.includes("function aggregate(current,root,pending){if(!current)return {type:'suppressed'};if(pending)return currentOnly[current]?{type:'current',band:currentOnly[current]}:{type:'suppressed'}"));
});

check('Latin matching is Root-only', () => {
  assert(html.includes("if(kind==='root'){"));
  assert(html.includes("const latinQuery=bgLatinKey(query)"));
});

check('common Bulgarian Latin spellings normalize for search', () => {
  const helperStart = html.indexOf('const find=');
  const helperEnd = html.indexOf('const exact=', helperStart);
  const helperSrc = html.slice(helperStart, helperEnd);
  const bgLatinKey = new Function('const places=[];' + helperSrc + ';return bgLatinKey;')();
  assert.equal(bgLatinKey('Lom'), bgLatinKey('Лом'));
  assert.equal(bgLatinKey('Kovachitsa'), bgLatinKey('Ковачица'));
  assert.equal(bgLatinKey('Sofia'), bgLatinKey('София'));
  assert.equal(bgLatinKey('Sofiya'), bgLatinKey('София'));
  assert.equal(bgLatinKey('Veliko Tarnovo'), bgLatinKey('Велико Търново'));
});

check('Root Latin matching does not promote raw Latin text to canonical identity', () => {
  assert(!html.includes('state[kind]=name'));
  assert(html.includes("return names.map(name=>({name,place:demo.find(p=>norm(p.name)===norm(name))||null}))"));
});

check('nearby BG map fixtures exist for Kovachitsa and Lom', () => {
  const lom = bgAll.find((p) => p.name === 'Лом');
  const kov = bgAll.find((p) => p.name === 'Ковачица');
  assert(lom && kov);
  assert(Math.abs(lom.x - kov.x) < 1);
  assert(Math.abs(lom.y - kov.y) < 1);
});

check('same-place Root/Current is not forbidden by state logic', () => {
  assert(bgAll.some((p) => p.name === 'Лом'));
  assert(!html.includes('current===root'));
  assert(!html.includes('state.current===state.root'));
});

check('map camera can use the same coordinate-bearing locality for both contexts', () => {
  assert(html.includes("const ps=[c,r].filter(hasCoords)"));
  assert(html.includes("w=Math.max(40,Math.max(...ps.map(p=>p.x))-Math.min(...ps.map(p=>p.x))+42)"));
  assert(html.includes("h=Math.max(30,Math.max(...ps.map(p=>p.y))-Math.min(...ps.map(p=>p.y))+30)"));
});

check('inline JavaScript still parses', () => {
  for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new Function(match[1]);
});

process.stdout.write('PASS screen1-t5-root-bulgaria-coverage.test.cjs — ' + checks + ' checks\n');
