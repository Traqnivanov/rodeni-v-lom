# PRODUCT FUNCTION DEPENDENCY MAP — „Родени в Лом“

**Дата:** 20.09.2026
**Статус:** ЗАДЪЛЖИТЕЛЕН ОПЕРАТИВЕН ИНДЕКС НА ОДОБРЕНИТЕ ФУНКЦИИ
**Обхват:** продуктова логика, UX, privacy, safety, flow и зависимости преди решение
**Не е:** нова продуктова спецификация, заместител на Master-а или разрешение за implementation

## 1. Защо съществува този файл

Ново решение не може да се взема изолирано или по памет.

Преди предложение WORK CONTROLLER трябва да провери всички вече одобрени функции и всички user states, които могат да променят решението.

Този файл е задължителната карта за тази проверка.

Ако тук липсва одобрен механизъм:

1. решението се спира;
2. проверяват се `PROJECT_STATE.md` и последните одобрени Master секции;
3. картата се актуализира;
4. едва след това се прави предложението.

При конфликт важи:

**последно изрично одобрено решение в Master/State → този dependency index → legacy код/CLAUDE**

Картата не може сама да промени одобрено решение.

## 2. Основна продуктова логика

„Родени в Лом“ не е каталог, feed, Facebook clone, dating matching или публична директория.

Основният механизъм е:

**правилният човек → по конкретна човешка причина → в правилния момент**

Всеки механизъм трябва да отговори:

**„Каква конкретна полза получава този човек точно сега?“**

Лом е първата реална общност и отправна точка. Архитектурата не се hardcode-ва само за Лом, когато одобреният национален модел изисква по-широк обхват.

### Глобални ограничения за всяка функция

- Owner има последната дума; WORK CONTROLLER не заменя Owner;
- конкретна човешка полза според реалния контекст;
- screen-by-screen решенията следват задължителния 12-стъпков protocol от `START_HERE.md` §4B и Master §90;
- всяко предложение съдържа отделен отчет за уникалност, включително ясно „няма естествена уникалност“, когато това е честният резултат;
- уникалност само когато произтича естествено от полезния механизъм; без измислени елементи и без запълване на екран;
- отличителен собствен механизъм, не generic feature;
- законност като hard constraint;
- privacy, safety и security by design;
- mobile-first;
- clarity-first и human-readability;
- Visual Hierarchy Contract: mobile type/color/touch/focus/spacing роли и отделен визуален отчет за всяко screen предложение (`START_HERE.md`, Master §93);
- едно ясно водещо действие;
- explainability: „защо това“, „защо сега“, „какво мога да направя“;
- loading, empty, error, success, permission denied, blocked и recovery states;
- lightweight по подразбиране, без жертване на видимото качество.

## 3. Контекст, който може да съществува едновременно

Следните състояния не са взаимно изключващи се. Един човек може едновременно да има accepted хора, активно пътуване, входяща заявка и permission OFF.

### Identity / lifecycle

- нерегистриран;
- registration започната;
- email непотвърден;
- email потвърден, onboarding незавършен;
- onboarding завършен;
- профил/контекст активен;
- сесия изтекла или потребителят е излязъл.

### Постоянен личен контекст

- име/прякор;
- Root — едно canonical населено място в България;
- Current Location — отделен signal от Root;
- accepted connections;
- ключови permissions.

### Временен или активен контекст

- активна човешка нужда;
- „Пътувам“;
- „Търся човек, който пътува“;
- входяща connection request;
- чакащо действие;
- актуален релевантен статус на accepted човек;
- decline pause;
- block;
- липса на активен контекст.

### Privacy / contact състояние

- `open_to_strangers=ON`;
- `open_to_strangers=OFF`;
- pending connection;
- accepted connection;
- declined connection с 90-дневна пауза;
- blocked pair;
- outbound действие, започнато от самия user.

## 4. Каноничен регистър на функциите и зависимостите

| Функция / механизъм | Одобрено поведение | Задължително се проверява заедно с |
|---|---|---|
| End-to-end contract | `event → gate → reason → opportunity/queue → one clear action → result → next state → audit/privacy` | всеки user и Admin flow; explainability; failure/recovery |
| Context Engine | Комбинира Root, Current Location, временен контекст, активна нужда, accepted хора, permissions и „защо сега“ | Gate преди relevance; без opaque score и без filler |
| Opportunity | Кратка explainable стойност с една ясна причина и действие | current state, expiry/cooldown, permissions, next state |
| Progressive context | School, profession, guidance/help, openness, Travel и photo се искат след първа стойност, когато могат да отключат конкретна полза | Explain-while-asking, Next Best Question, data minimisation |
| Public world map | Публичен вход към места, държави, общности и privacy-safe агрегати | aggregate threshold, Visibility Contract, public hook, Context Bridge |
| Public hook | „А ти къде си на картата?“ → „Къде си сега?“ → „Откъде си?“ | privacy threshold, registration, onboarding continuity |
| Public aggregate | Реално community присъствие, включително `open_to_strangers=OFF`; не обещава самоличности | threshold 5, размерни нива, fixed filters, non-real-time update |
| Aggregate privacy | 0–4 се скриват в едно общо състояние; при 5+ се показват `5+`, `10+`, `25+`, `50+`, `100+` | всяка подгрупа отделно; без exact zero и arbitrary differencing |
| Aggregate eligibility | Само confirmed-email, completed-onboarding, confirmed-18+, canonical user-confirmed profiles; без pending/unresolved/deleted/suspended/banned/test | един account веднъж; OFF остава; stable snapshot; threshold се прилага след eligibility |
| Aggregate freshness | Root не изтича; Current Location участва до 12 месеца от последното user потвърждение | Travel не променя Current Location; expired current location се връща след reconfirmation и следващ snapshot |
| Public CTA | „Виж какво има за теб“ | не обещава „Виж кои са“; води към registration → onboarding → „За теб“ |
| Screen 1 reuse boundary | Запазва world map entry, minimal header и map interaction; премахва public people directory, ticker, exact counts/zero, people tabs и direct hook → auth | Master §91; няма public identities; само privacy-safe aggregate → Context Bridge |
| Screen 1 initial public state | `Родени в Лом` → ясно map обяснение → privacy-safe world map → „А ти къде си на картата?“ → „Показваме общности, не лични профили.“ | Master §92; anonymous first viewport; secondary `Вход`/`Поверителност`; no forced uniqueness |
| Screen 1 Current Location step | Hook → same-screen mobile bottom sheet/desktop side panel → canonical `Държава` → `Населено място` → country focus → „Продължи към „Откъде си?““ | Master §94; private browser session; no GPS/IP/URL/analytics/public write/count; controlled lookup fallback |
| Screen 1 Root step | Current summary → „Откъде си?“ → national canonical Root search → `Сега`/`Откъде си` markers → „Виж какво показва картата“ | Master §95; Lom priority, not hard limit; no route line; unverified Root gives no exact-locality result and is not trusted context |
| Registration | Email + password, минимум 12 знака, 18+, Terms + Privacy, email confirmation | Context Bridge, auth errors, existing account, session state |
| V1 age/safety | Registration, personalized matching, contact и chat са само за 18+ | backend enforcement; legacy `age >= 14` не е валидният launch contract |
| Контекстов мост | Root + Current Location преминават като private unconfirmed pending context | browser session, email confirmation, validation, cleanup, fallback |
| Minimum onboarding | Име/прякор → Откъде си? → Къде си сега? | ако Root/Current вече са въведени, те се потвърждават/редактират, не се искат от нулата |
| Explain-while-asking | Всеки въпрос казва защо се задава, каква полза отключва и какво следва | human question, benefit hint, input, forward cue, конкретен CTA |
| Root | Точно населено място → община → силна друга причина; областта е слаб резервен signal | canonical geography, Context Engine, privacy |
| Current Location | Отделен signal от Root | public preview, Context Engine, Travel, privacy |
| Hybrid locality resolution | Fast local suggestions + explicit fallback + canonical locality identity | избрана държава, validation, cache, unresolved locality не дава exact-locality opportunity |
| School signal | Допълнителен context signal, не задължителен minimum onboarding field | може да участва в matching, без автоматично да се показва на stranger |
| Profession signal | Допълнителен capability/context signal, не автоматична оферта | progressive asking, visibility, hard separation from Services |
| Photo | Progressive trust/contact-readiness signal, не Context Engine изискване | upload safety, visibility, XSS/file validation, не е minimum onboarding field |
| Guidance/help capability | „Информация, съвет и насока“, когато user изрично го позволява | explicit need, real common reason, `open_to_strangers`, никога Service Engine |
| „За теб“ | Default след onboarding; максимум 3 актуални карти | „Чака теб“ → „Полезно точно сега“ → „Хора, които има смисъл да познаваш“ |
| „Чака теб“ | Най-високата одобрена група в „За теб“ | incoming requests и други действия, изискващи user решение |
| „Полезно точно сега“ | Текущи нужди, временен контекст и релевантни моменти | Travel, accepted хора, active need, permissions |
| „Хора, които има смисъл да познаваш“ | Само при силна, ясна и обяснима причина | Visibility Contract, `open_to_strangers`, block/decline, limits |
| Post-registration no-result resolver | Registered-only: waiting actions → active need/Travel → релевантни accepted хора → допустими strangers → privacy-safe context → една следваща стъпка | първо vs следващо влизане; safe aggregate vs suppressed 0–4; permissions; без filler; без разкриване кой gate е скрил човек |
| „Карта“ | Свободно разглеждане на места, общности и агрегати | никога свободен каталог на непознати |
| „Хора“ / „Твоите хора“ | Само accepted connections; търсене по име, релевантен временен статус и кратък unread indicator | никога discovery на непознати; без generic ranking/feed |
| „Ти“ | Лек control center за идентичност, Root, Current Location, временен контекст и permissions | не е дълъг dashboard; Travel „Пътувам“ се управлява тук |
| Visibility ниво 1 | Public user вижда карта и privacy-safe aggregates | без имена, снимки и индивидуални профили |
| Visibility ниво 2 | Registered stranger вижда кратка contextual card само при силна причина | не пълен профил; минимални полета; permissions/safety |
| Visibility ниво 3 | Accepted connection отключва комуникация | не отключва автоматично телефон, email, точен адрес или всички данни |
| `open_to_strangers` | Default OFF; управлява нов inbound contact | OFF остава в aggregate; outbound е възможен; accepted връзките остават |
| Connection pair | Максимум една active relationship за unordered pair A+B | atomic backend enforcement при implementation |
| Decline | 90 дни pause за същата двойка | след това нова заявка само при нова реална причина |
| Block | Отделен safety механизъм; прекъсва discovery/contact | не е „Премахни от моите хора“; само blocker може да unblock |
| Outbound limit | Максимум 5 нови outbound заявки за 24 часа във V1 | abuse prevention, atomic enforcement |
| Accepted connections | Стоят постоянно в „Твоите хора“ | в „За теб“ се появяват само при нов релевантен момент |
| Accepted preference | При конкретна нужда и равна релевантност познатият има предимство пред непознат | не отменя route/date/need relevance |
| Remove connection | „Премахни от моите хора“ прекратява accepted relationship | не създава автоматично block |
| Private chat | Само при accepted relationship | основен вход „Хора“ → човек → „Пиши“; не е постоянен tab |
| Messages indicator | В „Твоите хора“ може да има кратък индикатор за непрочетено | без preview feed на целия последен текст; privacy |
| Report | Отделно действие при човек/връзка и вход към safety process | не е block; staff scope; audit; exceptional chat access само при case |
| „Пътувам“ | Structured temporary context: От, До, дата/период, optional return и optional малка помощ | автоматично изтичане; не е постоянен профилен факт; управлява се през „Ти“ |
| „Търся човек, който пътува“ | Active need: От, До, около коя дата | не се пита публично какво точно трябва; стартира се през „За теб“ |
| Travel matching | Маршрут → дата → допълнителна помощ → community context при равни кандидати | отделно travel permission; без превоз на хора |
| Community Guidance | Информация, съвет и насока | не е платена услуга и не влиза автоматично в Services |
| Notifications | По-строги от in-product показването | отделно permission; не се обещава push без разрешение |
| Future Services layer | National-ready, активира се локално; първоначално само Лом е ON, когато future Services етапът бъде изрично започнат | ИЗВЪН текущия community prototype; explicit user need, отделен Service Engine, minimum necessary transfer + explicit consent |
| Service request | `new → review → clarification → assigned provider → inspection → offer → client decision → execution → report → closed/declined` | Admin/Owner Action Queue; provider identity; community data не се копира автоматично |
| Admin/Owner | Най-висока application роля; управлява system/service/roles/infrastructure | protected staff auth, DB-backed role, audit |
| Moderator | По-ниска community/safety operational роля | няма role management, service/business, hard delete, infrastructure или general chat access |
| Admin/Owner exceptional access | Само при конкретен report/dispute/safety/security/legal case | минимален, audit-ван достъп; Moderator няма общ достъп |

## 5. Задължителен ред преди резултат или empty state в „За теб“

Преди да се заключи, че „няма какво да се покаже“, се проверява целият актуален контекст:

1. Има ли нещо в **„Чака теб“**?
2. Има ли активна нужда?
3. Има ли активно **„Пътувам“**?
4. Има ли активно **„Търся човек, който пътува“**?
5. Има ли друг временен контекст?
6. Има ли релевантен accepted човек?
7. Има ли допустим непознат със силна причина?
8. Как влияят `open_to_strangers`, block, decline pause и outbound limits?
9. Има ли privacy-safe aggregate или Map стойност, която остава полезна?
10. Само ако няма релевантно действие или резултат — коя е една най-полезна следваща стъпка?

**„Няма допустим непознат“ не означава автоматично „За теб е празно“.**

## 6. Задължителна decision matrix преди ново предложение

Всяко предложение трябва изрично да е проверено поне в тези състояния:

| Състояние | Какво трябва да се провери |
|---|---|
| Public, без регистрация | Каква стойност получава без identity disclosure? |
| Registration започната | Запазва ли се контекстът безопасно? |
| Email потвърден, onboarding незавършен | Какво се потвърждава и какво липсва? |
| Onboarded, без активна нужда | Има ли смислена стойност без generic feed? |
| Има входяща заявка | Получава ли „Чака теб“ приоритет? |
| Има accepted хора | Проверени ли са преди да се обяви empty state? |
| Има активно „Пътувам“ | Следва ли решението маршрута, датата и помощта? |
| Търси пътуващ | Следва ли решението маршрута и датата на нуждата? |
| `open_to_strangers=OFF` | Запазени ли са aggregate и outbound правата без inbound exposure? |
| Declined pair | Спазва ли се 90-дневната пауза и новата причина? |
| Blocked pair | Прекъснати ли са discovery и contact? |
| Няма допустим stranger | Проверени ли са waiting, need, travel и accepted контекстите? |
| Малка публична група | Спазени ли са threshold 5 и размерните нива? |
| Loading/error/expired session | Има ли ясен recovery path без загуба на контекст? |
| Unresolved/ambiguous locality | Не се ли използва като точен факт преди canonical resolution? |
| Photo/school/profession липсват | Получава ли user първа стойност без принудително „пълен профил“? |
| Service intent | Остава ли отделен от community guidance и иска ли explicit consent? |
| Staff action | Спазени ли са Admin/Moderator границите и audit trail? |

## 7. Какво още НЕ е заключено

- точният Context Engine ranking/cooldown;
- точната Next Best Question логика;
- окончателният screen-by-screen layout;
- точните DB/RLS/schema промени;
- security remediation implementation;
- окончателният notification delivery contract.

Тези точки не се попълват по предположение.

Те не блокират текущия screen-by-screen community prototype contract. Services UI/flow също не е текущ blocker, защото е изрично отложен до future Services етап.

## 8. Legacy поведение, което не управлява новите решения

Текущият код съдържа историческо поведение, което трябва да се проверява, но не е продуктов source of truth:

- magic-link като основен auth;
- `age >= 14`;
- свободен текст `travel_status`;
- суровото име/семантика `willing_to_help`, когато се представя по-широко от одобрения Community Guidance contract;
- широк public browse на хора;
- стари CTA текстове;
- стари профилни форми и navigation.

Одобрените Master/State contracts имат предимство.

## 9. Задължение за поддръжка

Когато Owner одобри нова функция или промени съществуваща:

1. актуализира се Master;
2. актуализира се `PROJECT_STATE.md`, ако се променя checkpoint/NEXT;
3. актуализира се този dependency map;
4. проверяват се зависимите функции и user states;
5. едва след това се преминава към следващо решение или implementation.

Не се разчита на паметта на текущия чат.
