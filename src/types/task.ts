import type { NoticeType, TaskType } from './taskTypes';

export interface Task {
  id?: string; // Optional unique identifier for specific task instances
  type: TaskType; // Task type for consolidation (e.g., 'alliance-contributions', 'defeat-terror')
  name: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  count?: number;
  points?: number;
  implies?: string[]; // Task types that are automatically completed when this task is completed
  isPointAccumulation?: boolean; // If true, task shows points for each completion rather than being a single completable task
}

export interface SubEvent {
  id: string;
  name: string;
  description: string;
  day: number;
  notices?: Notice[];
  tasks: Task[];
}

export interface Event {
  id: string;
  name: string;
  description: string;
  duration?: number; // For events that span X days to complete tasks (mutually exclusive with subEvents)
  notices?: Notice[];
  tasks?: Task[];
  subEvents?: SubEvent[]; // For events with tasks for each day (mutually exclusive with duration)
}

export interface Notice {
  id: string;
  message: string;
  type: NoticeType;
  priority: 'low' | 'medium' | 'high';
}

export interface TaskData {
  dailyTasks: Task[];
  events: Event[];
}

export interface CompletedTask {
  taskId: string;
  completedAt: number;
  eventId?: string;
}

export interface TaskState {
  completedTasks: CompletedTask[];
  selectedEvents: string[];
  selectedSubEvents: Record<string, string>; // eventId -> subEventId
  taskCounts: Record<string, number>;
  lastReset: number;
}

export interface TaskSource {
  eventId: string;
  eventName: string;
  originalCount: number;
  isDaily: boolean;
}

export interface ConsolidatedTask extends Task {
  sourceEvents?: TaskSource[];
  maxCount?: number;
}
