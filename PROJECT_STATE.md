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

- Human-readability е основно UX правило: важният текст и действията са достатъчно големи, ясни и контрастни; mobile се проверява първо; не се жертва разбираемост заради по-голяма плътност.

- Mobile-first е основно продуктово правило: първо се проектира и проверява mobile; desktop може да е по-плътен и да използва повече пространство, но не променя логиката/йерархията. При конфликт mobile UX има приоритет.

- P0-6 ordinary-user registration V1: email + password, show/hide, минимум 12 знака с кратка подсказка, 18+, Terms/Privacy, email confirmation. Без profile/context полета в първата регистрационна форма.

- P0-6 auth direction: email + password е основният ordinary-user модел. Взема се доказаният password UX от Popitai.Lom (show/hide, confirm, inline BG validation, email confirmation, forgot/reset) и се доразвива специално за Rodeni; magic link не е основният login.

- Role matrix V1: Admin управлява системата; Moderator пази community/safety средата и не е „малък Admin“. Service/business, role management, infrastructure, hard delete и exceptional chat access са Admin/Owner scope.

- Owner access must remain technically possible: архитектурата не трябва необратимо да заключва Admin/Owner извън private messages при реален dispute/safety/security/legal case. Достъпът остава case-specific, минимален, прозрачно описан и audit-ван.

- Admin/Owner exceptional chat access: няма рутинно четене, но при конкретен report/dispute/safety/security/legal case Owner може да прегледа минимално необходимото съдържание; причината и достъпът се audit-ват. Moderator няма общ такъв достъп.

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
- Ordinary-user auth посоката вече е заключена: email + password; текущият magic-link код е старо поведение до implementation.
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
- security remediation plan;
- точните ranking/cooldown правила на Context Engine.

## 6. NEXT EXACT STEP

- **P0-7 Visibility contract — ОДОБРЕНО:** 3 нива: (1) нерегистриран вижда само карта + privacy-safe агрегати, без самоличности; (2) регистриран непознат вижда кратка contextual card само при силна обяснима причина, не пълен профил; (3) accepted connection отключва комуникация, не автоматично всички лични данни. Email/телефон/точна възраст/точен адрес не са автоматично публични. Travel се показва само когато е релевантно към конкретна нужда. `open_to_strangers=OFF` спира actionable inbound discovery, но user остава в aggregate counts и може сам да изпраща outbound заявки. Няма implementation още.

- **P0-7 Public hook / карта — ОДОБРЕНО:** публичната карта остава първи entry point с кука **„А ти къде си на картата?“**. Преди регистрация user дава „Къде си сега?“ + „Откъде си?“ и получава реален, privacy-safe агрегат. CTA след резултат: **„Виж кои са“**; при липса: **„Добави се“**. Въведените Root + Current Location се пренасят в onboarding-а, без повторно попълване. Старото „Присъедини се, за да пишеш“ не е финалната hook логика. Няма implementation още.

- **P0-7 „Жив контекст“ — ОДОБРЕНО:** вътрешен Context Engine принцип: Root + Current Location + временен контекст + активна нужда + accepted връзки + „защо сега“. Не е нов раздел и не добавя UI сложност; само променя временно приоритета на релевантните възможности.

- **P0-7 „Ти“ — ОДОБРЕНО:** лек контролен център без претрупване. Първият екран показва само идентичност, Root, Current Location, активен временен контекст и ключови разрешения. Вторичните настройки са отделени. Уникалността идва от Context Engine, не от повече UI.

- **P0-7 „Твоите хора“ — ОДОБРЕНО:** спокоен списък с accepted връзки, търсене по име, кратки актуални статуси само когато има смисъл, индикатор за нови съобщения, без отделен ranking/feed. „Премахни от моите хора“ и „Блокирай“ са различни действия. Няма implementation още.

- **P0-7 „За теб“ — ОДОБРЕНО:** окончателният ред е „Чака теб“ → „Полезно точно сега“ → „Хора, които има смисъл да познаваш“. Слабите сигнали не заемат силни позиции сами. Известията са по-строги от in-product показването. Home показва максимум 3 актуални карти. Няма implementation още.

- **P0-7 Приети връзки — ОДОБРЕНО:** accepted хората стоят постоянно в „Твоите хора“. В „За теб“ се появяват само при нов релевантен статус/момент. При конкретна нужда и равна релевантност познатият има предимство пред непознат. CTA за accepted connection е „Пиши на [име]“, не „Свържи се“. Няма implementation още.

- **P0-7 Travel need UX — ОДОБРЕНА КОРЕКЦИЯ:** „Търся човек, който пътува“ събира само От → До → около коя дата. Не се иска публично какво точно трябва. След свързване хората уточняват всичко сами в чат, по телефон или по друг избран от тях начин. Системата само намира подходящия човек и не управлява подробностите по предаването/помощта.

- **P0-7 Двустранен travel matching — ОДОБРЕН:** „Пътувам“ се среща с „Търся човек, който пътува“. Първо се гледат маршрут → дата → вид помощ; Root се използва чак за подреждане между еднакво подходящи хора. Travel permission е само за конкретното пътуване и е отделно от общото разрешение за заявки. Не се включва превоз на хора засега. Няма implementation още.

- **P0-7 Личен временен статус „Пътувам“ — ОДОБРЕН:** user сам задава От → До → дата/период → по желание връщане. По желание отбелязва „Мога да помогна с:“ малък пакет, документи, предаване на нещо, информация за пътуването или друго малко нещо. Travel статусът изтича автоматично и не прави user-а куриер/превозвач/доставчик. Няма implementation още.

- **P0-7 Заявки за свързване — ОДОБРЕНО:** „Искаш ли подходящите хора да могат да се свързват с теб?“ / „Само когато имате реална обща връзка. Ти решаваш кого да приемеш.“ / „Да, позволявам заявки за свързване.“ Default OFF. ON допуска само релевантни inbound заявки; OFF не пречи на outbound. При отказ: 90 дни пауза за същата двойка и нова заявка след това само при нова реална причина. Block прекъсва discovery/contact. V1 лимит: до 5 нови outbound заявки за 24 часа. Няма implementation още.

- **Уточнение към Root matching hierarchy — ОДОБРЕНО:** областта остава наличен, но слаб резервен контекст. Не е сред основните Root нива и сама по себе си не е достатъчна за силна препоръка; използва се само заедно с друга добра обща причина.

- **P0-7 Root matching hierarchy — ОДОБРЕН:** първо точно същото населено място, после същата община, после силен non-Root контекст. Потребителят избира само населеното място; принадлежността към община се определя системно от canonical географски данни. Областта сама не е достатъчна за силна personal recommendation. Няма implementation още.

- **P0-7 Community Guidance Signal — ОДОБРЕН:** user-facing семантика „Информация, съвет и насока“. Въпрос: „Би ли споделил информация, съвет или насока, когато можеш?“ Това е community capability, не платена услуга, не каталог и никога не участва в Service Engine. Използва се само при реална обща причина/explicit need и не заобикаля `open_to_strangers`. Няма implementation още.

- **P0-7 Onboarding Block 3 — ОДОБРЕН:** „Къде си сега?“ + подсказка „Избери къде живееш в момента. Така можем да ти показваме хора наблизо.“ + полета Държава → Населено място. Root и Current Location са отделни сигнали. С това minimum onboarding V1 е затворен като 1 mobile-first екран: Име/прякор → Откъде си? → Къде си сега? Няма implementation още.

- **ОДОБРЕНО за бъдещия слой „Услуги“:** архитектурата е национално подготвена, но услугите се активират по населено място/район; първоначално само Лом е ON. Community и Services activation са независими. Няма implementation сега.




- Onboarding block 1 — Identity е одобрен: „Как да те виждат другите?“ + „Напиши името или прякора, с който искаш да се показваш в „Родени в Лом“.“ + поле „Име или прякор“.
- **P0-7 Onboarding Block 2 — ОДОБРЕН:** „Откъде си?“ → едно национално поле за населено място в България. Лом + населените места от общината могат да са priority choices за пилота, но Root не е ограничен до Лом. Context Engine трябва да работи с canonical root locality, без hardcoded Lom-only логика. Няма implementation сега.


**P0-7 approved:** Hybrid locality resolution е одобрено: запазват се local country/city lists; при липсващо място има explicit fallback към controlled external lookup; избраното място има canonical identity; last-resort ръчно добавено място остава pending/unverified и не създава A-level exact-locality match. Не е реализирано.

**P0-7 analysis checkpoint:** предложени са Minimum Context → Context Loop → Opportunity и детайлна Signal Contract Matrix. Explain-while-asking UX принципът е ОДОБРЕН: всеки въпрос обяснява защо се иска, каква стойност отключва и какво следва; CTA подсказва реалната следваща стъпка, а не е кухо „Продължи“. Текущата препоръка е first screen = display name + national canonical Root locality + current country + canonical current locality. Photo/school/profession/help/travel идват адаптивно след първа стойност. Критични зависимости остават visibility contract, canonical locality strategy и notification/cooldown.


**P0-7: да се затвори post-confirmation onboarding / първият екран след регистрация.**

P0-6 затваря само първата регистрационна форма и email confirmation. Следва отделно решение какво вижда потребителят веднага след потвърждението и кои минимални profile/context данни са нужни, за да получи първа реална стойност.

Без код и без DB промени преди изрично одобрение.


## 6A. PRE-PROTOTYPE CHECKPOINT — 20.09.2026

### Заключено преди прототипа

Вече са одобрени и не се отварят отначало без конкретен конфликт:
- minimum onboarding: Име/прякор → Откъде си? → Къде си сега?;
- Root hierarchy;
- „За теб“ priority model;
- „Твоите хора“;
- „Ти“ като лек control center;
- accepted-connection behavior;
- connection-request permission model;
- travel model;
- Community Guidance;
- „Жив контекст“;
- public hook върху картата: **„А ти къде си на картата?“**;
- pre-registration preview с Current Location + Root и реален privacy-safe aggregate;
- visibility contract с 3 нива: public aggregate → contextual stranger card → accepted relationship + communication.

### Важно: НЕ е още заключено

Следните точки НЕ трябва да се приемат автоматично само защото са предложени или присъстват в по-стари документи:
- окончателният визуален/екранен layout;
- точният privacy threshold за много тесни public aggregates;
- точните DB/RLS/schema промени за новия contract.

### Logged-in architecture/navigation contract — ОДОБРЕНО 20.09.2026

Постоянните главни секции са:
- **За теб** — default след onboarding; какво има значение сега;
- **Карта** — свободно разглеждане на места, общности и privacy-safe агрегирани данни; конкретен непознат само при силна и ясна причина според Visibility Contract;
- **Хора** — само „Твоите хора“ / accepted connections; никога discovery на непознати;
- **Ти** — личен контекст и control center.

Travel не е постоянен tab:
- „Пътувам“ се управлява като временен личен контекст от „Ти“;
- „Търся човек, който пътува“ е активна нужда през „За теб“.

Chat не е постоянен tab:
- основно се отваря през „Хора“ → човек → „Пиши“;
- при релевантно действие в „За теб“ може да се отвори директно.

Public → registered continuity:
**карта → public hook → preview → registration → onboarding → „За теб“**.

### NEXT EXACT STEP ПРЕДИ ПРОТОТИПА

Минава се **screen-by-screen contract** за вече одобрената архитектура:
- каква е ролята на всеки екран;
- кое е водещото действие;
- какви състояния трябва да има;
- как преминава user-ът между екраните;
- без финален визуален дизайн и без код.

След Owner одобрение на screen-by-screen contract-а се прави пълен интерактивен mobile-first prototype.

Не започвай prototype implementation преди това.

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

**P0-1: 18+ — затворено. P0-2: inbound contact gate — затворено. P0-3: unordered pair + separate safety block — затворено. P0-4: structured travel — затворено. P0-5: role matrix — затворено. P0-6: registration V1 — затворено. Следва P0-7: post-confirmation onboarding.**
