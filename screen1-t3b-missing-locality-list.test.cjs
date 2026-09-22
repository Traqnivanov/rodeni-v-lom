'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = __dirname;
const html = fs.readFileSync(path.join(root, 'prototype-screen1-map-interaction-lab.html'), 'utf8');
const countriesSource = fs.readFileSync(path.join(root, 'countries.js'), 'utf8');
const citiesSource = fs.readFileSync(path.join(root, 'cities.js'), 'utf8');

function load(source, key) {
  const context = vm.createContext({ window: {} });
  vm.runInContext(source, context);
  return context.window[key];
}

const countries = load(countriesSource, 'RODENI_COUNTRIES');
const cities = load(citiesSource, 'RODENI_CITIES');
const countryCodes = new Set(countries.map((entry) => entry[0]));
const pathCodes = new Set([...html.matchAll(/data-country="([^"]+)"/g)].map((m) => m[1]));

let checks = 0;
function check(name, fn) {
  fn();
  checks += 1;
  process.stdout.write('PASS ' + name + '\n');
}

check('MT and LU are selectable countries without Layer-A lists', () => {
  assert(countryCodes.has('MT'));
  assert(countryCodes.has('LU'));
  assert.equal(cities.MT, undefined);
  assert.equal(cities.LU, undefined);
});

check('SG remains a distinct case: no geometry but it has Layer-A data', () => {
  assert(countryCodes.has('SG'));
  assert.equal(pathCodes.has('SG'), false);
  assert(Array.isArray(cities.SG));
  assert(cities.SG.length > 0);
});

check('LU has map geometry while MT does not', () => {
  assert.equal(pathCodes.has('LU'), true);
  assert.equal(pathCodes.has('MT'), false);
});

check('active candidate detects whether selected country has a local list', () => {
  assert(html.includes("function hasLocalityList(kind){const code=suggestionCountry(kind);return !!code&&Array.isArray(window.RODENI_CITIES?.[code])}"));
});

check('no-list country uses write-first placeholder', () => {
  assert(html.includes("hasList?'Потърси град или село':'Напиши град или село'"));
});

check('no-list country gives one concise human guidance block', () => {
  assert(html.includes('Няма готови предложения за тази държава. Напиши мястото и го провери.'));
  assert(!html.includes('За тази държава няма локален списък в демото.'));
  assert(!html.includes('За тази държава няма готови предложения в демото. Напиши мястото и го провери.'));
});

check('no-list verification block opens immediately', () => {
  assert(html.includes("const draft=!!draftFor(kind),hasList=hasLocalityList(kind),open=draft||!hasList"));
  assert(html.includes("!hasList?'Няма готови предложения за тази държава. Напиши мястото и го провери.'"));
});

check('no-list state hides contradictory missing-place link', () => {
  assert(html.includes("id=\"missing\" '+(open?'hidden':'')"));
});

check('no-list country still renders zero fake suggestions', () => {
  assert(html.includes("if(localitySuggestions&&typeof localitySuggestions.suggest==='function')localitySuggestions.suggest(code,query).forEach(add)"));
  assert.equal(cities.MT, undefined);
  assert.equal(cities.LU, undefined);
});

check('no-list resolver failure explains demo limitation without validating raw text', () => {
  assert(html.includes('В това демо още не можем да потвърдим места в тази държава. Написаното остава тук, но няма да го използваме като потвърдено място.'));
  assert(!html.includes('state[kind]=name'));
});

check('mandatory Current CTA remains canonical-only', () => {
  assert(html.includes('<button class="primary" id="next" '+(c?'':'disabled')+'>Продължи към „Откъде си?“</button>'));
});

check('no Current unverified bypass is introduced for no-list countries', () => {
  const block = html.match(/function fallbackBlock\(kind\)\{[\s\S]*?\nfunction syncDraftFromInput/)?.[0] || '';
  assert(block.includes("kind==='root'?"));
  assert(block.includes('Продължи с непотвърдено място'));
});

check('no fake country centre or raw-label coordinate path is introduced', () => {
  assert(!html.includes('countryCenter'));
  assert(!html.includes('countryCentre'));
  assert(!html.includes('state[kind]=name'));
});

check('inline JavaScript still parses', () => {
  for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new Function(match[1]);
});

process.stdout.write('PASS screen1-t3b-missing-locality-list.test.cjs — ' + checks + ' checks\n');
