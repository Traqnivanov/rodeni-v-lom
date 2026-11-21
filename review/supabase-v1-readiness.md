# WORK audit — Supabase V1 readiness after restore

**Дата:** 16.11.2026  
**Проект:** `rodeni-v-lom` / `mqilvavuzbsscsfhtuub`  
**Обхват:** read-only catalog, migrations, policies and Supabase security/health advisors; последваща ограничена защитна миграция по изрично Owner одобрение.  
**Решение:** Owner разреши restore и точния hotfix; project е `ACTIVE_HEALTHY`. Няма approval за останалите V1 миграции или live UI release.

## Проверено състояние

- `public.registrations`, `public.connections`, `public.messages` имат RLS. Първият compact `list_tables` изведе приблизителни/остарели 0 реда; точен `count(*)` показа **2 registrations, 1 connection, 0 messages**, както и **3 Auth users, 0 Storage objects** към read-only проверката. Не са извеждани лични записи. В базата има 26 legacy migrations.
- `registrations_age_check` допуска `age IS NULL OR 14..120`. Това не налага одобреното 18+ правило. `age_consent = true` само по себе си не удостоверява 18+.
- Преди hotfix `public.public_registrations` беше view без `security_invoker`, с `SELECT` за `anon` и `authenticated`. Дефиницията включва `age`, `school`, `city_abroad`, `photo_url`, `profession`, `travel_status`, `open_to_strangers`, `willing_to_help` и други лични атрибути. Security advisor отчита `security_definer_view` с ниво ERROR: https://supabase.com/docs/guides/database/database-linter?lint=0010_security_definer_view . Точен read-only count показа **2 реда във view-а** и `anon_can_select = true`. Owner одобри и приложихме миграция `20261116190151` / `public_registrations_security_invoker_hotfix`: `security_invoker=true`. Security advisor ERROR изчезна. Grant към `anon` остава, но базовата `registrations` няма anon SELECT RLS policy; очакването е анонимният клиент да не вижда редове. Реален anon клиентски тест остава OPEN. Старият публичен списък/тикер вече не трябва да се приема за работещ; нужна е координирана privacy-safe UI замяна.
- `connections` INSERT RLS налага ownership на sender и липса на block, но не налага recipient inbound ON, 18+ за двамата, decline pause, unordered pair uniqueness, 5 outbound/24h и силна explainable причина. Unique constraint е само по подредената двойка `(from_registration_id,to_registration_id)`. Наличният status смесва `blocked` с connection state.
- `messages` има RLS за accepted connection, но при реализацията трябва да се тества дали block след accept прекъсва четене и изпращане. От catalog дефиницията се вижда само `status = 'accepted'`, без отделна block проверка.
- Security advisor има WARN за три `public` SECURITY DEFINER функции, callable от `authenticated`, и WARN за изключена leaked-password protection: https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable ; https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection . Health advisor не върна findings.


## Сверка с текущия live frontend (read-only, `main`)

| Място | Реално поведение | V1 зависимост |
|---|---|---|
| `index.html:264–276` | Recent-activity ticker чете `public_registrations` с име и град. | Публичният pre-registration поток не трябва да издава конкретни хора; премахване/замяна при privacy closure. |
| `index.html:668–670` | `select('*')` тегли всички редове от public view и ги групира в браузъра. | Privacy-safe aggregate трябва да се изчислява и ограничава server-side; не се пращат сурови редове към anonymous client. |
| `index.html:507–539` | `willing_to_help` оформя публичен таб с конкретни хора. | §69 е доброволен Guidance signal, не публичен каталог или paid service. |
| `account.html:282` | Възрастта е незадължителна и `min="14"`. | 18+ gate и минималният onboarding са нов договор; HTML validation сама не стига. |
| `account.html:558–578` | Две насрещни pending заявки се приемат автоматично при зареждане на страницата. | §71 изисква получателят да реши изрично; и двете посоки се свеждат до една unordered pair identity. |
| `account.html:589, 634+` | Входящи/препоръчани хора се четат от public row view. | Замяната на view изисква едновременно нови разрешени recipient/relationship reads, иначе UI се чупи. |
| `account.html:762` | Browser client прави пряк `connections.insert`. | Всички V1 gates трябва да са атомарни server-side; UI само инициира explicit request. |
| `account.html:1029` | Входът използва `signInWithOtp` magic-link. | Одобреният registration contract трябва да се внедри отделно; не се включва старият flow като готов. |

**Извод за реда:** новите сървърни read/action boundaries и новият frontend се разработват и тестват заедно в изолирана среда. Public row view не се изключва самостоятелно върху сегашния live `index.html`, но не се пуска и регистрация на реални хора през стария път. Promotion е едно координирано, обратимо решение след Owner преглед.

## Предложен ред за implementation, без приложение сега

1. **Запази evidence/rollback:** експортирай schema и policy definitions; вече са потвърдени 3 Auth users, 2 registrations, 1 connection и 0 Storage objects. Провери реалната употреба на view/RPC и live traffic, без да извличаш лични данни в review артефакти.
2. **Продължи privacy closure:** security-invoker hotfix е приложен; замени стария public row flow с изрично privacy-safe aggregate boundary по §§84/88/115–122 и премахни anonymous row access. Прегледай SECURITY DEFINER helpers и grants за leak/recursion; не revoke-вай функция, използвана от RLS, без tests. Тествай с `anon`, различни authenticated users и service role поотделно.
3. **18+ и minimum onboarding:** въведи server-enforced 18+ eligibility и canonical confirmed Root/Current, pending boundary и idempotent save по §§68/85/123. Изключи старите 14+ и raw `travel_status` пътеки само след миграция и regression.
4. **Connection safety като една атомарна операция:** unordered pair identity; отделен block state; recipient inbound permission; 90-дневен decline cooldown с нова причина; 5 outbound/24h; account/18+/relationship gates; recheck at display and send. Пряко INSERT към legacy `connections` не бива да заобикаля операцията.
5. **Guidance и Travel:** versioned private need state/expiry, canonical locality, structured route/date, scoped re-evaluation и idempotent retry според §§73/125–126. Ако expiry/recovery не може да се гарантира, 30-дневният активен flow се връща за Owner решение, а не се пуска частично.
6. **Гейт за реални потребители:** отрицателни RLS тестове (cross-user, anon, OFF, blocked, declined, under-18, daily limit, duplicate/reverse pair, expired need), positive accepted chat, accessibility/mobile QA и повторен security advisor. Едва след доказателства WORK предлага отделно production approval.

## Review prototype boundary

`prototype-for-you-need-review.html` симулира UI клоновете без auth, база или реален match. Неговите demo имена и причини не доказват Supabase eligibility. JS syntax мина локално; визуален 360/390/412 PASS не е даден, понеже локалният браузър отказа file URL. Следва преглед през разрешен review адрес/среда.
