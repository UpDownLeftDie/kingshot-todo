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
