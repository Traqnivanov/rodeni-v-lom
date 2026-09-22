'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = __dirname;
const html = fs.readFileSync(path.join(root, 'prototype-screen1-map-interaction-lab.html'), 'utf8');
const countriesSource = fs.readFileSync(path.join(root, 'countries.js'), 'utf8');
const citiesSource = fs.readFileSync(path.join(root, 'cities.js'), 'utf8');
const adapterSource = fs.readFileSync(path.join(root, 'locality-suggestions-adapter.js'), 'utf8');

function loadSources() {
  const context = vm.createContext({ window: {} });
  vm.runInContext(countriesSource, context, { filename: 'countries.js' });
  vm.runInContext(citiesSource, context, { filename: 'cities.js' });
  vm.runInContext(adapterSource, context, { filename: 'locality-suggestions-adapter.js' });
  return {
    countries: context.window.RODENI_COUNTRIES,
    cities: context.window.RODENI_CITIES,
    adapter: context.window.RODENI_LOCALITY_SUGGESTIONS
  };
}

const { countries, cities, adapter } = loadSources();

let checks = 0;
function check(name, fn) {
  fn();
  checks += 1;
  process.stdout.write('PASS ' + name + '\n');
}

check('Layer-A inventory remains 1530 names under 60 country keys', () => {
  assert.equal(Object.keys(cities).length, 60);
  assert.equal(Object.values(cities).reduce((sum, list) => sum + list.length, 0), 1530);
});

check('every Layer-A name is reachable by exact-name query in its own country', () => {
  let reached = 0;
  for (const [code, list] of Object.entries(cities)) {
    for (const name of list) {
      assert(adapter.suggest(code, name).includes(name), code + ' missing exact result for ' + name);
      reached += 1;
    }
  }
  assert.equal(reached, 1530);
});

check('no country list contains duplicate identical names', () => {
  for (const [code, list] of Object.entries(cities)) {
    assert.equal(new Set(list).size, list.length, 'duplicate name in ' + code);
  }
});

check('dense-country search remains capped at 10', () => {
  assert.equal(cities.US.length, 180);
  const results = adapter.suggest('US', 'а');
  assert(results.length > 0);
  assert(results.length <= 10);
});

check('Germany and Spain use their full existing Layer-A lists', () => {
  assert.equal(cities.DE.length, 73);
  assert.equal(cities.ES.length, 55);
  assert.deepEqual(adapter.suggest('DE', 'мюнх'), ['Мюнхен']);
  assert.deepEqual(adapter.suggest('ES', 'мюнх'), []);
});

check('sparse-country exact suggestion remains available', () => {
  assert.equal(cities.SG.length, 1);
  const name = cities.SG[0];
  assert.deepEqual(adapter.suggest('SG', name), [name]);
});

check('Bulgaria Layer-A remains exactly the existing four-name list', () => {
  assert.equal(cities.BG.length, 4);
  for (const name of cities.BG) assert(adapter.suggest('BG', name).includes(name));
});

check('long original spelling is preserved exactly', () => {
  const name = 'Сейнт Джонс (Нюфаундленд и Лабрадор)';
  assert(cities.CA.includes(name));
  assert.deepEqual(adapter.suggest('CA', 'нюфаундленд'), [name]);
});

check('case and repeated-space normalization do not alter returned spelling', () => {
  assert.deepEqual(adapter.suggest('DE', '  МЮНХЕН  '), ['Мюнхен']);
});

check('country isolation excludes same query from unrelated list', () => {
  assert.deepEqual(adapter.suggest('DE', 'мюнх'), ['Мюнхен']);
  assert.deepEqual(adapter.suggest('ES', 'мюнх'), []);
});

check('adapter empty query remains empty; UI controls empty-focus behavior separately', () => {
  assert.deepEqual(adapter.suggest('DE', ''), []);
  assert(html.includes("if(!normalized)return demo.slice(0,7).map(place=>({name:place.name,place}))"));
});

check('active UI calls adapter only for selected country and renders at most 10 names', () => {
  assert(html.includes("localitySuggestions.suggest(code,query).forEach(add)"));
  assert(html.includes("const add=name=>{const key=norm(name);if(!key||seen.has(key)||names.length>=10)return"));
  assert(html.includes("const code=kind==='root'?'BG':state.country"));
});

check('keyboard selection wiring remains present', () => {
  assert(html.includes("e.key==='ArrowDown'"));
  assert(html.includes("e.key==='ArrowUp'"));
  assert(html.includes("e.key==='Enter'"));
  assert(html.includes("chooseSuggestion(kind,opt.dataset.name||'',opt.dataset.id||'')"));
});

check('pointer/click selection wiring remains present', () => {
  assert(html.includes("el.addEventListener('pointerdown',e=>e.preventDefault())"));
  assert(html.includes("el.addEventListener('click',()=>chooseSuggestion(kind,item.name,item.place?.id||''))"));
});

check('Layer-A choice still cannot invent canonical identity', () => {
  assert(html.includes("function chooseSuggestion(kind,name,placeId)"));
  assert(html.includes("state[kind]=''"));
  assert(!html.includes('state[kind]=name'));
});

check('all 60 city-list country codes exist in the 62-country selector source', () => {
  const codes = new Set(countries.map((entry) => entry[0]));
  for (const code of Object.keys(cities)) assert(codes.has(code), 'city list without country selector entry ' + code);
});

process.stdout.write('PASS screen1-layer-a-suggestions.test.cjs — ' + checks + ' checks\n');
