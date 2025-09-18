import React, { useState } from 'react';
import { type ConsolidatedTask, type TaskSource } from '../types/task';

interface TaskCounterProps {
  task: ConsolidatedTask;
  currentCount: number;
  onCountChange: (count: number) => void;
  isCompleted: boolean;
}

export const TaskCounter: React.FC<TaskCounterProps> = ({
  task,
  currentCount,
  onCountChange,
  isCompleted,
}) => {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);
  const maxCount = task.count || 0;
  const handleIncrement = () => {
    if (currentCount < maxCount) {
      onCountChange(currentCount + 1);
    }
  };

  const handleDecrement = () => {
    if (currentCount > 0) {
      onCountChange(currentCount - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const clampedValue = Math.max(0, Math.min(value, maxCount));
    onCountChange(clampedValue);
  };

  const progress = maxCount > 0 ? (currentCount / maxCount) * 100 : 0;

  return (
    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Progress: {currentCount} / {maxCount}
        </span>
        <span className="text-xs text-gray-500">
          {progress.toFixed(0)}% • {maxCount - currentCount} remaining
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 mb-8 relative">
        {task.sourceEvents && task.sourceEvents.length > 1 ? (
          // Show unified segmented progress bar
          <>
            {/* Main progress fill based on overall progress */}
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />

            {/* Single hover area for all markers */}
            <div
              className="absolute top-0 w-full h-full cursor-pointer z-10"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const mouseX = ((e.clientX - rect.left) / rect.width) * 100;

                // Find the closest marker to mouse position
                let closestSource: TaskSource | null = null;
                let closestDistance = Infinity;

                task.sourceEvents!.forEach((source) => {
                  const segmentPosition =
                    (source.originalCount / maxCount) * 100;
                  const distance = Math.abs(mouseX - segmentPosition);
                  if (distance < closestDistance && distance < 8) {
                    // 8% threshold
                    closestDistance = distance;
                    closestSource = source as TaskSource;
                  }
                });

                setHoveredSegment(
                  closestSource ? (closestSource as TaskSource).eventId : null,
                );
              }}
              onMouseLeave={() => setHoveredSegment(null)}
            />

            {/* Marker lines */}
            {task.sourceEvents!.map((source, index) => {
              const segmentPosition = (source.originalCount / maxCount) * 100;
              const isHovered = hoveredSegment === source.eventId;

              return (
                <div key={source.eventId}>
                  {/* Segment marker line */}
                  <div
                    className={`absolute top-0 w-0.5 h-full z-5 transition-all duration-200 ${
                      isHovered ? 'bg-red-500' : 'bg-white'
                    }`}
                    style={{ left: `${segmentPosition}%` }}
                  />

                  {/* Hover tooltip */}
                  {isHovered && (
                    <div
                      className="absolute top-full mt-2 z-50"
                      style={{
                        left: `${segmentPosition}%`,
                        transform: 'translateX(-50%)',
                      }}>
                      <div className="bg-gray-900 text-white text-xs rounded px-3 py-2 shadow-lg whitespace-nowrap">
                        <div className="font-semibold">
                          {source.isDaily ? 'Daily' : source.eventName}
                        </div>
                        <div>Required: {source.originalCount}</div>
                        <div>
                          Progress:{' '}
                          {Math.min(currentCount, source.originalCount)}/
                          {source.originalCount}
                        </div>
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Labels at marker positions */}
            <div className="absolute top-full mt-1 w-full">
              {task.sourceEvents!.map((source, index) => {
                const segmentPosition = (source.originalCount / maxCount) * 100;
                const isHovered = hoveredSegment === source.eventId;

                return (
                  <div
                    key={`label-${source.eventId}`}
                    className={`absolute text-xs transition-all duration-200 ${
                      isHovered
                        ? 'font-semibold text-blue-600'
                        : 'text-gray-500'
                    }`}
                    style={{
                      left: `${segmentPosition}%`,
                      transform: 'translateX(-50%)',
                    }}>
                    {source.originalCount}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          // Show simple progress for single-source tasks or tasks without sourceEvents
          <div
            className="bg-blue-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        )}
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={handleDecrement}
          disabled={currentCount <= 0 || isCompleted}
          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-gray-600"
          title="Decrease count"
          aria-label="Decrease count">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </button>

        <input
          type="number"
          min="0"
          max={maxCount}
          value={currentCount}
          onChange={handleInputChange}
          disabled={isCompleted}
          className="w-16 text-center text-sm border border-gray-300 rounded px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Enter count manually"
          aria-label="Task count"
        />

        <button
          onClick={handleIncrement}
          disabled={currentCount >= maxCount || isCompleted}
          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-gray-600"
          title="Increase count"
          aria-label="Increase count">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
