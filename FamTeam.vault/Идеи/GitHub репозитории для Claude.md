---
тип: идея
дата: 2026-03-26
статус: на рассмотрении
---

# GitHub репозитории для Claude Code

## Забрали

- **Everything Claude Code** — cost-tracker, product-lens, autonomous-loops (2026-03-26)
- **Superpowers** — уже установлен
- **UI UX Pro Max** — уже установлен как skill

## Установлено из antigravity-awesome-skills (2026-03-27)

- **obsidian-markdown** — корректный Obsidian MD
- **obsidian-bases** — database views (.base файлы)
- **obsidian-cli** — CLI для vault
- **market-sizing-analysis** — TAM/SAM/SOM
- **micro-saas-launcher** — playbook запуска

## Создать самим (не нашлись в репо)

- **startup-financial-modeling** — модель runway, unit economics, сценарии
- **startup-metrics-framework** — CAC, LTV, churn, ARPU трекинг

## На потом (из antigravity)

### stripe-integration — Оплата через Stripe
- Checkout, подписки, вебхуки, PCI-compliant
- **Когда:** когда решим добавить Stripe к PayPal или заменить PayPal

### i18n-localization — Мультиязычность
- Паттерны перевода, управление языковыми файлами
- **Когда:** когда пойдём за пределы BY (Россия, Польша, Литва)

### mcp-builder — Создание MCP серверов
- Шаблон для своих MCP-интеграций
- **Когда:** если понадобится свой MCP (Obsidian MCP, Supabase MCP)

### deep-research — Автономный ресёрч
- Планирование → поиск → чтение → синтез
- **Когда:** усилить Продуктолога для глубокого анализа рынков

## На будущее

### LightRAG — граф знаний для Genealogy v2
- https://github.com/hkuds/lightrag
- Извлекает сущности (люди, места, даты) и связи из документов
- Строит knowledge graph семейных связей
- Killer feature для генеалогии: загрузил архивные документы → получил дерево
- **Минус:** требует 32B+ модель, инфраструктура
- **Когда:** после запуска MVP, как R&D для v2

### n8n-MCP — автоматизация воркфлоу
- https://github.com/czlonkowski/n8n-mcp
- 1084 ноды + 2709 шаблонов воркфлоу
- Claude может проектировать n8n-автоматизации
- **Когда:** когда подключим Telegram-бот + фоновый режим, n8n может оркестрировать триггеры

### Claude-Mem — persistent memory с семантическим поиском
- https://github.com/thedotmack/claude-mem
- SQLite + Chroma vector DB, поиск по истории решений
- Автоматически сжимает и индексирует контекст сессий
- **Когда:** если auto-memory + vault окажется недостаточно для поиска по старым решениям

### GSD (Get Shit Done) — волновое выполнение
- https://github.com/gsd-build/get-shit-done
- Фазы: план → выполнение (волнами, параллельно) → верификация → деплой
- Атомарные коммиты, свежие 200k окна на каждую задачу
- **Когда:** для следующего большого спринта по MVP

### Obsidian Skills — скиллы для работы с vault
- https://github.com/kepano/obsidian-skills
- Markdown, Bases, JSON Canvas, CLI, Defuddle
- **Когда:** не приоритет, у нас уже прямая интеграция Claude ↔ vault
