-- APPLIED 16.11.2026 after explicit Owner approval; migration 20261116190151.
-- Actual migration query: alter view public.public_registrations set (security_invoker = true);
-- This review file records the intended effect and verification, not an instruction to rerun.
-- Target: Supabase project mqilvavuzbsscsfhtuub, PostgreSQL 17.
-- Purpose: make the existing public_registrations view obey the caller's table grants/RLS.
-- It does not provide a replacement aggregate API or make V1 ready for registration.
-- Expected immediate UI impact: anonymous legacy index.html person/ticker queries return
-- no rows; old account.html public-view lookups can also change under authenticated RLS.

begin;

-- The view currently has anon SELECT and is owned by postgres. Default view behavior
-- executes with owner permissions. With security_invoker, anon sees no registrations
-- because no anon SELECT RLS policy exists on public.registrations.
alter view public.public_registrations set (security_invoker = true);

commit;

-- Verification after apply (read-only; completed metadata/advisor checks, client-role checks remain):
-- 1. PASS: pg_class.reloptions contains security_invoker=true.
-- 2. PASS: Supabase security advisor no longer reports security_definer_view.
-- 3. OPEN: test a real anon client read; metadata shows no anon SELECT RLS policy.
-- 4. As authenticated user A, only A's own row and explicitly accepted rows permitted
--    by registrations RLS are visible; user B's unrelated row is absent.
-- 5. Legacy index/account behavior is reviewed; no replacement public directory is
--    released. Any new public value must be a thresholded stable snapshot (§§84/88).

-- Rollback requires a separate Owner decision because it would reopen public row
-- access. Do not automatically revert this safety fix just to restore the old UI.
