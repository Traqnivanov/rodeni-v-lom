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
- точна семантика на `open_to_strangers`;
- connection pair integrity;
- structured travel model за date-overlap;
- точната Admin/Owner role matrix;
- ordinary-user auth модел;
- security remediation plan;
- точните ranking/cooldown правила на Context Engine.

## 6. NEXT EXACT STEP

**P0-2: да се затвори точната семантика на `open_to_strangers`.**

Текущо полето работи като badge/filter, но не е Gate за изпращане на connection request. Трябва да има едно канонично правило преди Context Engine implementation.

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

**P0-1 е затворено: V1 = 18+ за регистрация, matching, connection requests и private chat. Следва P0-2: `open_to_strangers`.**
