import { BOSS_GOLEM } from '../data/enemy-types.data';
import { Enemy } from './enemy.class';
import { soundManager } from './sound-manager.class';

/**
 * Boss golem at the end of the level. Defeating it wins the game.
 */
export class Endboss extends Enemy {
  /**
   * @param {number} x - Horizontal start position.
   */
  constructor(x: number) {
    super(x, BOSS_GOLEM);
  }


  /**
   * Wakes up with a roar, so the player knows the boss fight has started.
   *
   * @returns {void}
   */
  activate(): void {
    super.activate();
    soundManager.play('bossRoar');
  }
}
