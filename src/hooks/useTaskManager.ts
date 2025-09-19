import { useCallback, useEffect, useState } from 'react';
import {
  type ConsolidatedTask,
  type Event,
  type Notice,
  type Task,
  type TaskSource,
  type TaskState,
} from '../types/task';
import { taskData } from '../utils/dataLoader';

// Type for JSON data with relaxed string types
type JsonTaskData = {
  dailyTasks: Array<Omit<Task, 'priority'> & { priority: string }>;
  events: Array<
    Omit<Event, 'duration'> & {
      duration?: number;
      tasks?: Array<Omit<Task, 'priority'> & { priority: string }>;
      notices?: Array<Omit<Notice, 'priority'> & { priority: string }>;
      subEvents?: Array<{
        id: string;
        name: string;
        description: string;
        day: number;
        notices?: Array<Omit<Notice, 'priority'> & { priority: string }>;
        tasks: Array<Omit<Task, 'priority'> & { priority: string }>;
      }>;
    }
  >;
};

const STORAGE_KEY = 'kingshot-todo-state';
const UTC_MIDNIGHT = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const useTaskManager = () => {
  // Initialize with a consistent state that will be the same on server and client
  const [taskState, setTaskState] = useState<TaskState>({
    completedTasks: [],
    selectedEvents: [],
    selectedSubEvents: {},
    taskCounts: {},
    lastReset: 0, // Use 0 initially to ensure consistency
  });

  const [isHydrated, setIsHydrated] = useState(false);

  // Load state from localStorage on mount (client-side only)
  useEffect(() => {
    setIsHydrated(true);

    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setTaskState(parsed);
      } catch (error) {
        console.error('Failed to parse saved state:', error);
        // If there's an error parsing, initialize with current time
        setTaskState((prev) => ({
          ...prev,
          lastReset: Date.now(),
        }));
      }
    } else {
      // No saved state, initialize with current time
      setTaskState((prev) => ({
        ...prev,
        lastReset: Date.now(),
      }));
    }
  }, []);

  // Save state to localStorage whenever it changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(taskState));
    }
  }, [taskState, isHydrated]);

  // Check if we need to reset tasks (UTC midnight)
  const checkForReset = useCallback(() => {
    const now = Date.now();
    const lastReset = taskState.lastReset;
    const timeSinceReset = now - lastReset;

    // If more than 24 hours have passed, reset
    if (timeSinceReset >= UTC_MIDNIGHT) {
      setTaskState((prev) => ({
        ...prev,
        completedTasks: [],
        taskCounts: {},
        lastReset: now,
      }));
    }
  }, [taskState.lastReset]);

  // Check for reset every minute
  useEffect(() => {
    const interval = setInterval(checkForReset, 60000);
    return () => clearInterval(interval);
  }, [checkForReset]);

  const toggleTask = useCallback((taskId: string, eventId?: string) => {
    setTaskState((prev) => {
      const isCompleted = prev.completedTasks.some(
        (task) => task.taskId === taskId && task.eventId === eventId,
      );

      if (isCompleted) {
        return {
          ...prev,
          completedTasks: prev.completedTasks.filter(
            (task) => !(task.taskId === taskId && task.eventId === eventId),
          ),
        };
      } else {
        return {
          ...prev,
          completedTasks: [
            ...prev.completedTasks,
            {
              taskId,
              completedAt: Date.now(),
              eventId,
            },
          ],
        };
      }
    });
  }, []);

  const toggleEvent = useCallback((eventId: string) => {
    setTaskState((prev) => ({
      ...prev,
      selectedEvents: prev.selectedEvents.includes(eventId)
        ? prev.selectedEvents.filter((id) => id !== eventId)
        : [...prev.selectedEvents, eventId],
    }));
  }, []);

  const selectSubEvent = useCallback((eventId: string, subEventId: string) => {
    setTaskState((prev) => ({
      ...prev,
      selectedSubEvents: {
        ...prev.selectedSubEvents,
        [eventId]: subEventId,
      },
    }));
  }, []);

  const updateTaskCount = useCallback((taskId: string, count: number) => {
    setTaskState((prev) => ({
      ...prev,
      taskCounts: {
        ...prev.taskCounts,
        [taskId]: count,
      },
    }));
  }, []);

  const isTaskCompleted = useCallback(
    (taskId: string, eventId?: string) => {
      return taskState.completedTasks.some(
        (task) => task.taskId === taskId && task.eventId === eventId,
      );
    },
    [taskState.completedTasks],
  );

  // Consolidate tasks from multiple events, taking the highest count for similar tasks
  const consolidateTasks = useCallback(
    (
      tasks: Array<
        Omit<Task, 'priority'> & {
          priority: string;
          sourceEvents?: TaskSource[];
          eventId?: string;
          eventName?: string;
          isDaily?: boolean;
        }
      >,
    ): ConsolidatedTask[] => {
      const taskMap = new Map<string, ConsolidatedTask>();

      tasks.forEach((task) => {
        // Use type as consolidation key - tasks with same type consolidate (highest count wins)
        const key = task.type;

        const sourceInfo: TaskSource = {
          eventId: task.eventId || 'daily',
          eventName: task.eventName || 'Daily Tasks',
          originalCount: task.count || 0,
          isDaily: task.isDaily || false,
        };

        if (taskMap.has(key)) {
          const existing = taskMap.get(key)!;
          const newCount = task.count || 0;
          const existingCount = existing.count || 0;

          if (newCount > existingCount) {
            taskMap.set(key, {
              ...task,
              count: newCount, // Update the count to the higher value
              priority: task.priority as 'low' | 'medium' | 'high',
              sourceEvents: [...(existing.sourceEvents || []), sourceInfo],
              maxCount: newCount,
            });
          } else {
            existing.sourceEvents = [
              ...(existing.sourceEvents || []),
              sourceInfo,
            ];
          }
        } else {
          taskMap.set(key, {
            ...task,
            priority: task.priority as 'low' | 'medium' | 'high',
            sourceEvents: [sourceInfo],
            maxCount: task.count,
          });
        }
      });

      return Array.from(taskMap.values());
    },
    [],
  );

  const getCurrentTasks = useCallback((): ConsolidatedTask[] => {
    const allTasks = [
      ...taskData.dailyTasks.map((task) => ({
        ...task,
        eventId: 'daily',
        eventName: 'Daily Tasks',
        isDaily: true,
      })),
    ];

    // Add tasks from selected events
    taskState.selectedEvents.forEach((eventId) => {
      const event = taskData.events.find((e) => e.id === eventId);
      if (event) {
        if (event.subEvents) {
          // Multi-day event: use selected sub-event
          const selectedSubEventId = taskState.selectedSubEvents[eventId];
          if (selectedSubEventId) {
            const subEvent = event.subEvents.find(
              (se) => se.id === selectedSubEventId,
            );
            if (subEvent) {
              allTasks.push(
                ...subEvent.tasks.map((task) => ({
                  ...task,
                  eventId: subEvent.id,
                  eventName: `${event.name} - ${subEvent.name}`,
                  isDaily: false,
                })),
              );
            }
          }
        } else if (event.tasks) {
          // Regular event: add all tasks
          allTasks.push(
            ...event.tasks.map((task) => ({
              ...task,
              eventId: event.id,
              eventName: event.name,
              isDaily: false,
            })),
          );
        }
      }
    });

    return consolidateTasks(allTasks);
  }, [taskState.selectedEvents, taskState.selectedSubEvents, consolidateTasks]);

  const getProgress = useCallback(() => {
    const currentTasks = getCurrentTasks();
    const completedCount = currentTasks.filter((task) =>
      isTaskCompleted(task.type),
    ).length;

    return {
      completed: completedCount,
      total: currentTasks.length,
      percentage:
        currentTasks.length > 0
          ? (completedCount / currentTasks.length) * 100
          : 0,
    };
  }, [getCurrentTasks, isTaskCompleted]);

  const getTaskCount = useCallback(
    (taskId: string) => {
      return taskState.taskCounts[taskId] || 0;
    },
    [taskState.taskCounts],
  );

  const getNotices = useCallback((): Notice[] => {
    const notices: Notice[] = [];
    const data = taskData as JsonTaskData;

    taskState.selectedEvents.forEach((eventId) => {
      const event = data.events.find((e) => e.id === eventId);
      if (event) {
        // Add notices from the main event
        if (event.notices) {
          notices.push(...event.notices);
        }

        // Add notices from selected subEvents
        if (event.subEvents) {
          const selectedSubEventId = taskState.selectedSubEvents[eventId];
          if (selectedSubEventId) {
            const selectedSubEvent = event.subEvents.find(
              (subEvent) => subEvent.id === selectedSubEventId,
            );
            if (selectedSubEvent && selectedSubEvent.notices) {
              notices.push(...selectedSubEvent.notices);
            }
          }
        }
      }
    });

    return notices;
  }, [taskState.selectedEvents, taskState.selectedSubEvents]);

  return {
    taskState,
    taskData,
    toggleTask,
    toggleEvent,
    selectSubEvent,
    updateTaskCount,
    isTaskCompleted,
    getCurrentTasks,
    getProgress,
    getTaskCount,
    getNotices,
    checkForReset,
    isHydrated,
  };
};
