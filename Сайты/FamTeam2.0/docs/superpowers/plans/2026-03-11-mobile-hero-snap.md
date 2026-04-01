# Mobile Hero Snap 1=1 Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** На мобильных устройствах (≤768px) хиро-секция снапится как единый блок (1 экран = 1 скролл), все остальные секции остаются с обычным скроллом.

**Architecture:** Два CSS snap-point — верх и низ хиро — через `scroll-snap-type: y mandatory` на контейнере и нулевой anchor-div после `<HeroSection />`. После anchor-а snap-point'ов нет, дальше свободный скролл.

**Tech Stack:** React 18, Vite, Tailwind CSS, CSS Scroll Snap API

**Spec:** `docs/superpowers/specs/2026-03-11-mobile-hero-snap-design.md`

---

## Затрагиваемые файлы

| Файл | Действие | Что меняем |
|------|----------|------------|
| `src/index.css` | Modify | 1) `scroll-snap-type: none` → `y mandatory` в `@media (max-width: 768px)`; 2) добавить `.mobile-hero-snap-anchor` и `scroll-snap-stop: always` на `.hero-page` |
| `src/pages/Index.tsx` | Modify | Добавить `<div aria-hidden="true" className="mobile-hero-snap-anchor" />` между `<HeroSection />` и `<VisionMissionSection />` |

Никаких новых файлов. Никаких изменений в других секциях.

---

## Chunk 1: CSS changes + DOM anchor

### Task 1: Re-enable scroll-snap на мобильном

**Files:**
- Modify: `src/index.css` — блок `@media (max-width: 768px)`

Текущий код (строка ~1364):
```css
/* Disable scroll-snap on mobile — natural scrolling */
.snap-scroll {
  scroll-snap-type: none;
}
```

- [ ] **Step 1: Изменить `scroll-snap-type` в мобильном media query**

Найти в `src/index.css` в блоке `@media (max-width: 768px)` правило `.snap-scroll { scroll-snap-type: none; }` и заменить значение:

```css
/* Hero-only snap on mobile — mandatory so hero snaps, anchor releases it */
.snap-scroll {
  scroll-snap-type: y mandatory;
}
```

Комментарий тоже заменить как показано выше.

- [ ] **Step 2: Убедиться что `.snap-page` на мобильном имеет `scroll-snap-align: none`**

В том же блоке `@media (max-width: 768px)` найти `.snap-page`:
```css
.snap-page {
  scroll-snap-align: none;
  height: auto;
  min-height: 100vh;
  max-height: none;
  overflow: visible;
}
```
Если `scroll-snap-align: none` уже присутствует — ничего не делать. Это гарантирует, что все секции кроме хиро не являются snap-point'ами.

---

### Task 2: Добавить CSS-класс для anchor + snap-stop на hero

**Files:**
- Modify: `src/index.css` — добавить новый блок после блока `@media (max-width: 768px)`

- [ ] **Step 3: Добавить класс `.mobile-hero-snap-anchor` и `scroll-snap-stop` на `.hero-page`**

В конец блока `@media (max-width: 768px)` (перед закрывающей `}`) добавить:

```css
  /* Anchor: zero-height snap point at the bottom edge of hero.
     With mandatory snap, user snaps to either hero-top (scrollTop:0)
     or this anchor (scrollTop: heroHeight). After anchor, no more
     snap points — natural scroll resumes. */
  .mobile-hero-snap-anchor {
    display: block;
    height: 0;
    scroll-snap-align: start;
  }

  /* Prevent fast fling from skipping the hero snap point entirely. */
  .hero-page {
    scroll-snap-stop: always;
  }
```

И вне media query (в корневых стилях, например после `.hero-page` десктопных правил) добавить:

```css
/* Hidden on desktop — only activates inside @media (max-width: 768px) */
.mobile-hero-snap-anchor {
  display: none;
}
```

> **Важно:** Правило `display: none` вне media query — это дефолт для десктопа. Правило `display: block` внутри `@media (max-width: 768px)` переопределяет его только на мобильном.

---

### Task 3: Добавить anchor-div в JSX

**Files:**
- Modify: `src/pages/Index.tsx`

Текущий код (~строки 16-17):
```tsx
<HeroSection />
<VisionMissionSection />
```

- [ ] **Step 4: Вставить нулевой anchor-div между HeroSection и VisionMissionSection**

```tsx
<HeroSection />
<div aria-hidden="true" className="mobile-hero-snap-anchor" />
<VisionMissionSection />
```

Anchor должен быть **строго между** HeroSection и VisionMissionSection, без лишних элементов между ними.

---

### Task 4: Запустить dev-сервер и проверить вручную

- [ ] **Step 5: Запустить dev-сервер**

```bash
npm run dev
```

Открыть `http://localhost:5173` в браузере.

- [ ] **Step 6: Проверить мобильный viewport (DevTools → 375×812)**

Переключить DevTools в мобильный viewport 375×812 (iPhone SE) и проверить:

| Проверка | Ожидаемый результат |
|----------|---------------------|
| Страница загружается | Хиро занимает ровно 1 экран, нет видимого контента ниже |
| Медленный скролл вниз на ≤50% хиро, отпустить | Снапится обратно к верху хиро |
| Медленный скролл вниз на >50% хиро, отпустить | Снапится вниз, видна VisionMission |
| Быстрый fling-скролл вниз | Не перепрыгивает хиро, снапится к anchor |
| После хиро скроллить дальше | Свободный скролл, без snap для остальных секций |
| Переключить на десктоп viewport (1280×800) | Все секции снапятся как прежде |

- [ ] **Step 7: Проверить десктоп — нет регрессии**

Переключить DevTools на десктоп viewport 1280×800 и убедиться:
- Все секции по-прежнему снапятся (scroll-snap работает как раньше)
- `.mobile-hero-snap-anchor` не виден, не влияет на layout (`display: none` на десктопе)

---

### Task 5: Проверить build

- [ ] **Step 8: Убедиться что TypeScript/CSS сборка проходит без ошибок**

```bash
npm run build
```

Ожидаемый вывод: `✓ built in X.XXs` без ошибок. Если есть ошибки TypeScript — исправить до коммита.

---

### Task 6: Коммит

- [ ] **Step 9: Создать коммит с изменениями**

```bash
git add src/index.css src/pages/Index.tsx
git commit -m "feat: mobile hero snap 1=1 via CSS mandatory snap + anchor div"
```

---

## Финальный чеклист

- [ ] `src/index.css`: `scroll-snap-type: none` → `y mandatory` в `@media (max-width: 768px)`
- [ ] `src/index.css`: `.mobile-hero-snap-anchor` добавлен (display:none вне query, display:block + snap внутри)
- [ ] `src/index.css`: `scroll-snap-stop: always` добавлен на `.hero-page` в `@media (max-width: 768px)`
- [ ] `src/pages/Index.tsx`: anchor-div вставлен между `<HeroSection />` и `<VisionMissionSection />`
- [ ] Dev-сервер проверен: snap работает на мобильном, нет регрессий на десктопе
- [ ] Build проходит без ошибок
