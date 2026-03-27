#!/bin/bash
# Продуктолог: проверка изменений канбана Genealogy
# Используется в loop — если файл изменился, выводит "CHANGED", иначе "NO_CHANGE"

KANBAN="/Users/sr/f(Am)team/FamTeam.vault/Проекты/Genealogy/Канбан.md"
STATE_FILE="/Users/sr/f(Am)team/.monitor-schedule.json"

# Текущая дата модификации канбана (unix timestamp)
CURRENT_MTIME=$(stat -f "%m" "$KANBAN" 2>/dev/null)

if [ -z "$CURRENT_MTIME" ]; then
    echo "ERROR: канбан не найден: $KANBAN"
    exit 1
fi

# Прошлая дата из state file
if [ -f "$STATE_FILE" ]; then
    LAST_MTIME=$(python3 -c "import json; d=json.load(open('$STATE_FILE')); print(d.get('kanban_mtime','0'))" 2>/dev/null)
else
    LAST_MTIME="0"
fi

if [ "$CURRENT_MTIME" != "$LAST_MTIME" ]; then
    # Обновляем state
    python3 -c "
import json, os
f='$STATE_FILE'
d = json.load(open(f)) if os.path.exists(f) else {}
d['kanban_mtime'] = '$CURRENT_MTIME'
d['last_check'] = '$(date -u +%Y-%m-%dT%H:%M:%SZ)'
json.dump(d, open(f, 'w'), indent=2)
"
    echo "CHANGED"
else
    echo "NO_CHANGE"
fi
