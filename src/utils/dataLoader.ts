import { dailyTasks } from '../data/daily-tasks';
import { beastHuntEvent } from '../data/events/beast-hunt';
import { lostKingdomEvent } from '../data/events/lost-kingdom';
import { serverResetPrepEvent } from '../data/events/server-reset-prep';
import { type Event, type TaskData } from '../types/task';

// Load all data from separate TypeScript files with proper typing
export const loadTaskData = (): TaskData => {
  const events: Event[] = [
    serverResetPrepEvent,
    lostKingdomEvent,
    beastHuntEvent,
  ];

  return {
    dailyTasks,
    events,
  };
};

export const taskData = loadTaskData();
