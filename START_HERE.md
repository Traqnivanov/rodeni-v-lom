# START HERE — „Родени в Лом“

**ТОВА Е ЕДИНСТВЕНИЯТ ЗАДЪЛЖИТЕЛЕН ПЪРВИ ФАЙЛ ЗА ВСЕКИ НОВ ЧАТ / AI / РАЗРАБОТЧИК.**

Ако четеш само един файл в началото — чети този.

## 1. Проект

Repo: `Traqnivanov/rodeni-v-lom`  
Branch: `main`  
Supabase: `mqilvavuzbsscsfhtuub`

**НИКОГА не смесвай с „Попитай.Лом“**:
Supabase на Popitai: `dfhukfnuxkynjlxcprbc`.

Собственикът на „Родени в Лом“ е **Admin/Owner — най-високата роля**.
Moderator е бъдеща по-ниска оперативна роля.

## 2. Задължителен работен режим

За нова логика, UX, механизъм, роли, security, DB, matching, Admin flow:

**одит → конкретно предложение → изрично одобрение от Admin/Owner → implementation → verification → актуализация на документацията**

Не започвай implementation преди изрично одобрение.

Дребни текстови/CSS поправки и очевидни bug fixes без промяна в логика могат да се правят без отделно продуктово решение.

## 3. Какво да прочетеш след този файл

**ВИНАГИ:** отвори `PROJECT_STATE.md`.  
Той казва къде сме точно сега и съдържа **NEXT EXACT STEP**.

След това чети само според задачата:

- продуктова логика / Context Engine / UX / профили / matching / услуги → релевантната секция в `PRODUCT_MASTER_VISION_AUDIT.md`;
- код / текуща архитектура / ограничения / Supabase правила → релевантната секция в `CLAUDE.md`;
- auth / roles / Admin → секциите 43–46 в Master + актуалния Supabase/code state;
- security / DB / RLS → първо реалното Supabase състояние, после релевантното правило;
- малък локален bug → не чети целия Master; провери само засегнатия код + `PROJECT_STATE.md`.

**Не чети целия Master по подразбиране.**
**Не чети всички стари документи „за всеки случай“.**

## 4. Source of Truth — без противоречия

Ако важно старо решение се променя, не оставяй старото правило активно.

В същия етап:
1. актуализирай каноничния документ;
2. запиши дата;
3. запиши „Одобрено от: Admin/Owner“;
4. посочи какво старо решение заменя;
5. запиши новото актуално решение;
6. запиши статус: предложено / одобрено / реализирано / проверено;
7. при реализация добави commit/migration/ref.

Ако кодът и каноничното правило си противоречат:
**СПРИ. Не гадай. Докладвай конфликта преди промяна.**

## 5. Какво НЕ се записва в Master/State

Не добавяй отделни записи за:
- typo;
- дребен CSS;
- padding/spacing;
- малка текстова промяна;
- локален refactor без промяна на поведение;
- дребен bug fix.

Тези промени остават в Git history.

Няколко малки промени се групират и при край на смислен етап се прави **един checkpoint** в `PROJECT_STATE.md`.

## 6. Какво ЗАДЪЛЖИТЕЛНО се записва

Веднага актуализирай source of truth, ако има:
- ново или променено одобрено продуктово правило;
- промяна на роли/права;
- security/privacy/safety решение;
- schema/RLS/database промяна;
- промяна на основен user flow;
- промяна на Context Engine / Opportunity contract;
- промяна на Admin/Owner workflow;
- завършен значим етап;
- нов критичен риск;
- нов NEXT EXACT STEP.

## 7. Текуща посока

Не започваме нов сайт и не изхвърляме построеното.

Запазват се:
- world map / country discovery;
- текущият Supabase проект;
- registrations baseline;
- photo upload;
- settlement / city / school / profession;
- willing_to_help / open_to_strangers / travel_status;
- connections / blocking;
- accepted private chat;
- lightweight HTML/CSS/JS + Supabase.

Новият слой е:
**Context Engine + Opportunity model + progressive onboarding + Admin/Owner Operations.**

## 8. Текущи P0 отворени решения

- точна Admin/Owner role matrix;
- ordinary-user auth model;
- safety/minor launch rule;
- security remediation plan;
- Context Engine / Opportunity contract;
- User Context Engine ↔ Admin/Owner Operations Engine.

## 9. NEXT

След като прочетеш `PROJECT_STATE.md`, продължи от неговия **NEXT EXACT STEP**.

Не започвай общ одит отначало, освен ако има конкретен конфликт, нов риск или изрично искане от Admin/Owner.
