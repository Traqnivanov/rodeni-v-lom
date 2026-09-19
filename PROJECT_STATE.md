# PROJECT STATE — „Родени в Лом“

**Актуализирано:** 19.09.2026  
**Branch:** `main`  
**Роля на този файл:** кратък текущ handoff. Не е пълна история и не заменя Master-а.  
**Единствен входен файл:** `START_HERE.md`.

## 1. Как започва следващ чат

Първо прочети `START_HERE.md`. Този файл е вторият и пази само текущото състояние.

След това продължи от **NEXT EXACT STEP**. Не започвай нов общ одит без конкретна причина.

## 2. Текущ етап

Проектът има достатъчна основа за следващия етап. **Не се започва от нулата.**

Запазват се:
- public world map / country discovery;
- Supabase проектът и текущият lightweight stack HTML/CSS/JS + Supabase;
- registrations baseline;
- photo upload;
- settlement / city / school / profession signals;
- willing_to_help / open_to_strangers / travel_status;
- connections / blocking;
- accepted private chat;
- privacy основата.

Следващото развитие е orchestration върху тази база:
**Context Engine + Opportunity model + progressive onboarding + Admin/Owner Operations.**

## 3. Текущи важни решения

- Structured Travel V1: „Следващо прибиране в Лом“ = start/end date + optional settlement, максимум един active plan, exact dates само в 18+ community контекст, automatic expiry, без тежък travel planner.

- Performance/quality invariant: пазим сайта лек, но не жертваме видимо качество. Ако осезаемо по-добър вариант е умерено по-тежък, tradeoff-ът се докладва предварително и Admin/Owner решава на място.

- Connection pair integrity: максимум една active relationship за unordered pair A+B. Block е отделен safety механизъм; само blocker може да unblock. Atomic backend/RPC enforcement е задължително при implementation.

- `open_to_strangers` = разрешение за нов входящ contact. OFF спира нови входящи connection requests, но не прекратява accepted/pending state и не пречи user сам да изпрати заявка.

- V1 safety policy: регистрация/matching/contact/chat = **18+**. Текущото техническо `age >= 14` е старо поведение и трябва да се промени при implementation.

- Собственикът е **Admin/Owner — най-високата роля**.
- Moderator е бъдеща по-ниска оперативна роля.
- Admin/Owner има отделен защитен staff вход; URL или скрит бутон не са security.
- Staff role е DB-backed security identity и трябва да се налага и в backend/RLS/RPC.
- Формите следват общ BG UX стандарт: labels, hints, inline validation, loading, success/error state, next step, duplicate-submit protection, accessibility и backend enforcement.
- От Popitai.Lom се пренасят доказани security/form patterns, но не се копира продуктът 1:1.
- Сегашният magic-link auth на Rodeni не е автоматично заменен с password auth; финалният ordinary-user auth избор остава отворен.
- Законността и нормативното съответствие са hard constraint, не продуктова опция.
- За minors/safety първо се прилага задължителната правна рамка; само допълнителните ограничения над законовия минимум са продуктово/safety решение.

## 4. Текущ Supabase checkpoint

Проект: `mqilvavuzbsscsfhtuub`.

Последно проверено:
- `registrations`: 2 тестови реда;
- `connections`: 1 тестов ред;
- `messages`: 0;
- основните таблици са с RLS.

Security Advisor:
- ERROR: `public.public_registrations` е SECURITY DEFINER view;
- WARN: SECURITY DEFINER helper функции изискват review на executable scope;
- WARN: leaked password protection е disabled — релевантно, ако бъде избран password auth.

Нищо по тези точки не се променя автоматично без отделно предложение/одобрение.

## 5. Отворени P0 решения преди full implementation

End-to-end contract-ът **User Context Engine ↔ Admin/Owner Operations Engine е одобрен на 19.09.2026**.

Остават:
- точната Admin/Owner role matrix;
- ordinary-user auth модел;
- security remediation plan;
- точните ranking/cooldown правила на Context Engine.

## 6. NEXT EXACT STEP

**P0-5: да се затвори точната Admin/Owner ↔ Moderator role matrix.**

Трябва да е еднозначно кой вижда и кой може да действа по:
community reports, users, blocks/restrictions, service requests, providers, audit, system/security и необратими действия.

Без код и без DB промени преди изрично одобрение.

## 7. Source-of-truth правило

При голяма промяна на вече одобрена логика не се оставят два противоречащи варианта.

Задължително:
- актуализира се каноничният документ;
- записва се дата;
- записва се, че решението е одобрено от Admin/Owner;
- посочва се кое старо решение заменя;
- посочва се текущият implementation status;
- при реализация се добавя commit/migration/ref.

Дребни технически промени остават в Git history и се групират в checkpoint, вместо да се пълнят документите.

## 8. Последен значим checkpoint

На 19.09.2026 Admin/Owner одобри end-to-end operating contract-а:
**User Context Engine + Admin/Owner Operations Engine**.

Потвърдено е, че архитектурата стъпва върху текущата база, а не я заменя.

Открити са четири P0 несъответствия преди implementation:
`open_to_strangers`, minors/14+, connection pair integrity и structured travel.

**P0-1: 18+ — затворено. P0-2: inbound contact gate — затворено. P0-3: unordered pair + separate safety block — затворено. P0-4: structured travel — затворено. Следва P0-5: role matrix.**
