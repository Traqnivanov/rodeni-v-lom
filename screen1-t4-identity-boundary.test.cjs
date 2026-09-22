'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, 'prototype-screen1-map-interaction-lab.html'), 'utf8');

let checks = 0;
function check(name, fn) {
  fn();
  checks += 1;
  process.stdout.write('PASS ' + name + '\n');
}

check('state separates canonical IDs from draft labels', () => {
  assert(html.includes("blank=()=>({country:'',current:'',currentDraft:'',root:'',rootDraft:'',pending:'',view:'current'})"));
});

check('session restore keeps draft labels bounded and private', () => {
  assert(html.includes("currentDraft:typeof d.currentDraft==='string'?d.currentDraft.slice(0,100):''"));
  assert(html.includes("rootDraft:typeof d.rootDraft==='string'?d.rootDraft.slice(0,100):''"));
  assert(html.includes("if(state.current)state.currentDraft=''"));
  assert(html.includes("if(state.root){state.rootDraft='';state.pending=''}"));
});

check('field displays canonical name first, otherwise draft label', () => {
  assert(html.includes("value=find(selected)?.name||draftFor(kind)||''"));
});

check('list-only selection remains non-canonical and stores draft', () => {
  assert(html.includes("state[kind]='';setDraft(kind,name)"));
  assert(!html.includes("state[kind]=name"));
});

check('list-only selection opens human verification state', () => {
  assert(html.includes("showVerification()"));
  assert(html.includes("Провери мястото, за да сме сигурни, че е правилното."));
});

check('draft verification hides the contradictory missing-place link', () => {
  assert(html.includes("id=\"missing\" '+(draft?'hidden':'')"));
  assert(html.includes("if(missing)missing.hidden=true"));
  assert(html.includes("if(missing)missing.hidden=false"));
});

check('canonical selection clears draft and enables CTA', () => {
  assert(html.includes("state[kind]=p.id;setDraft(kind,'')"));
  assert(html.includes("if(next)next.disabled=false"));
});

check('Current CTA is disabled until canonical Current exists', () => {
  assert(html.includes('<button class="primary" id="next" '+(c?'':'disabled')+'>Продължи към „Откъде си?“</button>'));
});

check('Root CTA is disabled until canonical Root exists', () => {
  assert(html.includes('<button class="primary" id="next" '+(r?'':'disabled')+'>Виж общността за теб</button>'));
});

check('editing a canonical selection invalidates canonical ID and stores draft', () => {
  assert(html.includes("state[kind]='';if(kind==='root')state.pending='';attempt=0;resetMapInteractionState();syncDraftFromInput(kind)"));
  assert(html.includes("if(next)next.disabled=true"));
});

check('country change clears only Current canonical and Current draft', () => {
  assert(html.includes("state.country=$('country').value;state.current='';state.currentDraft='';attempt=0"));
});

check('controlled resolver success sets canonical ID and clears draft', () => {
  assert(html.includes("if(p){state[kind]=p.id;setDraft(kind,'');state.pending='';attempt=0"));
});

check('resolver failure uses human copy', () => {
  assert(html.includes("Не успяхме да потвърдим това място в демото. Провери изписването или опитай друго."));
  assert(!html.includes("Мястото не е в демонстрационния списък."));
});

check('mandatory Current has no unverified bypass', () => {
  const fallback = html.match(/function fallbackBlock\(kind\)\{[\s\S]*?\nfunction syncDraftFromInput/)?.[0] || '';
  assert(fallback.includes("kind==='root'?"));
  assert(fallback.includes('Продължи с непотвърдено място'));
});

check('Root unverified path clears Root draft and keeps canonical Root empty', () => {
  assert(html.includes("state.pending=input.value.trim().slice(0,100);state.root='';state.rootDraft=''"));
});

check('defensive CTA errors are human-readable', () => {
  assert(html.includes("Първо потвърди населеното място."));
  assert(html.includes("Първо потвърди населеното място или използвай непотвърдения вариант."));
  assert(!html.includes("потвърдена географска идентичност"));
});

check('inline JavaScript still parses', () => {
  for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) new Function(match[1]);
});

process.stdout.write('PASS screen1-t4-identity-boundary.test.cjs — ' + checks + ' checks\n');
