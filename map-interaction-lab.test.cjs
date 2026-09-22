'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const mapPath = path.join(root, 'prototype-screen1-map-interaction-lab.html');
const localityPath = path.join(root, 'prototype-screen1-locality-integration-lab.html');
const officialPath = path.join(root, 'prototype-screen1-work-c2.html');

const html = fs.readFileSync(mapPath, 'utf8');
const locality = fs.readFileSync(localityPath, 'utf8');
const official = fs.readFileSync(officialPath, 'utf8');

function gitBlobSha(text) {
  const body = Buffer.from(text, 'utf8');
  return crypto.createHash('sha1')
    .update(Buffer.from('blob ' + body.length + '\0'))
    .update(body)
    .digest('hex');
}

let checks = 0;
function check(name, fn) {
  fn();
  checks += 1;
  process.stdout.write('PASS ' + name + '\n');
}

check('official WORK C2 remains untouched', () => {
  assert.equal(gitBlobSha(official), '750eafb4275b8e551325bf372bf70a028ac5c3ab');
});

check('locality integration checkpoint remains untouched', () => {
  assert.equal(gitBlobSha(locality), 'bcbdc81ecbc519ea44c3873ee3f9cdfbbceeb48f');
});

check('all inline JavaScript parses', () => {
  for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
    new Function(match[1]);
  }
});

check('all 177 restored country paths remain present', () => {
  assert.equal((html.match(/<path data-country=/g) || []).length, 177);
});

check('country paths are wrapped in one transformable geometry group', () => {
  assert(html.includes('<g id="mapGeometry">'));
  assert(html.includes('</g></svg><div class="markers"'));
});

check('no D3/topojson/backend dependency is added', () => {
  assert(!html.includes('d3.min.js'));
  assert(!/topojson/i.test(html));
  assert(!/\bfetch\s*\(|supabase/i.test(html));
});

check('zoom scale is bounded to 1..6', () => {
  assert(html.includes('clamp(nextScale,1,6)'));
  assert(html.includes('clamp(pinchStart.scale*(distance/pinchStart.distance),1,6)'));
});

check('translation is bounded to scaled viewport', () => {
  assert(html.includes('const maxX=(mapInteraction.scale-1)*box.clientWidth/2,maxY=(mapInteraction.scale-1)*box.clientHeight/2'));
  assert(html.includes('mapInteraction.panX=clamp(mapInteraction.panX,-maxX,maxX)'));
  assert(html.includes('mapInteraction.panY=clamp(mapInteraction.panY,-maxY,maxY)'));
});

check('geometry transform is applied without rebuilding country paths', () => {
  assert(html.includes("geometry.setAttribute('transform','matrix('"));
  assert(!html.includes("geometry.innerHTML="));
});

check('fixed-size HTML markers follow the same transform', () => {
  assert(html.includes('const project=p=>transformedPoint('));
  assert(html.includes('const anchor=publicPos?transformedPoint('));
});

check('single-touch vertical page scroll is preserved', () => {
  assert(html.includes('touch-action:pan-y'));
  assert(html.includes("if(event.pointerType==='touch')"));
  assert(html.includes('if(touchPoints.size===2){event.preventDefault()'));
});

check('coarse-pointer wheel is not captured', () => {
  assert(html.includes("if(matchMedia('(pointer:coarse)').matches)return;"));
});

check('mouse drag uses pointer capture and bounded pan', () => {
  assert(html.includes("box.setPointerCapture?.(event.pointerId)"));
  assert(html.includes("mapInteraction.panX=mouseDrag.panX+(event.clientX-mouseDrag.startX)"));
  assert(html.includes("clampMapPan();drawMap()"));
});

check('context changes reset manual map interaction', () => {
  assert(html.includes("function change(view){cancel();attempt=0;resetMapInteractionState()"));
  assert(html.includes("resetMapInteractionState();input.value=p.name"));
  assert(html.includes("state.pending=input.value.trim().slice(0,100);state.root='';resetMapInteractionState()"));
});

process.stdout.write('PASS map-interaction-lab.test.cjs — ' + checks + ' checks\n');
