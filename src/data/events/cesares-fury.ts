import { type Event } from '../../types/task';
import { TASK_TYPES } from '../../types/taskTypes';

export const cesaresFuryEvent: Event = {
  id: 'cesares-fury-event',
  name: 'Ceasares Fury',
  description: 'Special Cesares Fury event',
  duration: 3,
  tasks: [
    {
      type: TASK_TYPES.CESARES_FURY,
      name: 'Attack ${count} Cesares Fury',
      description: 'Attack ${count} Cesares Fury during the event',
      category: 'combat',
      priority: 'high',
      count: 50,
    },
  ],
};
