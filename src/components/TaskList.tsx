import React from 'react';
import { type ConsolidatedTask } from '../types/task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: ConsolidatedTask[];
  isTaskCompleted: (taskId: string) => boolean;
  onToggleTask: (taskId: string) => void;
  getTaskCount: (taskId: string) => number;
  onCountChange: (taskId: string, count: number) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  isTaskCompleted,
  onToggleTask,
  getTaskCount,
  onCountChange,
}) => {
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, ConsolidatedTask[]>);

  const getCategoryDisplayName = (category: string) => {
    return (
      category.charAt(0).toUpperCase() +
      category.slice(1).replace(/([A-Z])/g, ' $1')
    );
  };

  return (
    <div className="space-y-6">
      {Object.entries(groupedTasks).map(([category, categoryTasks]) => (
        <div
          key={category}
          className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">
              {getCategoryDisplayName(category)}
            </h3>
            <p className="text-sm text-gray-600">
              {categoryTasks.length} task{categoryTasks.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="p-4">
            {categoryTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                isCompleted={isTaskCompleted(task.id)}
                onToggle={() => onToggleTask(task.id)}
                currentCount={getTaskCount(task.id)}
                onCountChange={(count) => onCountChange(task.id, count)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
