import type { Background } from './background.class';
import type { Endboss } from './endboss.class';
import type { Enemy } from './enemy.class';

/**
 * Holds all objects that belong to one level.
 */
export class Level {
  enemies: Enemy[];
  endboss: Endboss;
  backgroundObjects: Background[];
  endLevelX = 720 * 3;

  /**
   * @param {Enemy[]} enemies - Normal enemies of the level.
   * @param {Endboss} endboss - Boss at the end of the level.
   * @param {Background[]} backgroundObjects - Background layers.
   */
  constructor(enemies: Enemy[], endboss: Endboss, backgroundObjects: Background[]) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.backgroundObjects = backgroundObjects;
  }
}
