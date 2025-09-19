import { type Task } from '../types/task';
import { TASK_TYPES } from '../types/taskTypes';

/**
 * Common task definitions that can be reused across multiple events
 * These are template tasks - actual events can override specific properties like count, points, etc.
 */
export const COMMON_TASKS = {
  // Military Tasks - High Priority
  ESCORT_TRUCKS: {
    type: TASK_TYPES.ESCORT_TRUCKS,
    name: 'Escort ${count} trucks of any grade',
    description: 'Escort ${count} truck${count === 1 ? "" : "s"} of any grade',
    category: 'military',
    priority: 'high',
    count: 1,
    points: 10000,
    isPointAccumulation: true,
  } as Task,

  RAID_TRUCKS: {
    type: TASK_TYPES.RAID_TRUCKS,
    name: 'Raid ${count} trucks of any grade',
    description: 'Raid ${count} truck${count === 1 ? "" : "s"} of any grade',
    category: 'military',
    priority: 'high',
    count: 1,
    points: 10000,
    isPointAccumulation: true,
  } as Task,

  // Building Tasks - Medium Priority
  USE_TRUEGOLD: {
    type: TASK_TYPES.USE_TRUEGOLD,
    name: 'Use ${count} Truegold to upgrade the building',
    description: 'Use ${count} Truegold to upgrade buildings',
    category: 'building',
    priority: 'medium',
    count: 1,
    points: 1250,
    isPointAccumulation: true,
  } as Task,

  // Speedup Tasks - Low Priority
  USE_SPEEDUPS_CONSTRUCTION: {
    type: TASK_TYPES.USE_SPEEDUPS_CONSTRUCTION,
    name: 'Use ${count}m of Speedups for Construction',
    description:
      'Use ${count} minute${count === 1 ? "" : "s"} of construction speedups',
    category: 'building',
    priority: 'low',
    count: 1,
    points: 18,
    isPointAccumulation: true,
  } as Task,

  USE_SPEEDUPS_RESEARCH: {
    type: TASK_TYPES.USE_SPEEDUPS_RESEARCH,
    name: 'Use ${count}m of Speedups for Research',
    description:
      'Use ${count} minute${count === 1 ? "" : "s"} of research speedups',
    category: 'research',
    priority: 'low',
    count: 1,
    points: 18,
    isPointAccumulation: true,
  } as Task,

  USE_SPEEDUPS_TRAINING: {
    type: TASK_TYPES.USE_SPEEDUPS_TRAINING,
    name: 'Use ${count}m of Speedups for Training (Training, Promotion)',
    description:
      'Use ${count} minute${count === 1 ? "" : "s"} of training speedups',
    category: 'military',
    priority: 'low',
    count: 1,
    points: 18,
    isPointAccumulation: true,
  } as Task,

  // Resource Gathering Tasks - Low Priority
  GATHER_BREAD: {
    type: TASK_TYPES.GATHER_BREAD,
    name: 'Gather ${count} Bread in the Wilderness',
    description: 'Gather ${count} bread from wilderness',
    category: 'resource',
    priority: 'low',
    count: 2000,
    points: 2,
    isPointAccumulation: true,
  } as Task,

  GATHER_WOOD: {
    type: TASK_TYPES.GATHER_WOOD,
    name: 'Gather ${count} Wood in the Wilderness',
    description: 'Gather ${count} wood from wilderness',
    category: 'resource',
    priority: 'low',
    count: 2000,
    points: 2,
    isPointAccumulation: true,
  } as Task,

  GATHER_STONE: {
    type: TASK_TYPES.GATHER_STONE,
    name: 'Gather ${count} Stone in the Wilderness',
    description: 'Gather ${count} stone from wilderness',
    category: 'resource',
    priority: 'low',
    count: 400,
    points: 2,
    isPointAccumulation: true,
  } as Task,

  GATHER_IRON: {
    type: TASK_TYPES.GATHER_IRON,
    name: 'Gather ${count} Iron in the Wilderness',
    description: 'Gather ${count} iron from wilderness',
    category: 'resource',
    priority: 'low',
    count: 100,
    points: 2,
    isPointAccumulation: true,
  } as Task,

  // Premium Tasks - Low Priority
  USE_GEMS: {
    type: TASK_TYPES.USE_GEMS,
    name: 'Use ${count} Gem(s)',
    description: 'Use ${count} gem${count === 1 ? "" : "s"}',
    category: 'premium',
    priority: 'low',
    count: 1,
    points: 1,
    isPointAccumulation: true,
  } as Task,

  TOPUP_POINTS: {
    type: TASK_TYPES.TOPUP_POINTS,
    name: 'Every ${count} Top-up Points obtained',
    description: 'Obtain top-up points',
    category: 'premium',
    priority: 'low',
    count: 1,
    points: 6,
    isPointAccumulation: true,
  } as Task,

  // Hero Tasks - Medium to High Priority
  USE_RARE_HERO_SHARDS: {
    type: TASK_TYPES.USE_RARE_HERO_SHARDS,
    name: 'Use ${count} Rare Hero Shard(s) to ascend Heroes',
    description:
      'Use ${count} rare hero shard${count === 1 ? "" : "s"} to ascend heroes',
    category: 'hero',
    priority: 'medium',
    count: 1,
    points: 210,
    isPointAccumulation: true,
  } as Task,

  USE_EPIC_HERO_SHARDS: {
    type: TASK_TYPES.USE_EPIC_HERO_SHARDS,
    name: 'Use ${count} Epic Hero Shard(s) to ascend Heroes',
    description:
      'Use ${count} epic hero shard${count === 1 ? "" : "s"} to ascend heroes',
    category: 'hero',
    priority: 'medium',
    count: 1,
    points: 750,
    isPointAccumulation: true,
  } as Task,

  USE_MYTHIC_HERO_SHARDS: {
    type: TASK_TYPES.USE_MYTHIC_HERO_SHARDS,
    name: 'Use ${count} Mythic Hero Shard(s) to ascend Heroes',
    description:
      'Use ${count} mythic hero shard${count === 1 ? "" : "s"} to ascend heroes',
    category: 'hero',
    priority: 'high',
    count: 1,
    points: 1875,
    isPointAccumulation: true,
  } as Task,

  // Intelligence Tasks - Medium Priority
  INTEL_MISSIONS: {
    type: TASK_TYPES.INTEL_MISSIONS,
    name: 'Finish ${count} Intel Mission(s)',
    description: 'Complete ${count} intel mission${count === 1 ? "" : "s"}',
    category: 'intelligence',
    priority: 'medium',
    count: 1,
    points: 3000,
    isPointAccumulation: true,
  } as Task,

  // Combat Tasks - Medium to High Priority
  DEFEAT_LV1_10_BEAST: {
    type: TASK_TYPES.DEFEAT_LV1_10_BEAST,
    name: 'Defeat ${count} Lv. 1 to 10 Beast',
    description: 'Defeat ${count} beast${count === 1 ? "" : "s"} of level 1-10',
    category: 'combat',
    priority: 'medium',
    count: 1,
    points: 4000,
    isPointAccumulation: true,
  } as Task,

  DEFEAT_LV11_15_BEAST: {
    type: TASK_TYPES.DEFEAT_LV11_15_BEAST,
    name: 'Defeat ${count} Lv. 11 to 15 Beast',
    description:
      'Defeat ${count} beast${count === 1 ? "" : "s"} of level 11-15',
    category: 'combat',
    priority: 'medium',
    count: 1,
    points: 4500,
    isPointAccumulation: true,
  } as Task,

  DEFEAT_LV16_20_BEAST: {
    type: TASK_TYPES.DEFEAT_LV16_20_BEAST,
    name: 'Defeat ${count} Lv. 16 to 20 Beast',
    description:
      'Defeat ${count} beast${count === 1 ? "" : "s"} of level 16-20',
    category: 'combat',
    priority: 'medium',
    count: 1,
    points: 5000,
    isPointAccumulation: true,
  } as Task,

  DEFEAT_LV21_25_BEAST: {
    type: TASK_TYPES.DEFEAT_LV21_25_BEAST,
    name: 'Defeat ${count} Lv. 21 to 25 Beast',
    description:
      'Defeat ${count} beast${count === 1 ? "" : "s"} of level 21-25',
    category: 'combat',
    priority: 'medium',
    count: 1,
    points: 5500,
    isPointAccumulation: true,
  } as Task,

  DEFEAT_LV26_30_BEAST: {
    type: TASK_TYPES.DEFEAT_LV26_30_BEAST,
    name: 'Defeat ${count} Lv. 26 to 30 Beast',
    description:
      'Defeat ${count} beast${count === 1 ? "" : "s"} of level 26-30',
    category: 'combat',
    priority: 'high',
    count: 1,
    points: 6000,
    isPointAccumulation: true,
  } as Task,

  CALL_RALLY_HUNT_TERROR: {
    type: TASK_TYPES.CALL_RALLY_HUNT_TERROR,
    name: 'Call rally and hunt down ${count} Terror(s)',
    description:
      'Call rally and hunt down ${count} terror${count === 1 ? "" : "s"}',
    category: 'combat',
    priority: 'high',
    count: 1,
    points: 15000,
    isPointAccumulation: true,
  } as Task,

  // Gear Tasks - Medium to High Priority
  RAISE_GOVERNOR_GEAR_CHARM: {
    type: TASK_TYPES.RAISE_GOVERNOR_GEAR_CHARM,
    name: 'Raise Governor Gear Charm max score by ${count}',
    description: 'Increase governor gear charm maximum score by ${count}',
    category: 'gear',
    priority: 'medium',
    count: 1,
    points: 45,
    isPointAccumulation: true,
  } as Task,

  RAISE_GOVERNOR_GEAR_MAX: {
    type: TASK_TYPES.RAISE_GOVERNOR_GEAR_MAX,
    name: 'Raise Governor Gear max score by ${count}',
    description: 'Increase governor gear maximum score by ${count}',
    category: 'gear',
    priority: 'medium',
    count: 1,
    points: 22,
    isPointAccumulation: true,
  } as Task,

  USE_HERO_GEAR_FORGEHAMMER: {
    type: TASK_TYPES.USE_HERO_GEAR_FORGEHAMMER,
    name: 'Use ${count} Hero Gear Forgehammer(s)',
    description: 'Use ${count} hero gear forgehammer${count === 1 ? "" : "s"}',
    category: 'gear',
    priority: 'medium',
    count: 1,
    points: 1875,
    isPointAccumulation: true,
  } as Task,

  USE_HERO_EXCLUSIVE_GEAR_WIDGET: {
    type: TASK_TYPES.USE_HERO_EXCLUSIVE_GEAR_WIDGET,
    name: 'Use ${count} Widget(s) of any Hero Exclusive Gear',
    description:
      'Use ${count} widget${count === 1 ? "" : "s"} of any hero exclusive gear',
    category: 'gear',
    priority: 'high',
    count: 1,
    points: 3750,
    isPointAccumulation: true,
  } as Task,

  USE_MITHRIL: {
    type: TASK_TYPES.USE_MITHRIL,
    name: 'Use ${count} Mithril',
    description: 'Use ${count} mithril',
    category: 'gear',
    priority: 'high',
    count: 1,
    points: 18750,
    isPointAccumulation: true,
  } as Task,

  // Pet Tasks - Medium to High Priority
  PET_ADVANCEMENT: {
    type: TASK_TYPES.PET_ADVANCEMENT,
    name: 'Pet advancement score increases by ${count}',
    description: 'Increase pet advancement score by ${count}',
    category: 'pet',
    priority: 'medium',
    count: 1,
    points: 30,
    isPointAccumulation: true,
  } as Task,

  USE_ADVANCED_TAMING_MARKS: {
    type: TASK_TYPES.USE_ADVANCED_TAMING_MARKS,
    name: 'Use ${count} Advanced Taming Marks to refine pets',
    description:
      'Use ${count} advanced taming mark${count === 1 ? "" : "s"} to refine pets',
    category: 'pet',
    priority: 'high',
    count: 1,
    points: 9370,
    isPointAccumulation: true,
  } as Task,

  USE_COMMON_TAMING_MARKS: {
    type: TASK_TYPES.USE_COMMON_TAMING_MARKS,
    name: 'Use ${count} Common Taming Marks to refine pets',
    description:
      'Use ${count} common taming mark${count === 1 ? "" : "s"} to refine pets',
    category: 'pet',
    priority: 'medium',
    count: 1,
    points: 680,
    isPointAccumulation: true,
  } as Task,

  // Troop Training Tasks - Low to Medium Priority
  TRAIN_LV1_TROOPS: {
    type: TASK_TYPES.TRAIN_LV1_TROOPS,
    name: 'Train ${count} Lv. 1 Troop(s)',
    description: 'Train ${count} level 1 troop${count === 1 ? "" : "s"}',
    category: 'military',
    priority: 'low',
    count: 1,
    points: 1,
    isPointAccumulation: true,
  } as Task,

  TRAIN_LV2_TROOPS: {
    type: TASK_TYPES.TRAIN_LV2_TROOPS,
    name: 'Train ${count} Lv. 2 Troop(s)',
    description: 'Train ${count} level 2 troop${count === 1 ? "" : "s"}',
    category: 'military',
    priority: 'low',
    count: 1,
    points: 1,
    isPointAccumulation: true,
  } as Task,

  TRAIN_LV3_TROOPS: {
    type: TASK_TYPES.TRAIN_LV3_TROOPS,
    name: 'Train ${count} Lv. 3 Troop(s)',
    description: 'Train ${count} level 3 troop${count === 1 ? "" : "s"}',
    category: 'military',
    priority: 'low',
    count: 1,
    points: 2,
    isPointAccumulation: true,
  } as Task,

  TRAIN_LV4_TROOPS: {
    type: TASK_TYPES.TRAIN_LV4_TROOPS,
    name: 'Train ${count} Lv. 4 Troop(s)',
    description: 'Train ${count} level 4 troop${count === 1 ? "" : "s"}',
    category: 'military',
    priority: 'low',
    count: 1,
    points: 3,
    isPointAccumulation: true,
  } as Task,

  TRAIN_LV5_TROOPS: {
    type: TASK_TYPES.TRAIN_LV5_TROOPS,
    name: 'Train ${count} Lv. 5 Troop(s)',
    description: 'Train ${count} level 5 troop${count === 1 ? "" : "s"}',
    category: 'military',
    priority: 'low',
    count: 1,
    points: 4,
    isPointAccumulation: true,
  } as Task,

  TRAIN_LV6_TROOPS: {
    type: TASK_TYPES.TRAIN_LV6_TROOPS,
    name: 'Train ${count} Lv. 6 Troop(s)',
    description: 'Train ${count} level 6 troop${count === 1 ? "" : "s"}',
    category: 'military',
    priority: 'low',
    count: 1,
    points: 7,
    isPointAccumulation: true,
  } as Task,

  TRAIN_LV7_TROOPS: {
    type: TASK_TYPES.TRAIN_LV7_TROOPS,
    name: 'Train ${count} Lv. 7 Troop(s)',
    description: 'Train ${count} level 7 troop${count === 1 ? "" : "s"}',
    category: 'military',
    priority: 'medium',
    count: 1,
    points: 10,
    isPointAccumulation: true,
  } as Task,

  TRAIN_LV8_TROOPS: {
    type: TASK_TYPES.TRAIN_LV8_TROOPS,
    name: 'Train ${count} Lv. 8 Troop(s)',
    description: 'Train ${count} level 8 troop${count === 1 ? "" : "s"}',
    category: 'military',
    priority: 'medium',
    count: 1,
    points: 14,
    isPointAccumulation: true,
  } as Task,

  TRAIN_LV9_TROOPS: {
    type: TASK_TYPES.TRAIN_LV9_TROOPS,
    name: 'Train ${count} Lv. 9 Troop(s)',
    description: 'Train ${count} level 9 troop${count === 1 ? "" : "s"}',
    category: 'military',
    priority: 'medium',
    count: 1,
    points: 18,
    isPointAccumulation: true,
  } as Task,

  TRAIN_LV10_TROOPS: {
    type: TASK_TYPES.TRAIN_LV10_TROOPS,
    name: 'Train ${count} Lv. 10 Troop(s)',
    description: 'Train ${count} level 10 troop${count === 1 ? "" : "s"}',
    category: 'military',
    priority: 'high',
    count: 1,
    points: 24,
    isPointAccumulation: true,
  } as Task,
} as const;

/**
 * Helper function to create a task from a common task definition with overrides
 * @param commonTaskKey - Key from COMMON_TASKS
 * @param overrides - Properties to override (e.g., count, points, priority)
 * @returns Task with merged properties
 */
export function createTask(
  commonTaskKey: keyof typeof COMMON_TASKS,
  overrides: Partial<Task> = {},
): Task {
  const baseTask = COMMON_TASKS[commonTaskKey];
  return {
    ...baseTask,
    ...overrides,
  };
}

/**
 * Helper function to create multiple tasks from common definitions
 * @param taskDefinitions - Array of [commonTaskKey, overrides] tuples
 * @returns Array of tasks
 */
export function createTasks(
  taskDefinitions: Array<[keyof typeof COMMON_TASKS, Partial<Task>?]>,
): Task[] {
  return taskDefinitions.map(([key, overrides = {}]) =>
    createTask(key, overrides),
  );
}
