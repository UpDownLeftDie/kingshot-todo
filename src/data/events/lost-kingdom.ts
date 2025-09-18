import { type Event } from '../../types/task';
import { type GameTaskId } from '../daily-tasks';

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
          id: 'hunt-beasts' as GameTaskId, // This will consolidate with other hunt-beasts tasks
          name: 'Defeat ${count} Beasts',
          description: 'Rewards at 5 and ${count} beasts.',
          category: 'combat',
          priority: 'medium',
          count: 15,
        },
        {
          id: 'gather-resources' as GameTaskId, // This will consolidate with other gather-resources tasks
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
          id: 'hunt-beasts' as GameTaskId, // Higher count - this will be used for consolidation
          name: 'Defeat ${count} Beasts',
          description: 'Rewards at 10 and ${count} beasts.',
          category: 'combat',
          priority: 'high',
          count: 25, // Higher than day 1, so this will be the consolidated count
        },
        {
          id: 'epic-recruitment' as GameTaskId,
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
          id: 'gather-resources' as GameTaskId, // Much higher count - this will be used for consolidation
          name: 'Gather ${count} Resources',
          description: 'Massive resource gathering for final push.',
          category: 'resources',
          priority: 'high',
          count: 50000000, // Much higher than day 1, so this will be the consolidated count
        },
        {
          id: 'advanced-recruitment' as GameTaskId,
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
