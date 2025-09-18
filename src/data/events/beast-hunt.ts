import { type Event } from '../../types/task';
import { type GameTaskId } from '../daily-tasks';

export const beastHuntEvent: Event = {
  id: 'beast-hunt-event',
  name: 'Beast Hunt Event',
  description: 'Special beast hunting event',
  duration: 'limited',
  tasks: [
    {
      id: 'hunt-beasts' as GameTaskId, // This will consolidate with other hunt-beasts tasks
      name: 'Hunt ${count} Beasts',
      description: 'Hunt ${count} beasts during the event',
      category: 'combat',
      priority: 'high',
      count: 15,
    },
    {
      id: 'beast-materials' as GameTaskId,
      name: 'Collect Beast Materials',
      description: 'Gather materials from defeated beasts',
      category: 'resources',
      priority: 'medium',
    },
  ],
};
