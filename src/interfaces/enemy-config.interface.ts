import type { SoundName } from '../classes/sound-manager.class';
import type { Offsets } from './offsets.interface';

/**
 * Image paths of all animations an enemy can play.
 * `hurt` is optional because not every golem has hurt frames.
 */
export interface EnemyAnimations {
  walking: string[];
  dying: string[];
  attack: string[];
  hurt?: string[];
}

/**
 * Stats and appearance of one enemy type.
 */
export interface EnemyConfig {
  animations: EnemyAnimations;
  y: number;
  width: number;
  height: number;
  healthPoints: number;
  damage: number;
  speed: number;
  activationRange: number;
  offsets: Offsets;
  hurtSound: SoundName;
  deathSound: SoundName;
}
