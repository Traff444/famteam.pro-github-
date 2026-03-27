# Сервер голосового агента ElevenLabs

## Общая информация

| Параметр | Значение |
|----------|----------|
| IP | 185.66.68.205 |
| SSH порт | 52222 |
| ОС | Ubuntu 22.04.2 LTS |
| Ядро | 5.15.0-143-generic |
| Asterisk | 18.10.0 (PJSIP) |
| VPN | AmneziaWG (Docker) |

## Характеристики сервера

| Параметр | Значение |
|----------|----------|
| Тип | Виртуальная машина (VMware/vSphere) |
| CPU | Intel Xeon E5-2640 v4 @ 2.40GHz |
| Ядра CPU | 2 (1 сокет, 2 ядра, без Hyper-Threading) |
| RAM | 3.8 GB |
| Swap | Нет |
| Диск | 40 GB (виртуальный), LVM (vg0-lv--root) |
| Архитектура | x86_64 |

Текущее использование ресурсов (на момент проверки):
- RAM: ~1.5 GB занято, ~2.1 GB доступно
- Диск: 12 GB занято (31%)
- Нагрузка: ~0.00 (практически idle)

---

## Архитектура

```
Телефон звонит на +375173820033
        |
        v
Деловая Сеть (agenttest.pbx.bn.by / 172.28.68.1)
        |  SIP UDP через приватную сеть (ens192: 10.9.247.30)
        v
Asterisk [context: in-from-ds]
        |  Answer() -> маршрутизация в ElevenLabs
        v
ElevenLabs (34.29.130.129:5060 TCP)
        |  Голосовой AI-агент обрабатывает вызов
        v
(при исходящих от ElevenLabs -> обратно через DS)
```

---

## Сетевые интерфейсы

| Интерфейс | IP | Назначение |
|-----------|-----|-----------|
| ens160 | 185.66.68.205/27 | Публичный IP (SSH, ElevenLabs TCP) |
| ens192 | 10.9.247.30/30 | Приватная сеть к Деловой Сети |
| docker0 | 172.17.0.1/16 | Docker bridge |
| amn0 | 172.29.172.1/24 | AmneziaWG bridge |

## Маршрутизация

| Сеть | Шлюз | Интерфейс | Назначение |
|------|-------|-----------|-----------|
| 0.0.0.0/0 | 185.66.68.193 | ens160 | Default gateway |
| 172.28.68.0/24 | 10.9.247.29 | ens192 | PBX Деловая Сеть |
| 172.28.61.0/24 | 10.9.247.29 | ens192 | Деловая Сеть (доп.) |

---

## Asterisk PJSIP -- Конфигурация

### Файлы конфигурации
- `/etc/asterisk/pjsip.conf` -- SIP транки, эндпоинты, аутентификация
- `/etc/asterisk/extensions.conf` -- диалплан (маршрутизация вызовов)
- `/etc/asterisk/logger.conf` -- настройка логирования

### Транспорты

| Имя | Протокол | Bind | Назначение |
|-----|----------|------|-----------|
| transport-udp | UDP | 10.9.247.30:5060 | Деловая Сеть |
| transport-tcp | TCP | 0.0.0.0:5060 | ElevenLabs |

### Регистрация (исходящая)

| Транк | Сервер | Логин | Транспорт |
|-------|--------|-------|-----------|
| ds-trunk | sip:agenttest.pbx.bn.by | 333 / gLtNXioM | transport-udp |

Параметры:
- `retry_interval=60` -- повтор при ошибке
- `forbidden_retry_interval=60` -- повтор при 403 Forbidden
- `expiration=3600` -- время жизни регистрации

### Эндпоинты

| Эндпоинт | Назначение | Транспорт | Контекст |
|----------|-----------|-----------|----------|
| ds-endpoint | Исходящие в ДС | UDP | in-from-ds |
| ds-in | Входящие от ДС | UDP | in-from-ds |
| elevenlabs | Исходящие в EL | TCP | from-internal |
| elevenlabs-in | Входящие от EL | TCP | in-from-elevenlabs |

### Identify (распознавание входящих)

| Identify | Эндпоинт | Match |
|----------|----------|-------|
| ds-in-ident | ds-in | 172.28.68.0/24, 172.28.61.0/24 |
| elevenlabs-in-ident | elevenlabs-in | 34.0.0.0/8, 35.0.0.0/8, 136.115.126.216/32 |

---

## Диалплан (extensions.conf)

### Входящие от Деловой Сети -> ElevenLabs
```
[in-from-ds]
1. Answer()
2. Если USE_TEST=1 -> проиграть hello-world (тест)
3. Если USE_TEST=0 -> Goto(route-elevenlabs, +375173820033)
```

### Маршрут в ElevenLabs
```
[route-elevenlabs]
Dial(PJSIP/${EXTEN}@elevenlabs, 60)
```

### Входящие от ElevenLabs -> Деловая Сеть
```
[in-from-elevenlabs]
1. Set CALLERID(num)=+375173820033
2. Dial(PJSIP/ds-endpoint/sip:${EXTEN}@agenttest.pbx.bn.by, 60)
```

### Глобальные переменные
- `USE_TEST=0` -- 0=боевой режим, 1=тестовый (hello-world)
- `DST_ELEVEN=+375173820033` -- номер для маршрутизации в ElevenLabs

---

## Docker -- AmneziaWG VPN

```
Контейнер: amnezia-awg
Образ: amnezia-awg
Порт: 32607/udp
Сеть: 172.29.172.0/24
```

---

## Firewall

- iptables INPUT policy: **ACCEPT**
- UFW: не установлен
- Порт 5060 UDP слушает на 10.9.247.30 (приватный, Деловая Сеть)
- Порт 5060 TCP — **ограничен iptables** только для ElevenLabs

### Правила iptables для TCP 5060 (настроены 2026-03-27)

| # | Source | Action | Назначение |
|---|--------|--------|-----------|
| 1 | 34.0.0.0/8 | ACCEPT | ElevenLabs |
| 2 | 35.0.0.0/8 | ACCEPT | ElevenLabs |
| 3 | 136.115.126.216/32 | ACCEPT | ElevenLabs |
| 4 | 0.0.0.0/0 | DROP | Все остальные |

Правила сохранены: `/etc/iptables/rules.v4` (пакет `iptables-persistent`).

Управление:
```bash
# Посмотреть текущие правила
iptables -L INPUT -n -v --line-numbers

# После изменения — сохранить
iptables-save > /etc/iptables/rules.v4
```

---

## Логирование

Файл: `/var/log/asterisk/messages`
Уровень: notice, warning, error

Для отладки (временно):
```bash
asterisk -rx "pjsip set logger on"
asterisk -rx "core set verbose 5"
```

---

## Диагностика и частые проблемы

### Звонки не проходят -- проверка по шагам

1. **Проверить регистрацию**:
   ```bash
   asterisk -rx "pjsip show registrations"
   ```
   Должно быть: `Registered`

2. **Если Rejected** -- перезапустить Asterisk:
   ```bash
   systemctl restart asterisk
   ```

3. **Проверить сеть до PBX**:
   ```bash
   ping -c 3 172.28.68.1
   ```

4. **Проверить эндпоинты**:
   ```bash
   asterisk -rx "pjsip show endpoints"
   ```

5. **Живой SIP-трафик**:
   ```bash
   tcpdump -i ens192 -nn port 5060 -A
   ```

6. **Логи**:
   ```bash
   tail -f /var/log/asterisk/messages
   ```

### Инцидент 2026-02-25

**Проблема**: Звонки не проходили. SIP-регистрация ds-trunk в статусе Rejected.
**Причина**: Регистрация застряла в forbidden-backoff (было 600 сек).
**Решение**: `systemctl restart asterisk` -- регистрация восстановилась.
**Профилактика**: Уменьшен `forbidden_retry_interval` с 600 до 60 секунд.

### Инцидент 2026-03-27

**Проблема**: Звонки не проходили — «номер временно не может быть вызван».
**Причина**: SIP-регистрация ds-trunk застряла в статусе `Rejected` (аналогично инциденту 2026-02-25).
**Решение**: `systemctl restart asterisk` — регистрация восстановилась.
**Дополнительно**: Настроен iptables — TCP 5060 закрыт для всех, кроме IP ElevenLabs
(34.0.0.0/8, 35.0.0.0/8, 136.115.126.216/32). Установлен `iptables-persistent`.

### Инцидент 2026-02-26

**Проблема**: Исходящий звонок от ElevenLabs на телефон не проходил.
**Причина**: ElevenLabs отправлял номер с пробелами в SIP URI:
`INVITE sip:+375 29 641 96 57@185.66.68.205` -- пробелы в URI недопустимы,
PJSIP отбрасывал пакет с ошибкой `syntax error exception when parsing 'Request Line'`.
Звонок не доходил даже до диалплана.
**Решение**: В настройках ElevenLabs номер указан без пробелов в формате E.164:
`+375296419657` вместо `+375 29 641 96 57`.
**Важно**: Все номера в ElevenLabs должны быть в формате E.164 без пробелов,
скобок и дефисов (например `+375XXXXXXXXX`).

---

## Полезные команды

```bash
# Статус Asterisk
systemctl status asterisk

# Рестарт
systemctl restart asterisk

# Консоль Asterisk
asterisk -rvvv

# Регистрации
asterisk -rx "pjsip show registrations"

# Эндпоинты
asterisk -rx "pjsip show endpoints"

# Активные каналы
asterisk -rx "core show channels"

# Перезагрузить конфиг без рестарта
asterisk -rx "module reload res_pjsip.so"
asterisk -rx "dialplan reload"

# Docker VPN
docker ps
docker logs amnezia-awg
```

---

*Документация создана: 2026-02-25*
*Обновлено: 2026-02-26 (характеристики сервера, инцидент с форматом номера ElevenLabs)*
*Обновлено: 2026-03-27 (инцидент Rejected, настройка iptables для TCP 5060)*
*Сервер: serverSupport.by / SafeKontakt*
