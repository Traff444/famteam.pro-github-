---
тип: план
дата: 2026-03-27
статус: на будущее
связано: serverSupport.by, Продуктолог, все проекты
---

# Интеграция Claude Code + OpenClaw

## Архитектура: два слоя

```
┌─────────────────────────────────────────────┐
│  Mac (Claude Code)                          │
│  • Разработка, код, деплой                  │
│  • Obsidian vault (единый источник правды)  │
│  • Superpowers, gstack, скиллы              │
│  • Работает когда ты за компом              │
└──────────────┬──────────────────────────────┘
               │ sync (git / rsync / webhook)
┌──────────────▼──────────────────────────────┐
│  Сервер (OpenClaw) — 24/7                   │
│  • Telegram / WhatsApp — всегда онлайн      │
│  • Heartbeat мониторинг каждые 10 мин       │
│  • Cron задачи (отчёты, напоминания)        │
│  • Webhooks (PayPal, GitHub, внешние)       │
│  • Голосовые звонки (voice-call plugin)     │
│  • Multi-agent (Продуктолог, Поддержка...)  │
└─────────────────────────────────────────────┘
```

## Фаза 1: Продуктолог на OpenClaw (после Telegram-бота)

**Цель:** Продуктолог доступен 24/7 через Telegram

**Что делаем:**
1. Создать агента "Продуктолог" на OpenClaw
2. Перенести Роль.md → личность агента
3. Перенести Память.md → MEMORY.md агента
4. Настроить heartbeat: проверка канбана каждые 10 мин
5. Привязать к Telegram-чату
6. Sync vault ↔ сервер (git push/pull или rsync)

**Результат:** пишешь в Telegram "что с Genealogy?" → ответ через 10 сек, даже если Mac выключен

## Фаза 2: Multi-agent для serverSupport.by

**Цель:** разные агенты на разные задачи клиентов

| Агент | Канал | Задача |
|-------|-------|--------|
| Поддержка | Telegram-группа клиента | Ответы на вопросы, тикеты |
| Продавец | Исходящие звонки | Холодные звонки, назначение встреч |
| Рецепционист | Входящие звонки | Приём звонков, маршрутизация |
| Напоминалка | SMS / Telegram | Напоминания о записях, доставках |

**Стек:**
- OpenClaw multi-agent (binding rules по чатам)
- ElevenLabs (голос)
- voice-call plugin или ClawdTalk (телефония)

## Фаза 3: Webhooks для Genealogy

**Цель:** автоматические реакции на события

| Событие | Webhook | Действие |
|---------|---------|----------|
| Оплата $5 (PayPal IPN) | → OpenClaw | Запустить генерацию отчёта |
| Отчёт готов | → Telegram | Уведомить клиента |
| Новый отзыв | → OpenClaw | Проанализировать тональность |
| GitHub push | → OpenClaw | Уведомить Сергея |

## Фаза 4: Голосовой AI-продавец

**Цель:** AI обзванивает клиентов serverSupport.by

- См. отдельную идею: [[AI голосовой агент - исходящие звонки]]
- OpenClaw voice-call plugin + ElevenLabs + CRM tools

## Синхронизация vault ↔ сервер

### Вариант A: Git (простой)
```bash
# На сервере, cron каждые 5 мин:
cd /path/to/vault && git pull origin main
# После изменений агентом:
git add -A && git commit -m "openclaw: update" && git push
```

### Вариант B: Rsync (быстрый)
```bash
rsync -avz --delete user@server:/openclaw/memory/ ./FamTeam.vault/Агенты/
```

### Вариант C: Webhook (реактивный)
- OpenClaw hook on session end → POST в Claude Code
- Claude Code hook on vault change → POST в OpenClaw

## Юзкейсы из awesome-openclaw-usecases

> Источник: https://github.com/hesamsheikh/awesome-openclaw-usecases

### Быстрые победы
- **Morning Brief** — ежедневный дайджест в Telegram от Продуктолога (задачи, статус, рекомендации)
- **Self-Healing Server** — агент мониторит серверы через SSH + cron, автофикс
- **Semantic Memory Search** — векторный поиск по vault markdown файлам

### На потом
- **STATE.yaml Pattern** — параллельные подагенты без тяжёлого оркестратора
- **Event Guest Confirmation** — обзвон списка людей, сбор ответов
- **Pre-Build Idea Validator** — проверка идеи через GitHub/HN/ProductHunt перед разработкой
- **Personal CRM** — автообнаружение контактов из email/календаря
- **DenchClaw Local CRM** — локальный CRM на DuckDB + NL-запросы
- **Content Factory** — мульти-агент: ресёрч → текст → визуал по каналам
- **Dynamic Dashboard** — real-time дашборд с параллельными API-запросами

## Ресурсы

- OpenClaw курс: https://openclaw-course.pages.dev/ru/
- Наш сервер: уже есть, OpenClaw установлен
- ElevenLabs: проект serverSupport.by
- Hetzner VPS: ~$5/мес

## Приоритет

```
Сейчас:   Genealogy MVP (7 задач на канбане)
Потом:    Telegram-бот + Фаза 1 (Продуктолог 24/7)
Дальше:   Фаза 2-3 (multi-agent, webhooks)
Когда-то: Фаза 4 (голосовой продавец)
```
