'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = __dirname;
const adapterPath = path.join(root, 'locality-suggestions-adapter.js');
const countriesPath = path.join(root, 'countries.js');
const citiesPath = path.join(root, 'cities.js');

function loadExistingLists() {
  const context = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(countriesPath, 'utf8'), context, { filename: countriesPath });
  vm.runInContext(fs.readFileSync(citiesPath, 'utf8'), context, { filename: citiesPath });
  return {
    countries: context.window.RODENI_COUNTRIES,
    cities: context.window.RODENI_CITIES
  };
}

const sources = loadExistingLists();
const adapter = require(adapterPath);
const beforeCountries = JSON.stringify(sources.countries);
const beforeCities = JSON.stringify(sources.cities);
let checks = 0;

function check(name, fn) {
  fn();
  checks += 1;
  process.stdout.write(`PASS ${name}\n`);
}

check('real source inventory is loaded', () => {
  assert.equal(sources.countries.length, 62);
  assert.equal(Object.keys(sources.cities).length, 60);
  assert.equal(Object.values(sources.cities).reduce((sum, list) => sum + list.length, 0), 1530);
});

check('valid suggestion is scoped to selected country', () => {
  assert.deepEqual(adapter.suggest('DE', 'мюнх', sources), ['Мюнхен']);
});

check('name that exists only in another country is not suggested', () => {
  assert.deepEqual(adapter.suggest('ES', 'мюнхен', sources), []);
  assert.deepEqual(adapter.suggest('DE', 'мюнхен', sources), ['Мюнхен']);
});

check('case and repeated/outer spaces are normalized for matching', () => {
  assert.deepEqual(
    adapter.suggest('DE', '   ФРАНКФУРТ    НА   МАЙН   ', sources),
    ['Франкфурт на Майн']
  );
});

check('original list spelling is returned unchanged', () => {
  assert.deepEqual(adapter.suggest('ES', 'мАдРиД', sources), ['Мадрид']);
});

check('results are capped at 10', () => {
  const results = adapter.suggest('ES', 'а', sources);
  assert.equal(results.length, 10);
  assert.ok(results.every((name) => typeof name === 'string'));
});

check('empty query returns no suggestions', () => {
  assert.deepEqual(adapter.suggest('DE', '    ', sources), []);
});

check('known country without city list returns no suggestions', () => {
  assert.deepEqual(adapter.suggest('MT', 'вал', sources), []);
  assert.deepEqual(adapter.suggest('LU', 'люк', sources), []);
});

check('unknown country code returns no suggestions', () => {
  assert.deepEqual(adapter.suggest('ZZ', 'мюнхен', sources), []);
});

check('no transliteration or automatic name correction is performed', () => {
  assert.deepEqual(adapter.suggest('ES', 'Madrid', sources), []);
});

check('original data remains unchanged', () => {
  assert.equal(JSON.stringify(sources.countries), beforeCountries);
  assert.equal(JSON.stringify(sources.cities), beforeCities);
});

check('browser-style load works without Node globals', () => {
  const browserContext = vm.createContext({
    window: {
      RODENI_COUNTRIES: sources.countries,
      RODENI_CITIES: sources.cities
    }
  });

  assert.equal(
    vm.runInContext('typeof module + "|" + typeof require + "|" + typeof process', browserContext),
    'undefined|undefined|undefined'
  );

  vm.runInContext(fs.readFileSync(adapterPath, 'utf8'), browserContext, { filename: adapterPath });
  assert.equal(typeof browserContext.window.RODENI_LOCALITY_SUGGESTIONS.suggest, 'function');
  assert.deepEqual(
    Array.from(browserContext.window.RODENI_LOCALITY_SUGGESTIONS.suggest('ES', 'мадр')),
    ['Мадрид']
  );
});

process.stdout.write(`PASS locality-suggestions-adapter.test.cjs — ${checks} checks\n`);
