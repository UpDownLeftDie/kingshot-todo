import React from 'react';

interface ProgressBarProps {
  completed: number;
  total: number;
  percentage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  completed,
  total,
  percentage,
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-900">Daily Progress</h2>
        <span className="text-sm text-gray-600">
          {completed} / {total} tasks completed
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="mt-2 text-center">
        <span className="text-sm font-medium text-gray-700">
          {percentage.toFixed(1)}% Complete
        </span>
      </div>
    </div>
  );
};
