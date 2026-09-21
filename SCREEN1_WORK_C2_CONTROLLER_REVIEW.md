# C2 controller review — 2026-09-21

Status: candidate for Owner phone review; NOT final approval or production promotion.

Base: ordinary branch review/ordinary-screen1-c2-mobile HEAD 192f413b2ae64d9d0b9d9134d636fcf95f8c3cd9, HTML blob 146bf85bfb630cb19d58b3f9f7a3bb77e0c0d759.
Clean adoption onto review/work-screen1-approved-direction, without merging ordinary iteration history. C1 and canonical §100 contract remain unchanged.

## Independent finding and correction
External root text enlargement to 200%, without the demo text-zoom class, caused horizontal overflow and a clipped Root label. The ordinary evidence did not establish this condition.
- Grid children can now shrink to viewport width; panel content wraps and controls respect available width.
- Entry map height is calc(130px + 2.5rem), pair height calc(180px + 3.75rem). Normal sizes remain 170/240px; at 200% they become 210/300px independently of the demo class. ResizeObserver recomputes markers when these heights change.
- No aggregation, geography, privacy, session recovery or flow logic changed from C2.

## Validation
25 functional groups PASS in the actual supplied Node/jsdom runner after correction. This is DOM simulation, not real phone testing.
Browser: Chrome, supervised preview, one same-origin iframe, no image scaling. Normal result visually inspected at 360/390/412px. Independent 200% root font at 360px: map labels fully visible, result wraps, controls reachable by scrolling, no horizontal scrollbar. Captured separate map/result/actions evidence rather than claiming all content fits one screen at 200%.
Ordinary's 23 browser checks are a reported upstream result, not relabelled as our independent checks. Earlier ordinary three-wide screenshots clip relevant content and are not sufficient release evidence alone.

## Assessment
Mobile readability is improved over C1; the broader result clearly says 5+ in Amsterdam from Lom and the region, with no separate Lom count. Inline suggestions, compact entry map and control-only focus outline are retained.
No observed privacy or approved-flow regression. No new product decision is introduced by the two controller CSS corrections. The locality fallback remains demo-only, not a canonical backend resolver.
3-second comprehension is a design judgement pending Owner/user observation; automated passes cannot establish it.
Remaining: real mobile soft keyboard/IME, real screen reader, final Owner phone visual/comprehension approval, and remaining §99 real-device matrix. No claim of full §99 release PASS.

## Boundary and next step
Preview only. Main, product production, Supabase and Screen 2 untouched. Same private review URL receives corrected C2. Owner should check selection with phone keyboard, then the result and larger phone text. Only after those checks may final Screen 1 approval be considered.
