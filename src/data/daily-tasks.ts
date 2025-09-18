import { type Task } from '../types/task';

// Define task IDs as literal types to ensure consolidation works correctly
export type DailyTaskId =
  | 'terror-hunts'
  | 'arena-battles'
  | 'daily-quests'
  | 'resource-gathering'
  | 'alliance-donations';

export type GameTaskId =
  | DailyTaskId
  | 'hunt-beasts'
  | 'gather-resources'
  | 'epic-recruitment'
  | 'advanced-recruitment'
  | 'beast-materials'
  | 'save-intel-missions'
  | 'send-gatherers'
  | 'save-bison'
  | 'train-troops';

export const dailyTasks: Task[] = [
  {
    id: 'terror-hunts' as const,
    name: '${count} Terror Hunts',
    description: 'Complete ${count} terror hunt missions',
    category: 'combat',
    priority: 'high',
    count: 10,
  },
  {
    id: 'arena-battles' as const,
    name: '${count} Arena Battles',
    description: 'Participate in ${count} arena battles',
    category: 'combat',
    priority: 'high',
    count: 5,
  },
  {
    id: 'daily-quests' as const,
    name: 'Complete ${count} Daily Quests',
    description: 'Finish ${count} available daily quests',
    category: 'quests',
    priority: 'medium',
    count: 3,
  },
  {
    id: 'resource-gathering' as const,
    name: 'Collect ${count} Resources',
    description:
      'Gather ${count} resources from gathering points (${remaining} remaining)',
    category: 'resources',
    priority: 'medium',
    count: 8,
  },
  {
    id: 'alliance-donations' as const,
    name: 'Alliance Donations',
    description: 'Make alliance donations',
    category: 'alliance',
    priority: 'low',
  },
];
