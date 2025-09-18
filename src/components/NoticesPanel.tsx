import React from 'react';
import { type Notice } from '../types/task';

interface NoticesPanelProps {
  notices: Notice[];
}

export const NoticesPanel: React.FC<NoticesPanelProps> = ({ notices }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-500 bg-red-50 text-red-800';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50 text-yellow-800';
      case 'low':
        return 'border-green-500 bg-green-50 text-green-800';
      default:
        return 'border-gray-300 bg-gray-50 text-gray-800';
    }
  };

  if (notices.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg
          className="w-5 h-5 mr-2 text-blue-500"
          fill="currentColor"
          viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
        Daily Notices
      </h2>

      <div className="space-y-3">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className={`border-l-4 p-3 rounded-r-lg ${getPriorityColor(
              notice.priority,
            )}`}>
            <p className="text-sm font-medium">{notice.message}</p>
            <span className="text-xs opacity-75 capitalize">
              {notice.type} • {notice.priority} priority
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
