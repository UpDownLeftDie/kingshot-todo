// Shared task types for all tasks (daily tasks, events, etc.)

export type DailyTaskType =
  | 'alliance-contributions'
  | 'recruit-heroes'
  | 'online-rewards'
  | 'upgrade-buildings'
  | 'research-technology'
  | 'gather-times'
  | 'arena-challenges'
  | 'pet-adventure'
  | 'daily-login'
  | 'alliance-help'
  | 'train-cavalry'
  | 'train-archers'
  | 'train-infantry'
  | 'heal-soldiers';

export type EventTaskType =
  | 'intel-missions'
  | 'collect-bread'
  | 'collect-wood'
  | 'gather-iron'
  | 'mine-stone'
  | 'hunt-beasts'
  | 'defeat-terror'
  | 'gather-resources'
  | 'epic-recruitment'
  | 'advanced-recruitment'
  | 'send-gatherers'
  | 'train-troops';

export type TaskType = DailyTaskType | EventTaskType;

export type NoticeType =
  | 'save-intel-missions'
  | 'save-bison'
  | 'send-gatherers'
  | 'train-troops';
