'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = __dirname;
const html = fs.readFileSync(path.join(root, 'prototype-screen1-map-interaction-lab.html'), 'utf8');
const review = fs.readFileSync(path.join(root, 'prototype-screen1-mobile-visual-review.html'), 'utf8');
const citiesSource = fs.readFileSync(path.join(root, 'cities.js'), 'utf8');
const countriesSource = fs.readFileSync(path.join(root, 'countries.js'), 'utf8');
const adapter = require(path.join(root, 'locality-suggestions-adapter.js'));

function load(source, key) {
  const context = vm.createContext({ window: {} });
  vm.runInContext(source, context);
  return context.window[key];
}
const cities = load(citiesSource, 'RODENI_CITIES');
const countries = load(countriesSource, 'RODENI_COUNTRIES');

let checks = 0;
function check(name, fn) {
  fn();
  checks += 1;
  process.stdout.write('PASS ' + name + '\n');
}

check('candidate has no per-keypress network APIs', () => {
  assert(!/\bfetch\s*\(/.test(html));
  assert(!/XMLHttpRequest/.test(html));
  assert(!/WebSocket/.test(html));
  assert(!/EventSource/.test(html));
  assert(!/sendBeacon/.test(html));
});

check('candidate loads only local data/helper scripts', () => {
  const srcs = [...html.matchAll(/<script\s+src="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(srcs, ['countries.js','cities.js','locality-suggestions-adapter.js']);
});

check('no D3/topojson/Supabase runtime dependency is added', () => {
  assert(!/d3(\.min)?\.js/i.test(html));
  assert(!/topojson/i.test(html));
  assert(!/supabase/i.test(html));
});

check('expanded locality source is local and bounded', () => {
  assert.equal(countries.length, 62);
  assert.equal(Object.keys(cities).length, 60);
  assert.equal(Object.values(cities).reduce((n, list) => n + list.length, 0), 1530);
  assert.equal(Math.max(...Object.values(cities).map((list) => list.length)), 180);
});

check('adapter caps results at 10', () => {
  const result = adapter.suggest('US', 'а', { countries, cities });
  assert.equal(result.length, 10);
});

check('active visibleChoices also caps merged results at 10', () => {
  assert(html.includes("if(!key||seen.has(key)||names.length>=10)return"));
});

check('paintSuggestions replaces only the bounded result DOM', () => {
  assert(html.includes("box.replaceChildren(...list.map("));
  assert(!html.includes("window.RODENI_CITIES.BG.map("));
  assert(!html.includes("Object.values(window.RODENI_CITIES).flat"));
});

check('empty query renders only demo choices, not full Layer-A', () => {
  assert(html.includes("if(!normalized)return demo.slice(0,7).map(place=>({name:place.name,place}))"));
});

check('country switch clears stale Current identity and draft synchronously', () => {
  assert(html.includes("state.country=$('country').value;state.current='';state.currentDraft='';attempt=0;resetMapInteractionState();save();render()"));
});

check('single-touch vertical page scroll intent is preserved', () => {
  assert(html.includes('touch-action:pan-y'));
  assert(html.includes("if(event.pointerType==='touch')"));
  assert(html.includes("if(touchPoints.size===2){event.preventDefault()"));
});

check('single-touch branch returns without preventDefault', () => {
  const block = html.slice(
    html.indexOf("box.addEventListener('pointermove'"),
    html.indexOf("const endPointer=", html.indexOf("box.addEventListener('pointermove'"))
  );
  const touchBranch = block.slice(block.indexOf("if(event.pointerType==='touch')"), block.indexOf("if(!mouseDrag"));
  assert(touchBranch.includes("if(touchPoints.size===2){event.preventDefault()"));
  assert(!touchBranch.includes("touchPoints.size===1){event.preventDefault()"));
});

check('coarse-pointer wheel/double-click zoom is not captured', () => {
  const count = (html.match(/if\(matchMedia\('\(pointer:coarse\)'\)\.matches\)return;/g) || []).length;
  assert(count >= 2);
});

check('zoom remains bounded to 1 through 6', () => {
  assert(html.includes('clamp(nextScale,1,6)'));
  assert(html.includes('clamp(pinchStart.scale*(distance/pinchStart.distance),1,6)'));
});

check('map pan remains bounded', () => {
  assert(html.includes('mapInteraction.panX=clamp(mapInteraction.panX,-maxX,maxX)'));
  assert(html.includes('mapInteraction.panY=clamp(mapInteraction.panY,-maxY,maxY)'));
});

check('geometry transform does not rebuild all country paths during pan/zoom', () => {
  assert(html.includes("geometry.setAttribute('transform','matrix('"));
  assert(!html.includes('geometry.innerHTML='));
});

check('review harness includes browser timing probe', () => {
  assert(review.includes('value="t7perf"'));
  assert(review.includes('searchAvg='));
  assert(review.includes('searchMax='));
  assert(review.includes('opts='));
  assert(review.includes('switch='));
});

check('timing probe reacquires country select after each render', () => {
  assert((review.match(/country=doc\.getElementById\('country'\)/g) || []).length >= 3);
});

check('timing probe measures 10 synchronous input searches', () => {
  assert(review.includes("for(const q of ['а','ан','сан','о','е','и','ар','ла','ч','ф'])"));
});

check('review harness diagnostics expose final state after timing probe', () => {
  assert(review.includes("country='+(stored.country||'∅')"));
  assert(review.includes("current='+(stored.current||'∅')"));
  assert(review.includes("currentDraft='+(stored.currentDraft||'∅')"));
});

check('candidate inline JavaScript parses', () => {
  for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new Function(match[1]);
});

check('review inline JavaScript parses', () => {
  for (const match of review.matchAll(/<script>([\s\S]*?)<\/script>/g)) new Function(match[1]);
});

process.stdout.write('PASS screen1-t7-interaction-performance.test.cjs — ' + checks + ' checks\n');
