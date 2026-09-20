# PROJECT STATE — „Родени в Лом“

**Актуализирано:** 20.09.2026  
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

- **Ново основно правило за човешка полза — одобрено 20.09.2026:** всеки механизъм трябва да носи конкретна полза за конкретния човек според неговия реален контекст — откъде е, къде е сега, какво търси или от какво има нужда в момента. Основният тест е „Каква конкретна полза получава този човек точно сега?“. Ако няма ясен отговор, механизмът не влиза в продукта. Лом остава първата реална общност и отправната точка, но продуктът не е технически или продуктово ограничен само до Лом при вече одобрения национален модел. Пълният OWNER approval checklist е в `START_HERE.md` и Master секция #82.

- **Критерий за отличителен собствен механизъм — одобрен 20.09.2026:** не е достатъчно функцията да е нова. Начинът, по който контекстът, сигналите, privacy, моментът и действието работят заедно, трябва да има разпознаваема собствена продуктова логика. Целта е механизмите на „Родени в Лом“ да са толкова смислено различими, че други продукти по-късно да се питат „Как са го измислили?“. Уникалност без човешка полза не се приема; собствен механизъм се развива само когато е естествено оправдан от ползата и контекста.

- **Уточнение към критерия за уникалност — одобрено от Owner:** уникалността е проверка, не квота за всеки екран. Не се измисля механизъм и не се добавя съдържание само за да има нещо уникално или за да се запълни екранът. Ако собствената продуктова логика не създава естествено оправдан уникален механизъм, избира се най-ясното и полезно стандартно решение.

- **Pre-prototype точка 1 — ОДОБРЕНА 20.09.2026:** публичният aggregate остава реален и включва community присъствието, включително users с `open_to_strangers=OFF`. CTA **„Виж кои са“** се заменя с **„Виж какво има за теб“**. До действието се обяснява: **„Конкретен човек се показва само когато имате ясна обща причина и той позволява нови заявки.“** След registration/onboarding се отваря „За теб“ и се показват само допустими contextual cards. OFF user остава aggregate-only за нови непознати, освен ако сам не изпрати заявка.

- **Pre-prototype точка 2 — ОДОБРЕНА 20.09.2026:** минималният праг за всяка публична тясна комбинация/подгрупа е 5 души. При 0–4 се използва един и същ текст, без да се разкрива дали групата е празна или малка. При 5+ се показват реални размерни нива `5+`, `10+`, `25+`, `50+`, `100+`, не точни бройки. Допуска се безопасно разширяване към по-широк смислен контекст само ако той отделно покрива прага. Публичните филтри са предварително определени, а агрегатите не се обновяват в реално време. Прагът не разрешава показване на самоличност и не заменя Visibility Contract или `open_to_strangers`.

- **Pre-prototype точка 3 — ОДОБРЕНА 20.09.2026:** Root + Current Location от public preview се пренасят през registration/email confirmation като частен и непотвърден pending context. Пазят се само canonical IDs + време + version; не се поставят в URL/analytics/public table и не участват в aggregates, matching, RLS или eligibility. След email confirmation minimum onboarding показва стойностите за потвърждение/редакция с водещо действие **„Потвърди и продължи“**. Едва след това се валидират, записват като реален контекст и pending копието се изчиства. При липсваща/невалидна/изтекла чернова се задават отново само двата минимални въпроса, без блокиране.

- **Задължителна dependency проверка — OWNER DIRECTION 20.09.2026:** решенията не се вземат по памет или чрез изолиране на една функция. Преди предложение се проверява `PRODUCT_FUNCTION_DEPENDENCY_MAP.md` спрямо Master/State и всички комбинирани user states: waiting actions, active needs, Travel, accepted connections, permissions, block/decline, privacy, entry/exit и recovery. Картата се актуализира при всяко ново одобрено решение.

- **Задължителен screen-by-screen analysis protocol — ОДОБРЕН:** всеки екран се проверява последователно по контекст/зависимости → роля → конкретна човешка полза → вход и първи 3 секунди → водещо действие/изход → пълен flow → всички states → privacy/safety/security/законност → mobile UX/четимост → filler → естествена уникалност → техническа цена. WORK CONTROLLER дава един конкретен проблем и най-доброто решение с зависимости и ясни изключения, плюс отделен видим отчет за уникалност; ако няма естествена уникалност, това се казва ясно и нищо не се добавя насила. Следващ важен проблем идва само след Owner решение. Пълният протокол е в `START_HERE.md` §4B и Master §90.

- **Pre-prototype точка 4 — ОДОБРЕНА 20.09.2026:** post-registration no-result contract-ът важи само след registration, email confirmation и завършен minimum onboarding. „Няма допустим непознат“ не означава празно „За теб“. Редът е waiting actions → active need/Travel → релевантни accepted хора → допустими strangers → privacy-safe context → една човешка следваща стъпка. Активна нужда/Travel получава собствен status card и управление, без generic повторен въпрос. Нерелевантни accepted хора и слаби strangers не се използват като filler. Първото истинско no-result състояние обяснява разликата между общност и допустим човек и предлага **„Посочи нужда“**; при следващи влизания без ново действие се използва спокойно състояние, без повтаряне на registration hook-а.

- **Pre-prototype точка 5 — ОДОБРЕНА 20.09.2026:** public aggregate брои веднъж само confirmed-email, completed-onboarding, confirmed-18+, canonical и user-confirmed community profiles, които не са deleted/suspended/banned/test. Pending context и unresolved locality не участват. `open_to_strangers`, снимка, професия, guidance/help, connections, block и decline не влияят на community count. Travel не променя Current Location. Root не изтича; Current Location изтича за current-location aggregates 12 месеца след последното user потвърждение. Всички промени се отразяват при следващия стабилен snapshot, след което отново се прилагат threshold 5 и размерните нива.

- **Pre-prototype точка 6 — ОДОБРЕН SCOPE LOCK 20.09.2026:** текущият screen-by-screen contract и prototype са community-only. Няма Services tab, service request, automatic service opportunity, Ivanov Remonti transition, commercial recommendation или transfer към business layer. Community Guidance остава отделно. National-ready/local-activation Services архитектурата се пази само като future constraint. Старите Services въпроси са задължителни преди бъдещия Services prototype/implementation, не преди текущия community prototype.

- **Screen 1 — Точка 1 ОДОБРЕНА:** от сегашния публичен екран се запазват световната карта като водещ entry point, минималният header, map interaction и тъмносиньо-златистата посока без финален visual lock. Не се пренасят ticker, profile cards, public people tabs, exact counts/zero, direct people browse, country people panel, „Присъедини се, за да пишеш“, директният hook → auth преход или public `select('*')`. Одобреният flow е карта → два context въпроса → privacy-safe aggregate → „Виж какво има за теб“ → registration/confirmation/onboarding/„За теб“. Няма implementation.

- **Screen 1 — Точка 2 ОДОБРЕНА:** анонимният първи viewport съдържа `Родени в Лом`, едно ясно обяснение, world map с community signal само при privacy-safe aggregate 5+, водещо **„А ти къде си на картата?“**, privacy опора **„Показваме общности, не лични профили.“**, вторични `Вход` и `Поверителност`. Няма public identities, exact counts/zero или ticker. Първият изглед не се насилва да бъде уникален; той е вход към отличителния map → context → privacy → Context Bridge → „За теб“ механизъм. Няма implementation.

- **Screen 1 — Точка 3 ОДОБРЕНА:** hook-ът отваря mobile bottom sheet/desktop side panel върху същата видима карта, не registration. Стъпка 1 е **„Къде си сега?“** с privacy/benefit hint, canonical `Държава` → `Населено място`, controlled lookup fallback, без GPS/IP и без URL/analytics/public write. След валиден избор картата потвърждава чрез country focus/selected state, без public count; CTA **„Продължи към „Откъде си?““** отваря стъпка 2. Visual и uniqueness отчетите са затворени в Master §94. Няма implementation.

- **Screen 1 — Точка 4 ОДОБРЕНА:** стъпка 2 остава в същия panel и показва Current summary + `Промени`, **„Откъде си?“**, national canonical Root search, benefit/privacy hints и CTA **„Виж какво показва картата“**. Лом е priority, не hard limit. Unverified Root не създава exact result и не блокира по-широк допустим Current result. Картата показва различими `Сега`/`Откъде си` markers без подвеждаща route линия. Visual и uniqueness отчетите са в Master §95. Няма implementation.

- **Screen 1 — Точка 5 ОДОБРЕНА:** preview-ът остава върху видимата карта и показва context summary + един допустим result. Exact `Root + Current` се показва само при threshold 5 чрез bands `5+`, `10+`, `25+`, `50+`, `100+`; 0–4 използват едно общо privacy състояние. Допуска се само едно предварително определено смислено safe broadening ниво, което самостоятелно покрива прага; за пилота е „Лом и региона“. CTA винаги е **„Виж какво има за теб“** и не обещава конкретни хора. Visual и uniqueness отчетите са в Master §96. Няма implementation.

- **Screen 1 — Точка 6 ОДОБРЕНА; SCREEN 1 CONTRACT COMPLETE:** техническа грешка никога не се представя като `0–4`, zero или community result. Loading пази map/context; retry повтаря само failed операцията; draft-ът и валидното друго място се запазват. След повторен aggregate failure се допуска secondary **„Продължи без публичен резултат“** с private pending context, без измислена бройка. External lookup failure не означава, че мястото не съществува. Visual, accessibility и uniqueness отчетите са в Master §97. Няма implementation.

- **Screen 1 review prototype — РЕАЛИЗИРАН 20.09.2026; ОЧАКВА OWNER REVIEW:** `prototype-screen1.html` покрива одобрения contract от Master §§91–97 с demo data, mobile bottom sheet/desktop side panel, exact/safe-broader/suppressed резултати и error/retry recovery. Това е отделен review артефакт; `index.html`, Supabase и DB не са променяни. „Няма implementation“ в историческите Screen 1 approval записи означава, че няма production implementation; актуалният review-prototype status е този запис и Master §98.

- **Prototype Release Gate — ОДОБРЕН 20.09.2026:** първият Screen 1 candidate не минава mobile visual approval заради дребни текстове и слаба визуална тежест на главната кука. Master §99 вече изисква hard mobile floors, `360/390/412` + high-resolution mobile проверка, state matrix, three-second test, visual evidence и независим controller pass. Текущият status е **CORRECTION CANDIDATE**, не „mobile verified“.

- Human-readability е основно UX правило: важният текст и действията са достатъчно големи, ясни и контрастни; mobile се проверява първо; не се жертва разбираемост заради по-голяма плътност.

- Mobile-first е основно продуктово правило: първо се проектира и проверява mobile; desktop може да е по-плътен и да използва повече пространство, но не променя логиката/йерархията. При конфликт mobile UX има приоритет.

- **Visual Hierarchy Contract — ОДОБРЕН:** всеки screen contract и prototype използва ясни mobile type роли (`26–30px` основно послание, `22–24px` въпрос, `18–20px` section title, минимум `16px` body/CTA, `14–15px` helper), семантични color roles, минимум `4.5:1` нормален и `3:1` голям текст, `48px` важни touch targets, видим focus и системни spacing нива. Подсказките обясняват полза/privacy/следващо действие и стоят до свързания елемент. Всяко предложение има отделен visual hierarchy report. Пълният contract е в `START_HERE.md` и Master §93.

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

- **P0-7 Public hook / карта — ОДОБРЕНО:** публичната карта остава първи entry point с кука **„А ти къде си на картата?“**. Преди регистрация user дава „Къде си сега?“ + „Откъде си?“ и получава реален, privacy-safe агрегат. CTA след всеки допустим резултат, включително privacy-suppressed резултат: **„Виж какво има за теб“**; кратко обяснение: **„Конкретен човек се показва само когато имате ясна обща причина и той позволява нови заявки.“** Въведените Root + Current Location се пренасят в onboarding-а, без повторно попълване. Старото „Присъедини се, за да пишеш“ не е финалната hook логика. Няма implementation още.

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

**P0-7 current checkpoint:** Explain-while-asking UX принципът е ОДОБРЕН. Minimum Context, visibility contract, canonical locality strategy, public continuity и pre-prototype privacy/flow blockers са затворени като продуктови решения. Photo/school/profession/help/travel идват адаптивно след първа стойност. Точните ranking/cooldown, notification delivery и DB/RLS механизми остават преди implementation, но не блокират screen-by-screen prototype contract-а.


**P0-7 post-confirmation onboarding е ЗАТВОРЕН като продуктов contract:** след email confirmation minimum onboarding е Име/прякор → Root → Current Location; pre-registration Root/Current се пренасят като private pending context и се потвърждават/редактират, без повторно попълване от нулата. Няма implementation още.


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
- окончателният визуален и screen-by-screen layout;
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

Допълнителните pre-prototype рискове се затварят **един по един** по OWNER approval criteria.

- Точка 1 — public aggregate → personal value contract: **ОДОБРЕНА**.
- Точка 2 — privacy праг и адаптивна публична видимост: **ОДОБРЕНА**.
- Точка 3 — „Контекстов мост“ през registration и email confirmation: **ОДОБРЕНА**.
- Преди точка 4 е създаден и задължително се използва `PRODUCT_FUNCTION_DEPENDENCY_MAP.md`; т.4 не се решава само като изолиран empty state.
- Точка 4 — post-registration no-result contract: **ОДОБРЕНА**.
- Точка 5 — Aggregate Eligibility Contract: **ОДОБРЕНА**.
- Точка 6 — Services scope lock за текущия community prototype: **ОДОБРЕНА**.
- Допълнителните pre-prototype blockers са **ЗАТВОРЕНИ**.
- Screen 1, Точка 1 — reuse boundary и основен flow: **ОДОБРЕНА**.
- Screen 1, Точка 2 — първоначално публично състояние и първите 3 секунди: **ОДОБРЕНА**.
- Screen 1, Точка 3 — context panel и „Къде си сега?“: **ОДОБРЕНА**.
- Screen 1, Точка 4 — „Откъде си?“ и Root selection: **ОДОБРЕНА**.
- Screen 1, Точка 5 — privacy-safe preview, 0–4 и safe broadening: **ОДОБРЕНА**.
- Screen 1, Точка 6 — loading/network/error, retry и recovery: **ОДОБРЕНА**.
- **Screen 1 contract: ЗАВЪРШЕН.**
- **Screen 1 interactive review prototype: ПУБЛИКУВАН, НО ПЪРВИЯТ MOBILE VISUAL PASS Е ОТХВЪРЛЕН.**
- Следва **initial mobile correction candidate → реална Owner phone проверка на Точка 1 → одобрение или конкретна корекция**. Без промяна на `index.html`, production/Supabase implementation или Screen 2 преди това.

След затварянето на тези ограничени точки се довършва **screen-by-screen contract** за вече одобрената архитектура:
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

Текущият значим checkpoint е Master §99: Release Gate е одобрен, а initial mobile state се коригира след отхвърления първи visual pass. Technical pass не означава mobile/Owner approval.

## 8. Последен значим checkpoint

На 19.09.2026 Admin/Owner одобри end-to-end operating contract-а:
**User Context Engine + Admin/Owner Operations Engine**.

Потвърдено е, че архитектурата стъпва върху текущата база, а не я заменя.

Открити са четири P0 несъответствия преди implementation:
`open_to_strangers`, minors/14+, connection pair integrity и structured travel.

**P0-1: 18+ — затворено. P0-2: inbound contact gate — затворено. P0-3: unordered pair + separate safety block — затворено. P0-4: structured travel — затворено. P0-5: role matrix — затворено. P0-6: registration V1 — затворено. Следва P0-7: post-confirmation onboarding.**
