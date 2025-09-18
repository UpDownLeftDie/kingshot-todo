import React from 'react';
import { type Event } from '../types/task';

interface EventSelectorProps {
  events: Event[];
  selectedEvents: string[];
  onToggleEvent: (eventId: string) => void;
}

export const EventSelector: React.FC<EventSelectorProps> = ({
  events,
  selectedEvents,
  onToggleEvent,
}) => {
  const getDurationColor = (duration: string) => {
    switch (duration) {
      case 'daily':
        return 'bg-blue-100 text-blue-800';
      case 'weekly':
        return 'bg-green-100 text-green-800';
      case 'limited':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Active Events
      </h2>

      <div className="space-y-3">
        {events.map((event) => {
          const isSelected = selectedEvents.includes(event.id);
          const taskCount = event.tasks?.length || 0;
          const noticeCount = event.notices?.length || 0;

          return (
            <div
              key={event.id}
              className={`border rounded-lg p-4 transition-all duration-200 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
              <div className="flex items-start space-x-3">
                <button
                  onClick={() => onToggleEvent(event.id)}
                  className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'border-gray-300 hover:border-blue-500'
                  }`}
                  aria-label={isSelected ? 'Deselect event' : 'Select event'}>
                  {isSelected && (
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {event.name}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getDurationColor(
                        event.duration,
                      )}`}>
                      {event.duration}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">
                    {event.description}
                  </p>

                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>
                      {taskCount} task{taskCount !== 1 ? 's' : ''}
                    </span>
                    {noticeCount > 0 && (
                      <span>
                        {noticeCount} notice{noticeCount !== 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedEvents.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <svg
            className="w-12 h-12 mx-auto mb-3 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <p>Select events to see additional tasks and notices</p>
        </div>
      )}
    </div>
  );
};
