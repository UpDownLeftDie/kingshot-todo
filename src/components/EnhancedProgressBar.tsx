import React, { useState } from 'react';
import { type ConsolidatedTask } from '../types/task';
import { getTaskIdentifier } from '../utils/taskUtils';

interface ProgressSegment {
  taskId: string;
  taskName: string;
  sourceEvents: Array<{
    eventId: string;
    eventName: string;
    originalCount: number;
    isDaily: boolean;
  }>;
  maxCount: number;
  currentCount: number;
  percentage: number;
  startPercentage: number;
  endPercentage: number;
}

interface EnhancedProgressBarProps {
  tasks: ConsolidatedTask[];
  getTaskCount: (taskId: string) => number;
  completed: number;
  total: number;
  percentage: number;
}

export const EnhancedProgressBar: React.FC<EnhancedProgressBarProps> = ({
  tasks,
  getTaskCount,
  completed,
  total,
  percentage,
}) => {
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  // Create segments for each task
  const segments: ProgressSegment[] = tasks.map((task, index) => {
    const taskId = getTaskIdentifier(task);
    const currentCount = getTaskCount(taskId);
    const taskPercentage = (currentCount / (task.count || 1)) * 100;
    const segmentWidth = (1 / tasks.length) * 100;

    return {
      taskId: taskId,
      taskName: task.name,
      sourceEvents: task.sourceEvents || [],
      maxCount: task.count || 0,
      currentCount,
      percentage: taskPercentage,
      startPercentage: index * segmentWidth,
      endPercentage: (index + 1) * segmentWidth,
    };
  });

  // Debug log to see what we're working with
  console.log(
    'EnhancedProgressBar - Tasks:',
    tasks.length,
    'Segments:',
    segments.length,
  );

  const getSegmentColor = (segment: ProgressSegment, isHovered: boolean) => {
    if (segment.percentage >= 100) return 'bg-green-500';
    if (segment.percentage >= 50) return 'bg-yellow-500';
    if (isHovered) return 'bg-blue-400';
    return 'bg-blue-500';
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-900">Daily Progress</h2>
        <span className="text-sm text-gray-600">
          {completed} / {total} tasks completed
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-6 relative overflow-hidden">
        {segments.map((segment) => {
          const isHovered = hoveredSegment === segment.taskId;
          const segmentWidth = segment.endPercentage - segment.startPercentage;
          const progressWidth = (segment.percentage / 100) * segmentWidth;

          return (
            <div
              key={segment.taskId}
              className="absolute h-full transition-all duration-200 cursor-pointer"
              style={{
                left: `${segment.startPercentage}%`,
                width: `${segmentWidth}%`,
              }}
              onMouseEnter={() => setHoveredSegment(segment.taskId)}
              onMouseLeave={() => setHoveredSegment(null)}>
              {/* Background */}
              <div className="w-full h-full bg-gray-200" />

              {/* Progress */}
              <div
                className={`h-full transition-all duration-300 ${getSegmentColor(
                  segment,
                  isHovered,
                )}`}
                style={{ width: `${progressWidth}%` }}
              />

              {/* Segment border for visibility */}
              <div className="absolute right-0 top-0 w-px h-full bg-gray-400 opacity-50" />

              {/* Hover tooltip */}
              {isHovered && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10">
                  <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg max-w-xs">
                    <div className="font-semibold mb-1">{segment.taskName}</div>
                    <div className="text-gray-300">
                      Progress: {segment.currentCount}/{segment.maxCount} (
                      {segment.percentage.toFixed(0)}%)
                    </div>
                    <div className="mt-1">
                      <div className="text-gray-400 text-xs">Sources:</div>
                      {segment.sourceEvents.map((source, idx) => (
                        <div key={idx} className="text-xs">
                          • {source.isDaily ? 'Daily' : source.eventName} (
                          {source.originalCount})
                        </div>
                      ))}
                    </div>
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-2 text-center">
        <span className="text-sm font-medium text-gray-700">
          {percentage.toFixed(1)}% Complete
        </span>
      </div>

      {/* Segment indicators */}
      <div className="mt-3 flex justify-between text-xs text-gray-500">
        {segments.map((segment) => (
          <div
            key={segment.taskId}
            className="flex-1 text-center truncate px-1"
            title={segment.taskName}>
            {segment.taskName.replace(/\$\{count\}/g, String(segment.maxCount))}
          </div>
        ))}
      </div>
    </div>
  );
};
