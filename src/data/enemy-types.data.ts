import type { EnemyConfig } from '../interfaces/enemy-config.interface';
import { GOLEM_1 } from './golem_1.data';
import { GOLEM_2 } from './golem_2.data';
import { GOLEM_3 } from './golem_3.data';

/** Fast, weak golem. Dies after 2 hits. */
export const SMALL_GOLEM: EnemyConfig = {
  animations: GOLEM_1,
  y: 320,
  width: 150,
  height: 150,
  healthPoints: 40,
  damage: 10,
  speed: 1.5,
  activationRange: 400,
  offsets: { top: 30, right: 30, bottom: 20, left: 30 },
  hurtSound: 'enemyHurt',
  deathSound: 'enemyDeath',
};

/** Slow, tough golem. Dies after 4 hits. */
export const HEAVY_GOLEM: EnemyConfig = {
  animations: GOLEM_2,
  y: 270,
  width: 200,
  height: 200,
  healthPoints: 80,
  damage: 15,
  speed: 1,
  activationRange: 400,
  offsets: { top: 40, right: 40, bottom: 27, left: 40 },
  hurtSound: 'enemyHurt',
  deathSound: 'enemyDeath',
};

/** Boss golem. Wakes up earlier and dies after 10 hits. */
export const BOSS_GOLEM: EnemyConfig = {
  animations: GOLEM_3,
  y: 190,
  width: 300,
  height: 300,
  healthPoints: 200,
  damage: 20,
  speed: 2,
  activationRange: 500,
  offsets: { top: 70, right: 70, bottom: 40, left: 70 },
  hurtSound: 'bossHurt',
  deathSound: 'bossDeath',
};
