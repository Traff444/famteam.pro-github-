# AI Video Generator — Design Spec

## Overview

AI-инструмент для автоматической генерации product explainer видео (1-2 мин).
Пользователь описывает продукт текстом или даёт URL — система генерирует сценарий,
создаёт визуальные ассеты через AI, собирает анимированное видео и рендерит в MP4.

**Подход:** Remotion (React → Video) + AI Video API (Runway/Kling) для фонов и клипов.

**Аудитория:** Сначала внутренний инструмент FamTeam (для AI Менеджер, Аналитик, Сейлз),
затем масштабирование в отдельный SaaS-продукт.

**Референс:** [Omnidesk by Interativa AI](https://www.youtube.com/watch?v=6O80Wnht0ek) —
2-минутный animated explainer с закадровым голосом, музыкой и демонстрацией функций.

---

## Architecture

Система из 4 модулей:

```
┌──────────────────────────────────────────────────┐
│  1. SCRIPT ENGINE (Claude API)                   │
│  Вход: текст о продукте / URL сайта              │
│  Выход: JSON сценарий (сцены, тексты, тайминги)  │
└──────────────┬───────────────────────────────────┘
               ▼
┌──────────────────────────────────────────────────┐
│  2. ASSET GENERATOR                              │
│  • AI Video API (Runway/Kling) → фоны, клипы     │
│  • AI Image API → иллюстрации, иконки            │
│  • TTS API (опц.) → голос диктора                │
└──────────────┬───────────────────────────────────┘
               ▼
┌──────────────────────────────────────────────────┐
│  3. COMPOSITION ENGINE (Remotion)                │
│  • React-компоненты сцен (Hero, Features, CTA)   │
│  • Тайминг и переходы                            │
│  • Наложение текста, анимаций на AI-клипы         │
│  • Предпросмотр в браузере                       │
└──────────────┬───────────────────────────────────┘
               ▼
┌──────────────────────────────────────────────────┐
│  4. RENDER PIPELINE                              │
│  Remotion CLI → FFmpeg → MP4 (1080p/4K)          │
│  + аудио-микс (TTS + музыка)                     │
└──────────────────────────────────────────────────┘
```

### Workflow пользователя

1. Описывает продукт текстом (или даёт URL)
2. AI генерирует сценарий → пользователь ревьюит/правит
3. Система генерирует ассеты (AI-видео для фонов, TTS)
4. Remotion собирает всё в композицию → предпросмотр
5. Рендер в финальный MP4

---

## Module 1: Script Engine (Claude API)

### Input

Один из вариантов:
- **Свободный текст**: описание продукта, фичи, целевая аудитория
- **URL сайта**: парсим страницу, извлекаем контент
- **JSON**: структурированные данные о продукте

### Output — JSON-сценарий

```json
{
  "meta": {
    "title": "AI Менеджер — FamTeam",
    "duration": 90,
    "style": "modern-tech",
    "palette": ["#F0642B", "#1a1a1a", "#ffffff"]
  },
  "scenes": [
    {
      "id": "hook",
      "type": "hero",
      "duration": 8,
      "narration": "Представьте: ваш бизнес работает 24/7...",
      "visual": "ai-generated-clip",
      "visualPrompt": "futuristic office with glowing AI interface",
      "textOverlay": "AI МЕНЕДЖЕР",
      "transition": "fade"
    },
    {
      "id": "problem",
      "type": "problem-statement",
      "duration": 10,
      "narration": "Клиенты пишут в мессенджеры...",
      "visual": "template",
      "templateId": "split-screen-icons",
      "data": { "icons": ["whatsapp", "telegram", "email"] }
    }
  ],
  "audio": {
    "tts": { "voice": "alloy", "speed": 1.0 },
    "music": { "mood": "uplifting-tech", "volume": 0.15 }
  }
}
```

### Scene Types (начальный набор)

| Type | Описание | Визуал |
|------|----------|--------|
| `hero` | Заглавная сцена с крупным текстом | AI-клип фон + оверлей |
| `problem-statement` | Описание проблемы | Иконки + анимированный текст |
| `features` | Карточки фич (1-4 шт) | Иконки с появлением |
| `demo` | Скриншот/видео продукта | Mockup-фрейм |
| `stats` | Цифры и метрики | Animated counters |
| `testimonial` | Цитата клиента | Аватар + текст |
| `cta` | Призыв к действию | Логотип + контакты |

### Claude System Prompt

Claude получает system prompt с:
- Описанием каждого типа сцены и его JSON-схемой
- Правилами нарратива (hook → problem → solution → proof → cta)
- Ограничениями по длительности (1-2 мин, 7-12 сцен)
- Инструкциями по генерации промптов для AI Video

---

## Module 2: Asset Generator

### AI Video (фоны и клипы)

- **API**: Runway Gen-3 / Kling / Minimax — выбор через конфиг
- **Когда**: сцены с `"visual": "ai-generated-clip"`
- **Промпт**: из `visualPrompt` в сценарии
- **Выход**: 5-10 сек клипы, 1080p, без звука
- **Fallback**: если генерация не удалась → шаблонный фон (градиент + анимация частиц)

### AI Images (иллюстрации)

- **API**: DALL-E 3 / Flux через Replicate
- **Когда**: нужна конкретная иллюстрация, которой нет в библиотеке
- **Стиль**: согласуется с палитрой видео (передаём в промпт)

### TTS (опционально)

- **API**: OpenAI TTS (alloy/nova/shimmer) или ElevenLabs
- **Вход**: текст `narration` из каждой сцены
- **Выход**: аудиофайл + word-level timestamps (для синхронизации субтитров)
- **Если TTS выключен**: видео без голоса, только музыка + текст на экране

### Кеширование и стоимость

- Все ассеты кешируются локально по hash промпта
- Повторная генерация не тратит API-кредиты
- Оценка стоимости на 90-сек видео:
  - AI Video: ~$2-5 (5-8 клипов)
  - TTS: ~$0.05
  - Images: ~$0.5-1
  - **Итого: ~$3-7 за видео**

### Параллельная генерация

Все ассеты генерируются через `Promise.all` с progress-баром.
Если один ассет провалился — fallback, видео всё равно собирается.

---

## Module 3: Composition Engine (Remotion)

### Структура проекта

```
src/video/
├── compositions/
│   └── ExplainerVideo.tsx      # Главная композиция
├── scenes/
│   ├── HeroScene.tsx           # Заглавная + AI-фон
│   ├── ProblemScene.tsx        # Проблема с иконками
│   ├── FeaturesScene.tsx       # Карточки фич
│   ├── DemoScene.tsx           # Скриншот продукта
│   ├── StatsScene.tsx          # Цифры с анимацией
│   ├── TestimonialScene.tsx    # Цитата клиента
│   └── CTAScene.tsx            # Финальный призыв
├── components/
│   ├── AnimatedText.tsx        # Появление текста по словам
│   ├── IconGrid.tsx            # Сетка иконок с анимацией
│   ├── ProgressBar.tsx         # Шкала прогресса
│   ├── LogoWatermark.tsx       # Логотип в углу
│   └── TransitionOverlay.tsx   # Переходы между сценами
├── hooks/
│   ├── useAudioSync.ts         # Синхронизация с TTS
│   └── useSceneTimeline.ts     # JSON → Remotion таймлайн
├── styles/
│   └── themes.ts               # Палитры и стили
└── utils/
    └── scenarioParser.ts       # JSON-сценарий → Remotion-пропсы
```

### Ключевые решения

1. **Каждая сцена — React-компонент** с props из JSON. Remotion `<Sequence>` управляет таймингом.
2. **AI-клипы как фоны**: `<OffthreadVideo>` рендерит AI-видео, поверх — текст и анимации.
3. **Анимации**: Remotion `useCurrentFrame()` + `interpolate()`. Без внешних библиотек.
4. **Предпросмотр**: Remotion Studio / `@remotion/player` — видео в браузере до рендера.
5. **Музыка**: встроенная библиотека royalty-free треков. Автомикс с TTS (ducking).

---

## Module 4: Render Pipeline

- **Рендер**: Remotion CLI (`npx remotion render`) → MP4 через FFmpeg
- **Разрешение**: 1920x1080 по умолчанию, опция 4K
- **Codec**: H.264 для совместимости, опция VP9/WebM
- **Время рендера**: ~2-5 мин на 90-сек видео
- **Аудио-микс**: TTS + музыка через FFmpeg фильтры (ducking, fade in/out)

---

## UI (веб-интерфейс)

4 шага:

1. **Ввод** — textarea для описания продукта или URL, выбор стиля и опций
2. **Сценарий** — список сцен с drag-and-drop, редактирование текста/типов
3. **Генерация** — progress-бар с состоянием каждого ассета
4. **Предпросмотр и экспорт** — видеоплеер + кнопка скачивания MP4

### Технологии

- React + TypeScript + Tailwind + shadcn/ui (стек FamTeam)
- Отдельный проект (monorepo или standalone)
- `@remotion/player` для предпросмотра в UI

---

## Phased Delivery

### Фаза 1 — MVP
- Script Engine (Claude API → JSON-сценарий)
- 3 базовых сцены: Hero, Features, CTA
- Шаблонные фоны (без AI Video)
- CLI для рендера
- **Результат**: генерируем простые explainer из текста

### Фаза 2 — AI Assets
- Подключение AI Video API (Runway/Kling) для фонов
- Добавление сцен: Problem, Demo, Stats, Testimonial
- TTS через OpenAI/ElevenLabs
- Кеширование ассетов

### Фаза 3 — UI
- Веб-интерфейс с 4 шагами
- Редактор сценария (drag-and-drop)
- Предпросмотр через @remotion/player
- Управление стилями и палитрами

### Фаза 4 — Polish
- Библиотека стилей (5+ тем)
- Библиотека музыки по настроениям
- Субтитры с word-level синхронизацией
- 4K рендер
- Batch-генерация (несколько видео за раз)
- Интеграция с FamTeam сайтом

---

## Tech Stack

| Компонент | Технология |
|-----------|-----------|
| Script Engine | Claude API (Anthropic SDK) |
| AI Video | Runway Gen-3 / Kling API |
| AI Images | DALL-E 3 / Flux (Replicate) |
| TTS | OpenAI TTS / ElevenLabs |
| Video Composition | Remotion 4.x |
| Video Render | FFmpeg (через Remotion CLI) |
| UI Frontend | React + TypeScript + Tailwind + shadcn/ui |
| Backend | Node.js (API routes для генерации) |
| Кеширование | Filesystem (hash-based) |

---

## Schema Validation (Script Engine Output)

Claude API возвращает JSON, который управляет всей pipeline. Валидация обязательна.

### Zod-схема сценария

```typescript
import { z } from 'zod';

const SceneType = z.enum([
  'hero', 'problem-statement', 'features', 'demo',
  'stats', 'testimonial', 'cta'
]);

const VisualType = z.enum(['ai-generated-clip', 'template', 'image', 'screenshot']);
const TransitionType = z.enum(['fade', 'slide', 'zoom', 'cut', 'wipe']);

const SceneSchema = z.object({
  id: z.string().min(1),
  type: SceneType,
  duration: z.number().min(3).max(30),
  narration: z.string().optional(),
  visual: VisualType,
  visualPrompt: z.string().optional(),
  templateId: z.string().optional(),
  textOverlay: z.string().optional(),
  transition: TransitionType.default('fade'),
  data: z.record(z.unknown()).optional(),
});

const ScenarioSchema = z.object({
  meta: z.object({
    title: z.string(),
    duration: z.number().min(30).max(180),
    style: z.string(),
    palette: z.array(z.string().regex(/^#[0-9a-fA-F]{6}$/)).min(2).max(5),
    language: z.string().default('ru'),
    aspectRatio: z.enum(['16:9', '9:16', '1:1', '4:5']).default('16:9'),
  }),
  scenes: z.array(SceneSchema).min(3).max(15),
  audio: z.object({
    tts: z.object({
      voice: z.string(),
      speed: z.number().min(0.5).max(2.0),
    }).optional(),
    music: z.object({
      mood: z.string(),
      volume: z.number().min(0).max(1),
    }),
  }),
});
```

### Structured Output Loop

Claude API вызывается с tool use / structured output, привязанным к Zod-схеме.
Если валидация провалилась — автоматический retry (до 3 раз) с ошибками валидации в промпте.

---

## Interface Contracts

TypeScript-интерфейсы между модулями:

```typescript
// Module 1 → Module 2
interface ScriptEngineOutput {
  scenario: z.infer<typeof ScenarioSchema>;
  rawInput: string;
  generatedAt: string;
}

// Module 2 → Module 3
interface AssetManifest {
  sceneAssets: Record<string, {
    videoPath?: string;
    imagePath?: string;
    status: 'ready' | 'fallback' | 'failed';
  }>;
  ttsAssets?: Record<string, {
    audioPath: string;
    wordTimestamps: Array<{ word: string; start: number; end: number }>;
  }>;
  musicPath?: string;
}

// Module 3 → Module 4
interface CompositionConfig {
  scenario: ScriptEngineOutput['scenario'];
  assets: AssetManifest;
  compositionId: string;
  fps: number;
  width: number;
  height: number;
  durationInFrames: number;
}

// Module 4 → User
interface RenderResult {
  outputPath: string;
  duration: number;
  resolution: string;
  fileSize: number;
  codec: string;
}
```

---

## Job State Machine

Pipeline с персистентным состоянием для recovery:

```
DRAFT → SCRIPT_GENERATING → SCRIPT_READY → ASSETS_GENERATING → ASSETS_READY
                                                    ↓
                                            PARTIALLY_FAILED
                                            (fallbacks applied)
                                                    ↓
         DONE ← RENDERING ← COMPOSING ← ASSETS_READY
```

### Хранение состояния

- **Фаза 1 (MVP):** JSON-файл на диск (`jobs/{jobId}/state.json`)
- **Фаза 3+ (SaaS):** SQLite → PostgreSQL

```typescript
interface JobState {
  id: string;
  status: JobStatus;
  input: string;
  scenario?: ScriptEngineOutput;
  assets?: AssetManifest;
  renderResult?: RenderResult;
  error?: string;
  createdAt: string;
  updatedAt: string;
}
```

Если процесс прервался — при перезапуске подхватываем с последнего успешного состояния.
Сгенерированные ассеты уже на диске — повторная генерация не нужна.

---

## Security

### API Key Management

- **Фаза 1:** `.env.local` (gitignored), переменные окружения
- **Фаза 3+ (SaaS):** Secret manager (Vault / AWS Secrets Manager / Infisical)
- Ключи никогда не попадают на клиент — все API-вызовы через серверные routes

### Необходимые ключи

| Переменная | Сервис | Обязательность |
|-----------|--------|---------------|
| `ANTHROPIC_API_KEY` | Claude API | Обязательно |
| `RUNWAY_API_KEY` | Runway Gen-3 | Фаза 2 |
| `REPLICATE_API_TOKEN` | Flux images | Фаза 2 |
| `OPENAI_API_KEY` | TTS + DALL-E | Опционально |
| `ELEVENLABS_API_KEY` | ElevenLabs TTS | Опционально |

### Rate Limiting и Cost Control

- Per-API concurrency limits через `p-queue`:
  - Claude: 5 concurrent
  - Runway: 2 concurrent (API limit)
  - OpenAI: 10 concurrent
- Exponential backoff с jitter для retries (max 3 attempts)
- Daily spending cap: настраивается в конфиге (default $50/day)
- Per-video cost tracking: логируем стоимость каждого API-вызова

### Content Moderation (Фаза 3+)

При переходе к SaaS — входной текст проверяется Claude на policy violations
перед отправкой в генеративные API (Runway/DALL-E). Промпты с нарушениями отклоняются.

---

## URL Parsing

Для входа через URL сайта:

- **Инструмент**: Jina Reader API (`https://r.jina.ai/{url}`) — конвертирует веб-страницу в Markdown
- **Fallback**: Playwright headless browser для SPA-страниц
- **Лимит контента**: максимум 10,000 токенов перед отправкой в Claude
- **Если парсинг не удался**: запрашиваем у пользователя текстовое описание вместо URL

---

## Data Model

Минимальная модель данных (с Фазы 1 — JSON файлы, с Фазы 3 — БД):

```typescript
interface Project {
  id: string;
  title: string;
  inputText: string;
  inputUrl?: string;
  style: string;
  language: string;
  aspectRatio: string;
  createdAt: string;
}

interface Scenario {
  id: string;
  projectId: string;
  data: ScriptEngineOutput;
  version: number;
  createdAt: string;
}

interface Asset {
  id: string;
  scenarioId: string;
  sceneId: string;
  type: 'video' | 'image' | 'tts' | 'music';
  promptHash: string;
  filePath: string;
  status: 'generating' | 'ready' | 'failed';
  apiCost?: number;
}

interface RenderJob {
  id: string;
  scenarioId: string;
  status: JobStatus;
  outputPath?: string;
  startedAt: string;
  completedAt?: string;
  renderTimeMs?: number;
}
```

---

## Telemetry (Basic Logging)

С Фазы 1 — базовые события для отслеживания качества и стоимости:

```typescript
type EventType =
  | 'generation_started'
  | 'script_generated'
  | 'asset_generated'
  | 'asset_failed'
  | 'render_started'
  | 'render_completed'
  | 'render_failed'
  | 'api_cost_incurred';
```

Логи пишутся в `jobs/{jobId}/events.jsonl`. В SaaS-фазе — в аналитику.

---

## Aspect Ratios

Первоклассный параметр в `meta.aspectRatio`:

| Формат | Размер | Применение |
|--------|--------|-----------|
| `16:9` | 1920×1080 | YouTube, сайт (default) |
| `9:16` | 1080×1920 | Stories, Reels, TikTok |
| `1:1` | 1080×1080 | Instagram feed |
| `4:5` | 1080×1350 | Instagram, Facebook |

Scene-компоненты адаптируются к aspect ratio через responsive props.
AI Video промпты включают формат в запрос.

---

## Music Licensing

**Решение для Фазы 1-2:** Pixabay Music (CC0, бесплатно, коммерческое использование).
**Фаза 3+ (SaaS):** Epidemic Sound или Artlist (подписка, полная коммерческая лицензия).
**Опция:** AI-генерация музыки (Suno/Udio) — использовать с осторожностью, правовой статус не определён.

---

## Open Questions

1. **Отдельный репозиторий или внутри famteam-ai-staff-architects?** — Рекомендую отдельный, т.к. разный деплой.
2. **Какой AI Video API использовать первым?** — Runway Gen-3 самый стабильный, но дороже. Kling дешевле.
3. **Хостинг рендера**: локальный (CLI) vs облачный (Remotion Lambda). MVP — локальный, SaaS — Lambda.
4. **Мультиязычность TTS**: какие языки поддерживать кроме русского? Английский минимум.
