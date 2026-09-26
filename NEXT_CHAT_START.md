# NEXT CHAT START — „Родени в Лом“

**Дата на handoff:** 26.09.2026  
**Роля на този файл:** кратък вход за следващ чат.  
**НЕ е отделен source of truth.** При конфликт важат `START_HERE.md`, `PROJECT_STATE.md`, `PRODUCT_FUNCTION_DEPENDENCY_MAP.md` и Master.

## Задължително начало

Новият чат трябва да прочете, в този ред:

1. `START_HERE.md`
2. `PROJECT_STATE.md`
3. `WORK_CONTROLLER_HANDOFF.md`
4. `PRODUCT_FUNCTION_DEPENDENCY_MAP.md`
5. Master §115 и релевантните §§67, 70, 75, 82, 87, 112, 114

Не започвай проекта отначало.

## Текущ стратегически checkpoint

Master §115 — **Municipality Community Graph**.

За България:

- **community membership = canonical община**;
- **exact Root = точно canonical населено място вътре в общността**;
- normal people discovery: **exact Root → same municipality → силна друга причина**;
- при active need / Travel / конкретен момент човешката релевантност може да е по-важна от exact Root;
- municipality membership НЕ означава автоматично person display;
- Visibility / `open_to_strangers` / block / decline / safety остават задължителни;
- public exact `0–4` може да broadens само към canonical municipality aggregate, ако той самостоятелно покрива privacy threshold;
- locality→municipality идва от versioned official mapping, не от ръчни групи;
- frozen `lomGroup` и `Лом и региона` са demo/historical, не canonical geography;
- националното име на продукта остава **OPEN**;
- `Родени в Лом` не е заключено като националното име на целия продукт.

## Какво вече е проверено

### Live сайтът

Историческият live продукт вече съдържа полезни механизми/сигнали:
- settlement;
- current city/country;
- school;
- profession;
- willingness to help/guidance precursor;
- Travel;
- connection requests;
- accepted connections;
- private chat.

Тези механизми могат да захранят R.E., но старият broad public people browsing НЕ се връща.

### Frozen Screen 1 prototype

Пази се:
- map-first entry;
- Current → Root;
- canonical-vs-draft boundary;
- privacy-safe aggregate;
- Context Bridge;
- error/recovery/mobile/map interaction work.

НЕ се канонизира:
- hardcoded `lomGroup`;
- размитото `Лом и региона`;
- demo география.

Frozen prototype не се пипа без ново Owner approval.

## CURRENT NEXT

**Community Identity Naming Contract**

Цел:

да се намери един човешки и национално мащабируем начин за показване на:

**municipality community + exact Root**

без:
- хиляди отделни „Родени в [село]“ общности;
- загуба на exact locality;
- механично `Родени в + municipality_name`;
- объркване между local community identity и националния brand;
- dynamic full-site rebrand.

Задължително тествай поне:
- Лом / Ковачица;
- Лом / Трайково;
- Враца / населено място от общината;
- Столична община / София;
- община с неудобно/нечовешко display име.

После дай:

**ЕДНО най-добро конкретно предложение → рискове → Criteria Check → Owner approval.**

## Забрани до Owner approval

- няма prototype implementation;
- няма live/production промяна;
- няма Supabase/DB/schema промяна;
- няма EKATTE import;
- няма нов национален brand;
- няма автоматично `Родени в [Root]` rebrand;
- няма public people directory;
- няма финално записване на Naming Contract преди Owner approval.

## Как да разбереш, че си тръгнал в грешна посока

Спри, ако започнеш да:
- правиш код преди Naming Contract;
- третираш всяко село като отделна community;
- губиш exact Root;
- приемаш same municipality като достатъчно основание за показване на произволен stranger;
- използваш frozen demo geography като source of truth;
- решаваш националното име без отделно Owner решение;
- връщаш стария Screen 1 NEXT преди §115/naming dependency да е затворена.
