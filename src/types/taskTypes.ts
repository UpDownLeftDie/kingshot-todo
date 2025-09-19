// Shared task types for all tasks (daily tasks, events, etc.)

export const TASK_TYPES = {
  // Daily task types
  ALLIANCE_CONTRIBUTIONS: 'alliance-contributions',
  RECRUIT_HEROES: 'recruit-heroes',
  ONLINE_REWARDS: 'online-rewards',
  UPGRADE_BUILDINGS: 'upgrade-buildings',
  RESEARCH_TECHNOLOGY: 'research-technology',
  GATHER_TIMES: 'gather-times',
  ARENA_CHALLENGES: 'arena-challenges',
  PET_ADVENTURE: 'pet-adventure',
  DAILY_LOGIN: 'daily-login',
  ALLIANCE_HELP: 'alliance-help',
  TRAIN_CAVALRY: 'train-cavalry',
  TRAIN_ARCHERS: 'train-archers',
  TRAIN_INFANTRY: 'train-infantry',
  HEAL_SOLDIERS: 'heal-soldiers',

  // Event task types (used in daily tasks)
  INTEL_MISSIONS: 'intel-missions',
  HUNT_BEASTS: 'hunt-beasts',
  DEFEAT_TERROR: 'defeat-terror',
  GATHER_RESOURCES: 'gather-resources',
  EPIC_RECRUITMENT: 'epic-recruitment',
  ADVANCED_RECRUITMENT: 'advanced-recruitment',
  SEND_GATHERERS: 'send-gatherers',
  TRAIN_TROOPS: 'train-troops',

  // Special/Preparation task types
  SAVE_BISON: 'save-bison',
  SAVE_INTEL_MISSIONS: 'save-intel-missions',
  BEAST_MATERIALS: 'beast-materials',
  PREPARATION: 'preparation',
  CESARES_FURY: 'cesares-fury',

  // Alliance Brawl event task types
  ESCORT_TRUCKS: 'escort-troops',
  RAID_TRUCKS: 'raid-troops',
  USE_TRUEGOLD: 'use-truegold',
  USE_SPEEDUPS_CONSTRUCTION: 'use-speedups-construction',
  USE_SPEEDUPS_RESEARCH: 'use-speedups-research',
  USE_SPEEDUPS_TRAINING: 'use-speedups-training',
  GATHER_BREAD: 'gather-bread',
  GATHER_WOOD: 'gather-wood',
  GATHER_STONE: 'gather-stone',
  GATHER_IRON: 'gather-iron',
  USE_GEMS: 'use-gems',
  TOPUP_POINTS: 'topup-points',
  USE_RARE_HERO_SHARDS: 'use-rare-hero-shards',
  USE_EPIC_HERO_SHARDS: 'use-epic-hero-shards',
  USE_MYTHIC_HERO_SHARDS: 'use-mythic-hero-shards',
  TRAIN_LV1_TROOPS: 'train-lv1-troops',
  TRAIN_LV2_TROOPS: 'train-lv2-troops',
  TRAIN_LV3_TROOPS: 'train-lv3-troops',
  TRAIN_LV4_TROOPS: 'train-lv4-troops',
  TRAIN_LV5_TROOPS: 'train-lv5-troops',
  TRAIN_LV6_TROOPS: 'train-lv6-troops',
  TRAIN_LV7_TROOPS: 'train-lv7-troops',
  TRAIN_LV8_TROOPS: 'train-lv8-troops',
  TRAIN_LV9_TROOPS: 'train-lv9-troops',
  TRAIN_LV10_TROOPS: 'train-lv10-troops',
  RAISE_GOVERNOR_GEAR_CHARM: 'raise-governor-gear-charm',
  RAISE_GOVERNOR_GEAR_MAX: 'raise-governor-gear-max',
  PET_ADVANCEMENT: 'pet-advancement',
  USE_ADVANCED_TAMING_MARKS: 'use-advanced-taming-marks',
  USE_COMMON_TAMING_MARKS: 'use-common-taming-marks',
  USE_HERO_GEAR_FORGEHAMMER: 'use-hero-gear-forgehammer',
  USE_HERO_EXCLUSIVE_GEAR_WIDGET: 'hero-exclusive-gear-widget',
  USE_MITHRIL: 'use-mithril',
  DEFEAT_LV1_10_BEAST: 'defeat-lv1-10-beast',
  DEFEAT_LV11_15_BEAST: 'defeat-lv11-15-beast',
  DEFEAT_LV16_20_BEAST: 'defeat-lv16-20-beast',
  DEFEAT_LV21_25_BEAST: 'defeat-lv21-25-beast',
  DEFEAT_LV26_30_BEAST: 'defeat-lv26-30-beast',
  CALL_RALLY_HUNT_TERROR: 'call-rally-hunt-terror',
} as const;

export const NOTICE_TYPES = {
  SAVE_INTEL_MISSIONS: 'save-intel-missions',
  SAVE_BISON: 'save-bison',
  SEND_GATHERERS: 'send-gatherers',
  TRAIN_TROOPS: 'train-troops',
  PREPARATION: 'preparation',
} as const;

// Type aliases derived from the constants
export type TaskType = (typeof TASK_TYPES)[keyof typeof TASK_TYPES];
export type NoticeType = (typeof NOTICE_TYPES)[keyof typeof NOTICE_TYPES];
