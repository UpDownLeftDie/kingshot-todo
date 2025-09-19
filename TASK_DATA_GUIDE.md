# Task Data Management Guide

## Overview

The Kingshot Daily Optimizer now uses **TypeScript files** instead of JSON for better type safety and task consolidation control.

## File Structure

```
src/data/
├── daily-tasks.ts              # Daily recurring tasks
├── events/
│   ├── server-reset-prep.ts    # Server reset preparation event
│   ├── lost-kingdom.ts         # Multi-day Lost Kingdom event
│   └── beast-hunt.ts           # Beast hunt event
└── utils/dataLoader.ts         # Loads all data files
```

## Key Benefits of TypeScript Files

### 1. **Type Safety for Task IDs**

- Task IDs are defined as literal types in `daily-tasks.ts`
- Prevents typos and ensures proper task consolidation
- IDE autocomplete for task IDs

```typescript
export type GameTaskId =
  | 'terror-hunts'
  | 'arena-battles'
  | 'hunt-beasts'  // ← Same ID used across events = consolidation
  | 'gather-resources'
  // ... more IDs
```

### 2. **Task Consolidation by ID**

Tasks with the **same ID** automatically consolidate:

```typescript
// Daily task
{ id: 'hunt-beasts', count: 10 }

// Event task
{ id: 'hunt-beasts', count: 25 } // ← Higher count wins

// Result: Player only needs to track 25 beasts total
```

### 3. **Multi-Day Event Support**

There are two types of multi-day events:

**Duration-based events**: You have X days to complete all tasks

```typescript
{
  id: 'cesares-fury',
  duration: 3,  // 3 days to complete all tasks
  tasks: [...]
}
```

**Day-specific events**: Different tasks for each day (only one day active at a time)

```typescript
{
  id: 'lost-kingdom',
  subEvents: [  // No duration property needed
    { day: 1, tasks: [...] },
    { day: 2, tasks: [...] },
    { day: 3, tasks: [...] }
  ]
}
```

**Important**: Events should use either `duration` OR `subEvents`, never both.

## Adding New Tasks

### 1. **Add Task ID Type**

In `daily-tasks.ts`, add to `GameTaskId`:

```typescript
export type GameTaskId =
  | 'existing-tasks'
  | 'new-task-id'  // ← Add here
```

### 2. **Create Task**

```typescript
{
  id: 'new-task-id' as GameTaskId,
  name: 'Task Name',
  description: 'Task description',
  category: 'combat',
  priority: 'high',
  count: 10
}
```

### 3. **Consolidation Rules**

- **Same ID** = Tasks consolidate (highest count wins)
- **Different ID** = Separate tasks
- **Multi-day events** = Only selected day's tasks are active

## Adding New Events

### 1. **Simple Event**

Create `src/data/events/new-event.ts`:

```typescript
import { type Event } from '../../types/task';
import { type GameTaskId } from '../daily-tasks';

export const newEvent: Event = {
  id: 'new-event',
  name: 'Event Name',
  description: 'Event description',
  duration: 'limited',
  tasks: [
    {
      id: 'hunt-beasts' as GameTaskId, // ← Consolidates with existing
      name: 'Hunt ${count} Beasts',
      count: 30
    }
  ]
};
```

### 2. **Multi-Day Event**

```typescript
export const multiDayEvent: Event = {
  id: 'multi-day-event',
  name: 'Multi Day Event',
  duration: 2,
  subEvents: [
    {
      id: 'day-1',
      day: 1,
      name: 'Day 1: Preparation',
      tasks: [...]
    },
    {
      id: 'day-2',
      day: 2,
      name: 'Day 2: Combat',
      tasks: [...]
    }
  ]
};
```

### 3. **Register Event**

Add to `src/utils/dataLoader.ts`:

```typescript
import { newEvent } from '../data/events/new-event';

export const loadTaskData = (): TaskData => {
  const events: Event[] = [
    serverResetPrepEvent,
    lostKingdomEvent,
    beastHuntEvent,
    newEvent,  // ← Add here
  ];
  // ...
};
```

## Dynamic Text Placeholders

Tasks support dynamic placeholders:

- `${count}` - Total count required
- `${maxCount}` - Same as count
- `${remaining}` - How many left (maxCount - current)
- `${progress}` - Progress percentage

```typescript
{
  name: 'Hunt ${count} Beasts',
  description: 'Hunt ${count} beasts (${remaining} remaining)',
  count: 25
}
```

## UI Features

### 1. **Event Selection**

- Checkbox-based multi-select
- Multi-day events show day selector
- Only one day can be active per multi-day event

### 2. **Task Consolidation Display**

- Shows pills for each source event
- Hover tooltips show original counts
- Progress bar segmented by task

### 3. **Type Safety**

- IDE autocomplete for task IDs
- Compile-time validation
- No more typos causing duplicate tasks

## Migration from JSON

Old JSON structure → New TypeScript structure:

- ✅ Better type safety
- ✅ Task ID validation
- ✅ Multi-day event support
- ✅ Improved maintainability
- ✅ IDE support with autocomplete

## Best Practices

1. **Use descriptive task IDs**: `hunt-beasts` not `task1`
2. **Reuse IDs for consolidation**: Same activity = same ID
3. **Add comments**: Explain consolidation relationships
4. **Test thoroughly**: Check consolidation works as expected
5. **Update types**: Always update `GameTaskId` when adding tasks
