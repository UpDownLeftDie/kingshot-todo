import React from 'react';
import { type ConsolidatedTask } from '../types/task';
import {
  getTaskDisplayDescription,
  getTaskDisplayName,
} from '../utils/taskUtils';
import { TaskCounter } from './TaskCounter';

interface TaskItemProps {
  task: ConsolidatedTask;
  isCompleted: boolean;
  onToggle: () => void;
  currentCount?: number;
  onCountChange?: (count: number) => void;
  eventId?: string;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  isCompleted,
  onToggle,
  currentCount = 0,
  onCountChange,
  eventId,
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-green-500 bg-green-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'High Priority';
      case 'medium':
        return 'Medium Priority';
      case 'low':
        return 'Low Priority';
      default:
        return 'Normal';
    }
  };

  return (
    <div
      className={`border-l-4 p-4 mb-3 rounded-r-lg transition-all duration-200 hover:shadow-md ${
        isCompleted && !task.isPointAccumulation
          ? 'opacity-60 bg-gray-100 border-gray-400'
          : getPriorityColor(task.priority)
      }`}>
      <div className="flex items-start space-x-3">
        {!task.isPointAccumulation && (
          <button
            onClick={onToggle}
            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              isCompleted
                ? 'bg-green-500 border-green-500 text-white'
                : 'border-gray-300 hover:border-green-500'
            }`}
            aria-label={
              isCompleted ? 'Mark as incomplete' : 'Mark as complete'
            }>
            {isCompleted && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        )}

        {task.isPointAccumulation && (
          <div className="mt-1 w-5 h-5 rounded bg-blue-100 border-2 border-blue-300 flex items-center justify-center">
            <svg
              className="w-3 h-3 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3
                className={`text-lg font-medium ${
                  isCompleted && !task.isPointAccumulation
                    ? 'line-through text-gray-500'
                    : 'text-gray-900'
                }`}>
                {getTaskDisplayName(task)}
              </h3>
              {task.isPointAccumulation && task.points && (
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  +{task.points} pts
                </span>
              )}
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                task.priority === 'high'
                  ? 'bg-red-100 text-red-800'
                  : task.priority === 'medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}>
              {getPriorityText(task.priority)}
            </span>
          </div>

          <p
            className={`mt-1 text-sm ${
              isCompleted && !task.isPointAccumulation
                ? 'text-gray-400'
                : 'text-gray-600'
            }`}>
            {getTaskDisplayDescription(task)}
          </p>

          <div className="mt-2 flex items-center space-x-2">
            <span className="text-xs text-gray-500 capitalize">
              {task.category}
            </span>
            {eventId && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                Event Task
              </span>
            )}
            {task.sourceEvents && task.sourceEvents.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {Array.from(
                  new Map(
                    task.sourceEvents.map((source) => [
                      source.isDaily ? 'Daily' : source.eventName,
                      source,
                    ]),
                  ).values(),
                ).map((source) => (
                  <span
                    key={`${source.eventId}-${source.originalCount}`}
                    className={`text-xs px-2 py-1 rounded-full ${
                      source.isDaily
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                    title={`From ${source.eventName} (${source.originalCount} required)`}>
                    {source.isDaily ? 'Daily' : source.eventName}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {task.count && task.count > 1 && onCountChange && (
        <TaskCounter
          task={task}
          currentCount={currentCount}
          onCountChange={onCountChange}
          isCompleted={isCompleted}
        />
      )}
    </div>
  );
};
