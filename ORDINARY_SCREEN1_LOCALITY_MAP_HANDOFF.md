# Ordinary Screen 1 locality/map work — handoff to WORK CONTROLLER

## Review role

This is ordinary-executor work for independent WORK CONTROLLER review.

No item below is final approval. No merge, PR, deploy, production, main, Supabase or Screen 2 change is requested or implied.

Official WORK base used for this work:
- branch: `review/work-screen1-approved-direction`
- base commit: `a809b3bf6bfcc8991304a806894a04f9e75d4c0f`
- official C2 blob preserved throughout: `750eafb4275b8e551325bf372bf70a028ac5c3ab`

## Ordered checkpoints

### 1. Locality suggestions adapter

Branch: `review/ordinary-locality-adapter`  
HEAD: `4d4b33ca40539f5f77285623e06131129d6542db`

Purpose:
- isolated adapter over existing `countries.js` + `cities.js`;
- country-scoped suggestions;
- case/space normalization;
- original spelling;
- max 10;
- no mutation/network/dependency/canonical-ID invention.

Evidence:
- adapter source;
- built-in Node test;
- review report.

Boundary:
- suggestion label is not canonical identity, verified coordinate, confirmed selection or aggregate eligibility.

### 2. Locality integration laboratory

Branch: `review/ordinary-locality-integration-lab`  
HEAD: `c5d43d2bbdc19f4a2747db5a9d09e2a80ed1b988`

Purpose:
- separate C2-derived lab copy;
- loads `countries.js`, `cities.js`, adapter;
- preserves C2 offered-country set/order;
- combines local name suggestions with existing demo identities.

Critical behavior:
- suggestion-only locality fills the label but does not create canonical state;
- only an existing mapped C2 demo identity can use the existing confirmation path;
- official C2 remains untouched.

### 3. Map interaction laboratory

Branch: `review/ordinary-map-interaction-lab`  
HEAD: `db39669a2a0815589b594a5fe8f1ddcbde092142`

Purpose:
- add bounded manual map interaction to the isolated lab;
- preserve restored geometry and locality boundary.

Implementation:
- native interaction layer, no D3/topojson runtime dependency added;
- scale bounded 1–6;
- bounded pan;
- SVG geometry transform;
- HTML labels/pins follow the same transform while keeping fixed CSS text size;
- single-touch vertical page-scroll intent preserved; two-touch used for map pinch.

Evidence:
- 177 country paths preserved;
- source checks;
- built-in Node test;
- isolated Chromium interaction harness previously recorded in the review report.

Not claimed:
- full-candidate real-phone gesture PASS;
- final visual PASS;
- screen-reader PASS.

### 4. Geography / viewport matrix

Branch: `review/ordinary-screen1-matrix-lab`  
HEAD: `ad87d4cc0b1a5fccfec2b5de79132984933c9911`

Matrix:
- Spain–Lom;
- Germany–Lom;
- UK–Lom;
- Italy–Lom;
- nearby Bulgaria pair;
- same-place pair;
- long labels;
- widths 360 / 390 / 412;
- normal and external-style 200% root text.

Evidence:
- source/camera verification;
- built-in Node matrix test;
- isolated Chromium label/camera matrix recorded as 42/42 states in the review report.

Boundary:
- this is not a full-candidate visual PASS.

### 5. Registration-boundary copy alignment

Branch: `review/ordinary-registration-boundary-copy`  
HEAD before this handoff document: `e5be78ad57848227133dc68e5db31b090dae72f7`

Owner-approved scope:
- copy/continuity alignment only;
- no new product flow.

Change:
- **„Следва кратка регистрация“**
- explains that selected places stay private and are reviewed after email confirmation before becoming profile context;
- explicitly says the Screen 1 prototype stops before registration.

Preserved:
- `Виж какво има за теб`;
- `Продължи без публичен резултат`;
- return-only boundary action;
- no registration button/form/route;
- no auth/backend/Screen 2.

Verification:
- 8/8 source checks PASS;
- inline JS parses;
- diff from matrix checkpoint changes only the lab prototype plus test/report before this handoff file;
- prototype content change is one replaced generated source line containing the boundary state.

## Recommended WORK review order

Review in the same order as the checkpoints:

1. adapter contract and tests;
2. suggestion-vs-canonical integration boundary;
3. map interaction implementation/performance choice;
4. geography/viewport evidence and remaining real-device gaps;
5. boundary copy alignment.

Do not review the latest branch as one indivisible feature. Each checkpoint was intentionally separated so WORK can accept/reject/correct one layer without conflating it with later work.

## Known unresolved / not verified

Still requires WORK/Owner or real-device evidence as applicable:
- full candidate browser visual review;
- real phone soft keyboard/IME;
- real phone one-touch vs pinch gesture behavior;
- real screen reader;
- arbitrary manual pan/zoom label overlap beyond the fixed regression matrix;
- complete §99 real-device matrix;
- Owner final Screen 1 comprehension/visual approval.

## No requested rule adaptation

No product-rule adaptation was required during these tasks.

Where implementation choices were made inside already approved behavior (for example native bounded interaction instead of adding D3), they remain implementation candidates for WORK review, not new product rules.
