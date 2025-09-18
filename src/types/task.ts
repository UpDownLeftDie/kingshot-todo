export interface Task {
  id: string; // Will be constrained by GameTaskId in implementation
  name: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  count?: number;
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
  duration: 'daily' | 'weekly' | 'limited';
  isMultiDay?: boolean;
  notices?: Notice[];
  tasks?: Task[];
  subEvents?: SubEvent[];
}

export interface Notice {
  id: string;
  message: string;
  type: string;
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
  sourceEvents: TaskSource[];
  maxCount?: number;
}
