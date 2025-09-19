import { type Event } from '../../types/task';
import { type TaskType } from '../../types/taskTypes';

export const serverResetPrepEvent: Event = {
  id: 'server-reset-prep',
  name: 'Server Reset Preparation',
  description: 'Tasks to prepare for server reset',
  duration: 'daily',
  notices: [
    {
      id: 'save-intel-notice',
      message: 'Save Intel Missions for server reset',
      type: 'save-intel-missions',
      priority: 'high',
    },
    {
      id: 'gatherer-timing',
      message: 'Send out gatherers so they return after server reset',
      type: 'send-gatherers',
      priority: 'medium',
    },
    {
      id: 'bison-save',
      message: 'Save bison to use after server reset',
      type: 'save-bison',
      priority: 'low',
    },
  ],
  tasks: [
    {
      id: 'save-intel-missions-1',
      type: 'save-intel-missions' as TaskType,
      name: 'Save Intel Missions',
      description: 'Save intel missions for server reset',
      category: 'preparation',
      priority: 'high',
    },
    {
      id: 'send-gatherers-1',
      type: 'send-gatherers' as TaskType,
      name: 'Send Out Gatherers',
      description: 'Send out gatherers so they return after server reset',
      category: 'preparation',
      priority: 'high',
    },
    {
      id: 'save-bison-1',
      type: 'save-bison' as TaskType,
      name: 'Save Bison',
      description: 'Save bison to use after server reset',
      category: 'preparation',
      priority: 'medium',
    },
    {
      id: 'train-troops-prep',
      type: 'train-troops' as TaskType,
      name: 'Start Training Troops',
      description: 'Start training troops for after server reset',
      category: 'preparation',
      priority: 'medium',
    },
  ],
};
