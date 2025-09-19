import { type ConsolidatedTask } from '../types/task';

/**
 * Replaces placeholders in task text with dynamic values
 *
 * Available placeholders:
 * - ${count}: Current progress count
 * - ${maxCount}: Maximum count required
 * - ${remaining}: How many more needed (maxCount - count)
 * - ${progress}: Progress percentage (0-100)
 *
 * @param text - Text containing placeholders
 * @param task - Task object with count information
 * @param currentCount - Override current count (optional)
 * @returns Text with placeholders replaced
 */
export const replaceTaskPlaceholders = (
  text: string,
  task: ConsolidatedTask,
  currentCount?: number,
): string => {
  const count = currentCount ?? task.count ?? 0;

  return text
    .replace(/\$\{count\}/g, String(count))
    .replace(/\$\{maxCount\}/g, String(task.count || 0))
    .replace(/\$\{remaining\}/g, String(Math.max(0, (task.count || 0) - count)))
    .replace(
      /\$\{progress\}/g,
      String(Math.round((count / (task.count || 1)) * 100 || 0)),
    );
};

export const getTaskDisplayName = (task: ConsolidatedTask): string => {
  // Always use the total count from JSON, not current progress
  return replaceTaskPlaceholders(task.name, task, task.count);
};

export const getTaskDisplayDescription = (task: ConsolidatedTask): string => {
  // Always use the total count from JSON, not current progress
  return replaceTaskPlaceholders(task.description, task, task.count);
};

/**
 * Calculate total points from a list of completed tasks
 * @param completedTaskIds - Array of completed task IDs
 * @param allTasks - Array of all available tasks
 * @returns Total points earned
 */
export const calculateTotalPoints = (
  completedTaskIds: string[],
  allTasks: ConsolidatedTask[],
): number => {
  return completedTaskIds.reduce((total, taskId) => {
    const task = allTasks.find((t) => t.id === taskId);
    return total + (task?.points || 0);
  }, 0);
};

/**
 * Get all tasks that should be automatically completed when a given task is completed
 * @param taskId - The ID of the completed task
 * @param allTasks - Array of all available tasks
 * @returns Array of task IDs that should be automatically completed
 */
export const getImpliedTasks = (
  taskType: string,
  allTasks: ConsolidatedTask[],
): string[] => {
  const task = allTasks.find((t) => (t.type || t.id) === taskType);
  return task?.implies || [];
};

/**
 * Get all tasks that will be automatically completed when completing the given tasks
 * @param taskIds - Array of task IDs being completed
 * @param allTasks - Array of all available tasks
 * @returns Array of all unique task IDs that should be marked as completed
 */
export const getAllImpliedTasks = (
  taskTypes: string[],
  allTasks: ConsolidatedTask[],
): string[] => {
  const allImplied = new Set<string>();

  const processTask = (taskType: string) => {
    if (allImplied.has(taskType)) return;
    allImplied.add(taskType);

    const implied = getImpliedTasks(taskType, allTasks);
    implied.forEach((impliedType) => processTask(impliedType));
  };

  taskTypes.forEach(processTask);
  return Array.from(allImplied);
};

/**
 * Check if the daily point goal has been reached
 * @param completedTaskIds - Array of completed task IDs
 * @param allTasks - Array of all available tasks
 * @param goalPoints - Target points (default: 325)
 * @returns True if goal is reached
 */
export const hasReachedPointGoal = (
  completedTaskIds: string[],
  allTasks: ConsolidatedTask[],
  goalPoints: number = 325,
): boolean => {
  return calculateTotalPoints(completedTaskIds, allTasks) >= goalPoints;
};

/**
 * Get a unique identifier for a task using type + count
 * @param task - The task object
 * @returns A string identifier in format "type:count"
 */
export const getTaskIdentifier = (task: ConsolidatedTask): string => {
  const count = task.count || 0;
  return `${task.type}:${count}`;
};
