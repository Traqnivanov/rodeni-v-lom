# WORK audit — Supabase V1 readiness after restore

**Дата:** 16.11.2026  
**Проект:** `rodeni-v-lom` / `mqilvavuzbsscsfhtuub`  
**Обхват:** read-only catalog, migrations, policies and Supabase security/health advisors. No schema/data/auth changes.  
**Решение:** Owner разреши restore; project reached `ACTIVE_HEALTHY`. Това не е approval за migration или live release.

## Проверено състояние

- `public.registrations`, `public.connections`, `public.messages` имат RLS и по 0 реда към проверката. В базата има 26 legacy migrations. Нулеви редове не означава, че няма Auth users, Storage обекти или live traffic; те не са проверени с тази проверка.
- `registrations_age_check` допуска `age IS NULL OR 14..120`. Това не налага одобреното 18+ правило. `age_consent = true` само по себе си не удостоверява 18+.
- `public.public_registrations` е view без `security_invoker`, с `SELECT` за `anon` и `authenticated`. Дефиницията включва `age`, `school`, `city_abroad`, `photo_url`, `profession`, `travel_status`, `open_to_strangers`, `willing_to_help` и други лични атрибути. Security advisor отчита `security_definer_view` с ниво ERROR: https://supabase.com/docs/guides/database/database-linter?lint=0010_security_definer_view . Сега таблицата е празна; преди реални записи този public surface трябва да бъде затворен/заменен според новата privacy-safe aggregate логика.
- `connections` INSERT RLS налага ownership на sender и липса на block, но не налага recipient inbound ON, 18+ за двамата, decline pause, unordered pair uniqueness, 5 outbound/24h и силна explainable причина. Unique constraint е само по подредената двойка `(from_registration_id,to_registration_id)`. Наличният status смесва `blocked` с connection state.
- `messages` има RLS за accepted connection, но при реализацията трябва да се тества дали block след accept прекъсва четене и изпращане. От catalog дефиницията се вижда само `status = 'accepted'`, без отделна block проверка.
- Security advisor има WARN за три `public` SECURITY DEFINER функции, callable от `authenticated`, и WARN за изключена leaked-password protection: https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable ; https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection . Health advisor не върна findings.

## Предложен ред за implementation, без приложение сега

1. **Запази evidence/rollback:** експортирай schema и policy definitions; свери реалната production употреба на view/RPC, Auth и Storage. Не считай нулеви public редове за пълна празна среда.
2. **Първо privacy closure:** замени public row view с изрично privacy-safe aggregate boundary по §§84/88/115–122 и премахни anonymous row access. Прегледай SECURITY DEFINER helpers и grants за leak/recursion; не revoke-вай функция, използвана от RLS, без tests. Тествай с `anon`, различни authenticated users и service role поотделно.
3. **18+ и minimum onboarding:** въведи server-enforced 18+ eligibility и canonical confirmed Root/Current, pending boundary и idempotent save по §§68/85/123. Изключи старите 14+ и raw `travel_status` пътеки само след миграция и regression.
4. **Connection safety като една атомарна операция:** unordered pair identity; отделен block state; recipient inbound permission; 90-дневен decline cooldown с нова причина; 5 outbound/24h; account/18+/relationship gates; recheck at display and send. Пряко INSERT към legacy `connections` не бива да заобикаля операцията.
5. **Guidance и Travel:** versioned private need state/expiry, canonical locality, structured route/date, scoped re-evaluation и idempotent retry според §§73/125–126. Ако expiry/recovery не може да се гарантира, 30-дневният активен flow се връща за Owner решение, а не се пуска частично.
6. **Гейт за реални потребители:** отрицателни RLS тестове (cross-user, anon, OFF, blocked, declined, under-18, daily limit, duplicate/reverse pair, expired need), positive accepted chat, accessibility/mobile QA и повторен security advisor. Едва след доказателства WORK предлага отделно production approval.

## Review prototype boundary

`prototype-for-you-need-review.html` симулира UI клоновете без auth, база или реален match. Неговите demo имена и причини не доказват Supabase eligibility. JS syntax мина локално; визуален 360/390/412 PASS не е даден, понеже локалният браузър отказа file URL. Следва преглед през разрешен review адрес/среда.
