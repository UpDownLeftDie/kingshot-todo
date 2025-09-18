import { type Event } from '../../types/task';
import { type GameTaskId } from '../daily-tasks';

export const serverResetPrepEvent: Event = {
  id: 'server-reset-prep',
  name: 'Server Reset Preparation',
  description: 'Tasks to prepare for server reset',
  duration: 'daily',
  notices: [
    {
      id: 'save-intel-notice',
      message: 'Save Intel Missions for server reset',
      type: 'preparation',
      priority: 'high',
    },
    {
      id: 'gatherer-timing',
      message: 'Send out gatherers so they return after server reset',
      type: 'preparation',
      priority: 'medium',
    },
    {
      id: 'bison-save',
      message: 'Save bison to use after server reset',
      type: 'preparation',
      priority: 'low',
    },
  ],
  tasks: [
    {
      id: 'save-intel-missions' as GameTaskId,
      name: 'Save Intel Missions',
      description: 'Save intel missions for server reset',
      category: 'preparation',
      priority: 'high',
    },
    {
      id: 'send-gatherers' as GameTaskId,
      name: 'Send Out Gatherers',
      description: 'Send out gatherers so they return after server reset',
      category: 'preparation',
      priority: 'high',
    },
    {
      id: 'save-bison' as GameTaskId,
      name: 'Save Bison',
      description: 'Save bison to use after server reset',
      category: 'preparation',
      priority: 'medium',
    },
    {
      id: 'train-troops' as GameTaskId,
      name: 'Start Training Troops',
      description: 'Start training troops for after server reset',
      category: 'preparation',
      priority: 'medium',
    },
  ],
};
