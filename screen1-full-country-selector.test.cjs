'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = __dirname;
const html = fs.readFileSync(path.join(root, 'prototype-screen1-map-interaction-lab.html'), 'utf8');
const countriesSource = fs.readFileSync(path.join(root, 'countries.js'), 'utf8');

function loadCountries() {
  const context = vm.createContext({ window: {} });
  vm.runInContext(countriesSource, context, { filename: 'countries.js' });
  return context.window.RODENI_COUNTRIES;
}

const countries = loadCountries();

let checks = 0;
function check(name, fn) {
  fn();
  checks += 1;
  process.stdout.write('PASS ' + name + '\n');
}

check('country source contains exactly 62 entries', () => {
  assert.equal(countries.length, 62);
});

check('country source has unique ISO codes', () => {
  const codes = countries.map((entry) => entry[0]);
  assert.equal(new Set(codes).size, 62);
});

check('active candidate uses the complete source list without a 20-country gate', () => {
  assert(html.includes("const countryPairs=Array.isArray(window.RODENI_COUNTRIES)?window.RODENI_COUNTRIES:[];"));
  assert(html.includes("const countries=Object.fromEntries(countryPairs);"));
  assert(!html.includes('C2_COUNTRY_CODES'));
});

check('selector renders source-backed country entries', () => {
  assert(html.includes("Object.entries(countries).map(([code,name])=>'<option value=\"'+code+'\" '+(state.country===code?'selected':'')+'>'+name+'</option>').join('')"));
});

check('source order starts with the existing canonical entries', () => {
  assert.deepEqual(countries.slice(0, 5).map((entry) => entry[0]), ['BG','DE','ES','GB','IT']);
});

check('country change still clears current locality before rerender', () => {
  assert(html.includes("state.country=$('country').value;state.current='';attempt=0;resetMapInteractionState();save();render();$('current').focus()"));
});

check('Root remains scoped to Bulgaria', () => {
  assert(html.includes("const code=kind==='root'?'BG':state.country"));
  assert(html.includes("inputField('root','Населено място','BG',state.root)"));
});

check('no new network/backend dependency is introduced', () => {
  assert(!/\bfetch\s*\(|supabase|geonames/i.test(html));
});

check('inline JavaScript still parses', () => {
  for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
    new Function(match[1]);
  }
});

process.stdout.write('PASS screen1-full-country-selector.test.cjs — ' + checks + ' checks\n');
