'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = __dirname;
const html = fs.readFileSync(path.join(root, 'prototype-screen1-map-interaction-lab.html'), 'utf8');
const countriesSource = fs.readFileSync(path.join(root, 'countries.js'), 'utf8');
const citiesSource = fs.readFileSync(path.join(root, 'cities.js'), 'utf8');

function load(source, marker) {
  const context = vm.createContext({ window: {} });
  vm.runInContext(source, context);
  return context.window[marker];
}

const countries = load(countriesSource, 'RODENI_COUNTRIES');
const cities = load(citiesSource, 'RODENI_CITIES');
const pathCodes = new Set([...html.matchAll(/data-country="([^"]+)"/g)].map((m) => m[1]));

let checks = 0;
function check(name, fn) {
  fn();
  checks += 1;
  process.stdout.write('PASS ' + name + '\n');
}

check('MT and SG remain valid selectable countries', () => {
  const codes = new Set(countries.map((entry) => entry[0]));
  assert(codes.has('MT'));
  assert(codes.has('SG'));
});

check('MT and SG are exactly the selectable countries without current SVG geometry', () => {
  const missing = countries.map((entry) => entry[0]).filter((code) => !pathCodes.has(code));
  assert.deepEqual(missing, ['MT', 'SG']);
});

check('no-geometry state is derived from selected country plus absent shape', () => {
  assert(html.includes("const countryNoGeometry=active&&state.view==='current'&&!c&&!!state.country&&!countryShape"));
});

check('no-geometry state uses human continuation copy', () => {
  assert(html.includes("'Избрана държава: '+(countries[state.country]||state.country)+'. Продължи с населеното място.'"));
});

check('no-geometry copy is informational, not an error state', () => {
  const line = html.match(/const countryNoGeometry=.*?const caption=.*?;\$\('mapCaption'\)/s)?.[0] || '';
  assert(line.includes('Продължи с населеното място.'));
  assert(!line.includes('fail('));
  assert(!line.includes('error'));
});

check('no country-centre or fake point fallback is introduced', () => {
  assert(!html.includes('countryCenter'));
  assert(!html.includes('countryCentre'));
  assert(!html.includes('countryPoint='));
  assert(!/state\.country.*places\.find/.test(html));
});

check('map uses SVG geometry when available', () => {
  assert(html.includes("const countryShape=active&&!c&&state.country?svg.querySelector('[data-country=\"'+state.country+'\"]'):null"));
  assert(html.includes("else if(countryShape){const b=countryShape.getBBox?.()"));
});

check('MT and SG remain distinct locality cases', () => {
  assert.equal(cities.MT, undefined);
  assert(Array.isArray(cities.SG));
  assert(cities.SG.length > 0);
});

check('accessibility text mirrors no-geometry continuation state', () => {
  assert(html.includes("$('mapA11y').textContent=countryNoGeometry?'Избрана държава: '+(countries[state.country]||state.country)+'. Продължи с населеното място.'"));
});

check('inline JavaScript still parses', () => {
  for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new Function(match[1]);
});

process.stdout.write('PASS screen1-country-no-geometry.test.cjs — ' + checks + ' checks\n');
