import type { Background } from './background.class';
import type { Collectible } from './collectible.class';
import type { Endboss } from './endboss.class';
import type { Enemy } from './enemy.class';
import type { MovableObject } from './movable-object.class';
import { Rune } from './rune.class';

/**
 * Holds all objects that belong to one level.
 */
export class Level {
  enemies: Enemy[];
  endboss: Endboss;
  backgroundObjects: Background[];
  collectibles: Collectible[];
  totalRunes: number;
  endLevelX = 720 * 3;

  /**
   * @param {Enemy[]} enemies - Normal enemies of the level.
   * @param {Endboss} endboss - Boss at the end of the level.
   * @param {Background[]} backgroundObjects - Background layers.
   * @param {Collectible[]} collectibles - Runes and potions.
   */
  constructor(
    enemies: Enemy[],
    endboss: Endboss,
    backgroundObjects: Background[],
    collectibles: Collectible[]
  ) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.backgroundObjects = backgroundObjects;
    this.collectibles = collectibles;
    this.totalRunes = collectibles.filter((item) => item instanceof Rune).length;
  }


  /**
   * @returns {Enemy[]} Normal enemies and the boss in one list.
   */
  getAllEnemies(): Enemy[] {
    return [...this.enemies, this.endboss];
  }


  /**
   * Tells every enemy whom to chase.
   *
   * @param {MovableObject} target - Object the enemies follow, usually the player.
   * @returns {void}
   */
  setTarget(target: MovableObject): void {
    this.getAllEnemies().forEach((enemy) => (enemy.target = target));
  }


  /**
   * Removes every item that has been picked up.
   *
   * @returns {void}
   */
  removeCollected(): void {
    this.collectibles = this.collectibles.filter((item) => !item.isCollected);
  }
}
