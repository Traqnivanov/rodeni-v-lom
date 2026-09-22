'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = __dirname;
const labPath = path.join(root, 'prototype-screen1-locality-integration-lab.html');
const officialPath = path.join(root, 'prototype-screen1-work-c2.html');
const countriesPath = path.join(root, 'countries.js');
const citiesPath = path.join(root, 'cities.js');
const adapterPath = path.join(root, 'locality-suggestions-adapter.js');

const lab = fs.readFileSync(labPath, 'utf8');
const official = fs.readFileSync(officialPath, 'utf8');

function gitBlobSha(text) {
  const body = Buffer.from(text, 'utf8');
  return crypto.createHash('sha1')
    .update(Buffer.from('blob ' + body.length + '\0'))
    .update(body)
    .digest('hex');
}

function loadExistingLists() {
  const context = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(countriesPath, 'utf8'), context, { filename: countriesPath });
  vm.runInContext(fs.readFileSync(citiesPath, 'utf8'), context, { filename: citiesPath });
  return {
    countries: context.window.RODENI_COUNTRIES,
    cities: context.window.RODENI_CITIES
  };
}

let checks = 0;
function check(name, fn) {
  fn();
  checks += 1;
  process.stdout.write('PASS ' + name + '\n');
}

check('official WORK C2 remains the reviewed blob', () => {
  assert.equal(gitBlobSha(official), '750eafb4275b8e551325bf372bf70a028ac5c3ab');
  assert(!official.includes('LOCALITY INTEGRATION LAB'));
});

check('lab loads existing country/city data before the adapter and app', () => {
  const countriesAt = lab.indexOf('<script src="countries.js"></script>');
  const citiesAt = lab.indexOf('<script src="cities.js"></script>');
  const adapterAt = lab.indexOf('<script src="locality-suggestions-adapter.js"></script>');
  const appAt = lab.indexOf("<script>\n'use strict';");
  assert(countriesAt >= 0 && citiesAt > countriesAt && adapterAt > citiesAt && appAt > adapterAt);
});

check('all inline JavaScript parses', () => {
  for (const match of lab.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
    new Function(match[1]);
  }
});

const sources = loadExistingLists();
const adapter = require(adapterPath);

check('real source inventory is still 62 countries / 60 lists / 1530 names', () => {
  assert.equal(sources.countries.length, 62);
  assert.equal(Object.keys(sources.cities).length, 60);
  assert.equal(Object.values(sources.cities).reduce((sum, list) => sum + list.length, 0), 1530);
});

check('adapter remains country scoped in the integration branch', () => {
  assert.deepEqual(adapter.suggest('DE', 'мюнх', sources), ['Мюнхен']);
  assert.deepEqual(adapter.suggest('ES', 'мюнх', sources), []);
});

check('all 20 C2 offered countries have a local city list', () => {
  const offered = ['DE','GB','FR','ES','IT','AT','NL','BG','BE','CH','PT','GR','CZ','DK','SE','NO','IE','PL','RO','HU'];
  assert.equal(offered.length, 20);
  for (const code of offered) assert(Array.isArray(sources.cities[code]), 'missing city list for ' + code);
  assert.equal(offered.reduce((sum, code) => sum + sources.cities[code].length, 0), 424);
});

check('integration caps combined suggestions at 10', () => {
  assert(lab.includes('names.length>=10'));
  assert(lab.includes('localitySuggestions.suggest(code,query).forEach(add)'));
});

check('empty query preserves original C2 demo choices without expanding the full local list', () => {
  assert(lab.includes("if(!normalized)return demo.slice(0,7).map(place=>({name:place.name,place}))"));
  assert(!lab.includes("if(!code||!norm(query))return []"));
});

check('C2 demo choices are preserved as a scoped supplement', () => {
  assert(lab.includes("demo.filter(p=>norm(p.name).includes(normalized)).forEach(p=>add(p.name))"));
  assert(lab.includes("const code=kind==='root'?'BG':state.country"));
});

check('C2 country order is preserved while labels come from countries.js', () => {
  assert(lab.includes("const C2_COUNTRY_CODES=['DE','GB','FR','ES','IT','AT','NL','BG','BE','CH','PT','GR','CZ','DK','SE','NO','IE','PL','RO','HU']"));
  assert(lab.includes("const countryNames=Object.fromEntries(window.RODENI_COUNTRIES||[])"));
});


check('suggestion-only labels do not become canonical IDs', () => {
  assert(lab.includes("function chooseSuggestion(kind,name,placeId)"));
  assert(lab.includes("state[kind]=''"));
  assert(!lab.includes('state[kind]=name'));
});

check('only an existing demo identity can use confirmPlace', () => {
  assert(lab.includes("const p=placeId?find(placeId):null;if(p){confirmPlace(kind,p);return}"));
  assert(lab.includes("if(item.place)el.dataset.id=item.place.id"));
});

check('validation explicitly preserves suggestion-vs-identity boundary', () => {
  const phrase = 'Името може да е предложение от локалния списък, но това само по себе си не е потвърдена географска идентичност.';
  assert.equal(lab.split(phrase).length - 1, 2);
});

check('lab does not add network/backend dependencies', () => {
  assert(!/\bfetch\s*\(|supabase/i.test(lab));
  assert(!/geonames/i.test(lab));
});

process.stdout.write('PASS locality-integration-lab.test.cjs — ' + checks + ' checks\n');
