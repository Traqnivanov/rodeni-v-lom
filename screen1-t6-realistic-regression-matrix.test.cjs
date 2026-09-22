'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = __dirname;
const html = fs.readFileSync(path.join(root, 'prototype-screen1-map-interaction-lab.html'), 'utf8');
const review = fs.readFileSync(path.join(root, 'prototype-screen1-mobile-visual-review.html'), 'utf8');
const countriesSource = fs.readFileSync(path.join(root, 'countries.js'), 'utf8');
const citiesSource = fs.readFileSync(path.join(root, 'cities.js'), 'utf8');
const adapter = require(path.join(root, 'locality-suggestions-adapter.js'));

function load(source, key) {
  const context = vm.createContext({ window: {} });
  vm.runInContext(source, context);
  return context.window[key];
}
const countries = load(countriesSource, 'RODENI_COUNTRIES');
const cities = load(citiesSource, 'RODENI_CITIES');
const countryMap = Object.fromEntries(countries);

let checks = 0;
function check(name, fn) {
  fn();
  checks += 1;
  process.stdout.write('PASS ' + name + '\n');
}

check('expanded country source remains 62 countries', () => {
  assert.equal(countries.length, 62);
});

check('Layer-A city source remains 60 country lists and 1530 names', () => {
  assert.equal(Object.keys(cities).length, 60);
  assert.equal(Object.values(cities).reduce((n, list) => n + list.length, 0), 1530);
});

check('dense-country representative is real: US has 180 names', () => {
  assert.equal(cities.US.length, 180);
});

check('dense-country search is capped at 10', () => {
  const result = adapter.suggest('US', 'а', {
    countries,
    cities
  });
  assert.equal(result.length, 10);
  assert.deepEqual(result.slice(0, 4), ['Лос Анджелис','Чикаго','Филаделфия','Сан Антонио']);
});

check('sparse-country representative is real: SI has one name', () => {
  assert.deepEqual(cities.SI, ['Любляна']);
  assert.deepEqual(adapter.suggest('SI', 'люб', { countries, cities }), ['Любляна']);
});

check('missing-list representatives remain MT and LU', () => {
  assert.equal(cities.MT, undefined);
  assert.equal(cities.LU, undefined);
  assert.deepEqual(adapter.suggest('MT', 'вал', { countries, cities }), []);
  assert.deepEqual(adapter.suggest('LU', 'люк', { countries, cities }), []);
});

check('SG remains sparse but not missing-list', () => {
  assert.deepEqual(cities.SG, ['Сингапур']);
});

check('long locality representative is real', () => {
  const name = 'Сейнт Джонс (Нюфаундленд и Лабрадор)';
  assert(cities.CA.includes(name));
  assert.deepEqual(adapter.suggest('CA', 'сейнт', { countries, cities }), [name]);
});

check('long country representative is real', () => {
  assert.equal(countryMap.AE, 'Обединени арабски емирства');
});

check('canonical demo locality path still exists', () => {
  assert(html.includes("['DE','Мюнхен'"));
  assert(html.includes("state[kind]=p.id;setDraft(kind,'')"));
});

check('list-only locality remains draft-only', () => {
  assert(html.includes("state[kind]='';setDraft(kind,name)"));
  assert(!html.includes('state[kind]=name'));
});

check('country switch clears Current canonical and draft state', () => {
  assert(html.includes("state.country=$('country').value;state.current='';state.currentDraft='';attempt=0;resetMapInteractionState();save();render()"));
});

check('Current CTA remains disabled without canonical Current', () => {
  assert(html.includes("(c?'':'disabled')+'>Продължи към „Откъде си?“"));
});

check('Root CTA remains disabled without canonical Root', () => {
  assert(html.includes("(r?'':'disabled')+'>Виж какво показва картата"));
});

check('expired/invalid session is discarded and recovery notice exists', () => {
  assert(html.includes("Date.now()-d.updated<86400000"));
  assert(html.includes("sessionStorage.removeItem(KEY);recovered=true"));
  assert(html.includes('Предишният избор е изтекъл или не може да се възстанови. Посочи местата отново.'));
});

check('error state keeps retry, skip and change-context paths separate', () => {
  assert(html.includes('Резултатът не се зареди'));
  assert(html.includes('Опитай отново'));
  assert(html.includes('Продължи без публичен резултат'));
  assert(html.includes('Промени местата'));
});

check('Root fallback remains Root-only unverified', () => {
  assert(html.includes("kind==='root'?'<button class=\"text-button\" id=\"unverified\" hidden>Продължи с непотвърдено място</button>':'')"));
});

check('unverified Root cannot create exact aggregate', () => {
  assert(html.includes("if(pending)return currentOnly[current]?{type:'current',band:currentOnly[current]}:{type:'suppressed'}"));
});

check('review matrix exposes all required mobile widths', () => {
  for (const width of ['360','390','412']) {
    assert(review.includes('<option value="' + width + '">'));
  }
});

check('review matrix exposes 200 percent text', () => {
  assert(review.includes('<option value="200">200%</option>'));
});

check('review harness contains dense/sparse/long/switch/recovery scenarios', () => {
  for (const mode of ['t6dense','t6sparse','t6long','t6longcountry','t6switch','t6recovery']) {
    assert(review.includes('value="' + mode + '"'));
  }
});

check('review recovery scenario injects an expired session only inside QA harness', () => {
  assert(review.includes("Date.now()-90000000"));
  assert(review.includes("mode==='t6recovery'"));
  assert(!html.includes('Date.now()-90000000'));
});

check('review diagnostics expose current and Root state after scenario completion', () => {
  assert(review.includes("current='+(stored.current||'∅')"));
  assert(review.includes("currentDraft='+(stored.currentDraft||'∅')"));
  assert(review.includes("root='+(stored.root||'∅')"));
  assert(review.includes("pending='+(stored.pending||'∅')"));
});

check('inline candidate JavaScript still parses', () => {
  for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new Function(match[1]);
});

check('inline review harness JavaScript still parses', () => {
  for (const match of review.matchAll(/<script>([\s\S]*?)<\/script>/g)) new Function(match[1]);
});

process.stdout.write('PASS screen1-t6-realistic-regression-matrix.test.cjs — ' + checks + ' checks\n');
