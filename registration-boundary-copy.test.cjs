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

check('boundary names the next step as short registration', () => {
  assert(html.includes('Следва кратка регистрация'));
  assert(!html.includes('Следва създаване на профил'));
});

check('boundary explains private continuity through email confirmation', () => {
  assert(html.includes('Избраните места ще се запазят частно.'));
  assert(html.includes('След като потвърдиш имейла си, ще ги прегледаш и можеш да ги промениш, преди да станат част от профила ти.'));
});

check('prototype boundary is explicit', () => {
  assert(html.includes('Този Screen 1 прототип спира пред регистрацията.'));
});

check('existing return action remains the only boundary action', () => {
  const start = html.indexOf("else if(state.view==='boundary')");
  const end = html.indexOf("else{const result=", start);
  assert(start >= 0 && end > start);
  const boundary = html.slice(start, end);
  assert(boundary.includes('id="return"'));
  assert(!boundary.includes('id="register"'));
  assert(!boundary.includes('id="signup"'));
  assert(!boundary.includes('href='));
  assert(!boundary.includes('Създай профил'));
});

check('result CTA follows the approved value/suppressed contract', () => {
  assert(html.includes("primaryLabel=result.type==='suppressed'?'Запази и продължи':'Виж какво има за теб'"));
  assert(html.includes('<button class="primary" id="continue">'+primaryLabel+'</button>'));
});

check('municipality broadening replaces the old hardcoded Lom group', () => {
  assert(html.includes('const rootCommunity='));
  assert(html.includes('const communityBroader='));
  assert(!html.includes('const lomGroup='));
  assert(!html.includes('от Лом и региона'));
});

check('result exposes Current Root and Community as separate context levels', () => {
  assert(html.includes('<span>Сега</span>'));
  assert(html.includes('<span>Корен</span>'));
  assert(html.includes('<span>Общност</span>'));
});

check('Sofia community naming remains outside the generic prototype mapping', () => {
  assert(!html.includes("'BG|София':{id:"));
  assert(html.includes('Owner hard constraint: separate research + proposal before Sofia naming/display.'));
});

check('error continuation remains secondary and unchanged', () => {
  assert(html.includes('<button class="secondary" id="skip">Продължи без публичен резултат</button>'));
});

check('no auth, Screen 2 or backend implementation is introduced', () => {
  assert(!/signUp\s*\(|auth\.sign|screen-?2|prototype-screen2|supabase/i.test(html));
  assert(!/\bfetch\s*\(/.test(html));
});

check('inline JavaScript still parses', () => {
  for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
    new Function(match[1]);
  }
});

process.stdout.write('PASS registration-boundary-copy.test.cjs — ' + checks + ' checks\n');
