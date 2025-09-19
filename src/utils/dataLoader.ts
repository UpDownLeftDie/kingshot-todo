import { dailyTasks } from '../data/daily-tasks';
import { type Event, type Task, type TaskData } from '../types/task';

// Dynamically import all event files using Vite's glob import
const eventModules = import.meta.glob('../data/events/*.ts', { eager: true });

// Helper function to convert a Task[] export to an Event object
const convertTaskArrayToEvent = (tasks: Task[], filename: string): Event => {
  // Extract event name from filename (e.g., "cesares-fury.ts" -> "Cesares Fury")
  const eventId = filename.replace(/\.ts$/, '');
  const eventName = eventId
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    id: eventId,
    name: eventName,
    description: `${eventName} event tasks`,
    duration: 1,
    tasks,
  };
};

// Helper function to extract the filename from a full path
const getFilenameFromPath = (path: string): string => {
  return path.split('/').pop()?.replace(/\.ts$/, '') || '';
};

// Load all data from separate TypeScript files with proper typing
export const loadTaskData = (): TaskData => {
  const events: Event[] = [];

  // Process each dynamically imported event module
  Object.entries(eventModules).forEach(([path, module]) => {
    const filename = getFilenameFromPath(path);
    const moduleExports = module as Record<string, unknown>;

    // Find the exported value (could be Event or Task[])
    const exportedValue = Object.values(moduleExports)[0];

    if (Array.isArray(exportedValue)) {
      // If it's a Task[] array, convert it to an Event
      const tasks = exportedValue as Task[];
      const event = convertTaskArrayToEvent(tasks, filename);
      events.push(event);
    } else if (
      exportedValue &&
      typeof exportedValue === 'object' &&
      'id' in exportedValue
    ) {
      // If it's already an Event object, validate and use it directly
      const event = exportedValue as Event;

      // Validation: ensure events don't have both duration and subEvents
      if (event.duration && event.subEvents) {
        console.warn(
          `Event ${event.id} has both duration and subEvents. Events should use either duration (for span-based events) or subEvents (for daily-task events), not both.`,
        );
      }

      events.push(event);
    } else {
      console.warn(`Unknown export format in ${path}:`, exportedValue);
    }
  });

  return {
    dailyTasks,
    events,
  };
};

export const taskData = loadTaskData();
