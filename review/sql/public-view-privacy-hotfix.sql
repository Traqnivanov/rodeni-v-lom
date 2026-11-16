-- REVIEW DRAFT ONLY. Do not apply until the coordinated Owner production gate.
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

-- Verification (read-only, run separately):
-- 1. pg_class.reloptions contains security_invoker=true.
-- 2. Supabase security advisor no longer reports security_definer_view for this view.
-- 3. As anon, select count(*) from public.public_registrations returns 0.
-- 4. As authenticated user A, only A's own row and explicitly accepted rows permitted
--    by registrations RLS are visible; user B's unrelated row is absent.
-- 5. Legacy index/account behavior is reviewed; no replacement public directory is
--    released. Any new public value must be a thresholded stable snapshot (§§84/88).

-- Rollback requires a separate Owner decision because it would reopen public row
-- access. Do not automatically revert this safety fix just to restore the old UI.
