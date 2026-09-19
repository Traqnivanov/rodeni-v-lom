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

- Собственикът е **Admin/Owner — най-високата роля**.
- Moderator е бъдеща по-ниска оперативна роля.
- Admin/Owner има отделен защитен staff вход; URL или скрит бутон не са security.
- Staff role е DB-backed security identity и трябва да се налага и в backend/RLS/RPC.
- Формите следват общ BG UX стандарт: labels, hints, inline validation, loading, success/error state, next step, duplicate-submit protection, accessibility и backend enforcement.
- От Popitai.Lom се пренасят доказани security/form patterns, но не се копира продуктът 1:1.
- Сегашният magic-link auth на Rodeni не е автоматично заменен с password auth; финалният ordinary-user auth избор остава отворен.
- Преди personalized matching launch трябва да има окончателно решение за minors/safety.

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

- точната Admin/Owner role matrix;
- ordinary-user auth модел;
- safety/minor launch rule;
- security remediation plan;
- точният Context Engine / Opportunity contract върху текущите сигнали;
- end-to-end връзката User Context Engine ↔ Admin/Owner Operations Engine.

## 6. NEXT EXACT STEP

**Да се изработи една обща end-to-end процесна карта на User Context Engine + Admin/Owner Operations Engine, без код и без DB промени.**

За всеки важен event да се опише:
user sees → event → gate → opportunity/queue → кой има право да действа → action → user update → notification → next/terminal state → audit/privacy.

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

На 19.09.2026 Admin/Owner изрично въведе правило за continuity между чатове:
**следващ чат не трябва да сравнява остарели правила с нов код и сам да отгатва истината. При промяна на важна логика source-of-truth се актуализира изрично.**

Статус: **ОДОБРЕНО ПРАВИЛО ЗА ПРОЦЕСА**.
