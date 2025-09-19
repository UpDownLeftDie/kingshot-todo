import { type Event } from '../../types/task';
import { type TaskType } from '../../types/taskTypes';

export const lostKingdomEvent: Event = {
  id: 'lost-kingdom',
  name: 'Lost Kingdom',
  description: '7-day Lost Kingdom event with different phases',
  duration: 'weekly',
  isMultiDay: true,
  subEvents: [
    {
      id: 'lk-day-1',
      name: 'LK Day 1: Preparation',
      description: 'First day preparation phase',
      day: 1,
      notices: [
        {
          id: 'lk-prep-notice',
          message: 'Prepare troops and resources for Lost Kingdom',
          type: 'preparation',
          priority: 'high',
        },
      ],
      tasks: [
        {
          id: 'hunt-beasts-15-day1',
          type: 'hunt-beasts' as TaskType, // This will consolidate with other hunt-beasts tasks
          name: 'Defeat ${count} Beasts',
          description: 'Rewards at 5 and ${count} beasts.',
          category: 'combat',
          priority: 'medium',
          count: 15,
        },
        {
          id: 'gather-resources-10m-day1',
          type: 'gather-resources' as TaskType, // This will consolidate with other gather-resources tasks
          name: 'Gather ${count} Resources',
          description: 'Rewards at 3000000 and ${count} resources gathered.',
          category: 'resources',
          priority: 'medium',
          count: 10000000,
        },
      ],
    },
    {
      id: 'lk-day-2',
      name: 'LK Day 2: Combat Phase',
      description: 'Second day combat phase',
      day: 2,
      tasks: [
        {
          id: 'hunt-beasts-25-day2',
          type: 'hunt-beasts' as TaskType, // Higher count - this will be used for consolidation
          name: 'Defeat ${count} Beasts',
          description: 'Rewards at 10 and ${count} beasts.',
          category: 'combat',
          priority: 'high',
          count: 25, // Higher than day 1, so this will be the consolidated count
        },
        {
          id: 'epic-recruitment-30',
          type: 'epic-recruitment' as TaskType,
          name: 'Recruit ${count} Epic Heroes',
          description:
            'Gold keys. Rewards at 10 and ${count} epic heroes recruited.',
          category: 'heroes',
          priority: 'high',
          count: 30,
        },
      ],
    },
    {
      id: 'lk-day-3',
      name: 'LK Day 3: Resource Phase',
      description: 'Third day resource gathering phase',
      day: 3,
      tasks: [
        {
          id: 'gather-resources-50m-day3',
          type: 'gather-resources' as TaskType, // Much higher count - this will be used for consolidation
          name: 'Gather ${count} Resources',
          description: 'Massive resource gathering for final push.',
          category: 'resources',
          priority: 'high',
          count: 50000000, // Much higher than day 1, so this will be the consolidated count
        },
        {
          id: 'advanced-recruitment-50',
          type: 'advanced-recruitment' as TaskType,
          name: 'Recruit ${count} Advanced Heroes',
          description: 'Silver keys.',
          category: 'heroes',
          priority: 'medium',
          count: 100,
        },
      ],
    },
  ],
};
