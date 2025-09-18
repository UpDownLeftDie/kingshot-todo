import React from 'react';
import { useTaskManager } from '../hooks/useTaskManager';
import { EnhancedEventSelector } from './EnhancedEventSelector';
import { NoticesPanel } from './NoticesPanel';
import { ProgressBar } from './ProgressBar';
import { TaskList } from './TaskList';

const TodoApp: React.FC = () => {
  const {
    taskData,
    taskState,
    toggleTask,
    toggleEvent,
    selectSubEvent,
    updateTaskCount,
    isTaskCompleted,
    getCurrentTasks,
    getProgress,
    getTaskCount,
    getNotices,
    isHydrated,
  } = useTaskManager();

  const currentTasks = getCurrentTasks();
  const progress = getProgress();
  const notices = getNotices();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Kingshot Daily Optimizer
          </h1>
          <p className="text-lg text-gray-600">
            Track your daily tasks and optimize your gameplay
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Events */}
          <div className="lg:col-span-1">
            <EnhancedEventSelector
              events={taskData.events}
              selectedEvents={taskState.selectedEvents}
              selectedSubEvents={taskState.selectedSubEvents}
              onToggleEvent={toggleEvent}
              onSelectSubEvent={selectSubEvent}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Progress Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <ProgressBar
                completed={progress.completed}
                total={progress.total}
                percentage={progress.percentage}
              />
            </div>

            {/* Notices Panel */}
            {notices.length > 0 && <NoticesPanel notices={notices} />}

            {/* Task List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <TaskList
                tasks={currentTasks}
                isTaskCompleted={isTaskCompleted}
                onToggleTask={toggleTask}
                getTaskCount={getTaskCount}
                onCountChange={updateTaskCount}
              />
            </div>

            {/* Footer Info */}
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>Tasks reset daily at 00:00 UTC</p>
              {isHydrated && taskState.lastReset > 0 && (
                <p className="mt-1">
                  Last reset:{' '}
                  {new Date(taskState.lastReset).toLocaleString('en-US', {
                    timeZone: 'UTC',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                  UTC
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
