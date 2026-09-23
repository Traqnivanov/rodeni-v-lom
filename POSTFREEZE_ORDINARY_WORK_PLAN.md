# Post-freeze ordinary work plan

Base frozen Screen 1:
- branch: review/ordinary-screen1-frozen-for-work
- SHA: 1c1551dc47faa249132394f019491373bc876f22
- active candidate blob: a3334bfabd9d99d156a766ca094f2bd1cbf1822c

This branch is a separate work line created after the frozen package.
It must not modify the frozen branch.

## Rule before every task

Before analysis/proposal:
1. read START_HERE.md;
2. read PROJECT_STATE.md;
3. read PRODUCT_FUNCTION_DEPENDENCY_MAP.md;
4. read only the relevant approved Master sections;
5. classify each finding as:
   - already canonical;
   - implementation detail;
   - open decision;
   - stale/conflicting documentation.

If real work reveals a better solution:
- document it;
- explain why;
- do not silently change an approved product rule;
- leave substantive product decisions for Owner/WORK review.

## Task 1 — C1/C2 checkpoint reconciliation report

Human goal:
Make it impossible for WORK to confuse the older C1 checkpoint with the later C2 controller candidate.

Allowed:
- inspect documents/files/history;
- produce a reconciliation report;
- identify stale source-of-truth text.

Not allowed:
- rewrite START_HERE/PROJECT_STATE/WORK handoff while WORK is unavailable;
- change product code.

## Task 2 — static accessibility audit

Human goal:
Check whether the frozen Screen 1 is understandable and operable through labels, focus, keyboard semantics and assistive-technology markup.

Check:
- duplicate IDs;
- labels for inputs;
- buttons and accessible names;
- focusable controls;
- aria-live/alerts;
- hidden vs visible state;
- suggestion semantics;
- dialog/sheet semantics where applicable;
- focus traps or missing escape paths.

Output:
- PASS / issue list;
- no product change unless a concrete bug is later isolated.

## Task 3 — data consistency audit

Human goal:
Check that the existing countries, 1530 locality suggestions, map geometry and demo canonical places do not contradict each other.

Check:
- country-code uniqueness;
- city-list country keys vs countries.js;
- geometry coverage;
- no-geometry cases;
- duplicate names inside a country;
- exact demo fixture collisions;
- country/locality mismatches;
- Bulgaria/demo exceptions;
- no invented canonical identity.

## Task 4 — review-state coverage audit

Human goal:
Check that every required Screen 1 state can be opened and reviewed without changing the frozen product candidate.

Check:
- initial;
- Current;
- Root;
- loading;
- exact;
- safe-broader;
- suppressed;
- Current-only;
- error;
- retry;
- post-error continue;
- recovery;
- missing local list;
- no map geometry;
- 200% text.

Allowed:
- QA-only harness changes if needed.
Not allowed:
- frozen candidate changes.

## Task 5 — final WORK review package

Human goal:
Give WORK several finished pieces of work, not one vague handoff.

Package:
- exact frozen SHA;
- Task 1 report;
- Task 2 report;
- Task 3 report;
- Task 4 report;
- known not-verified items;
- any isolated follow-up proposals;
- clear separation between canonical rules and ordinary implementation details.

No merge/promotion/main/Supabase/Screen 2.
