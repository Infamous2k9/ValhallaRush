import { MovableObject } from './movable-object.class';
import type { Player } from './player.class';

/**
 * Base class for items the player can pick up.
 * Every subclass decides in `applyTo` what the item does.
 */
export abstract class Collectible extends MovableObject {
  isCollected = false;


  /**
   * @param {Player} player - Player who touches the item.
   * @returns {boolean} True if the player may pick the item up right now.
   */
  canBeCollectedBy(player: Player): boolean {
    return !this.isCollected && !player.isDead();
  }


  /**
   * Marks the item as collected and applies its effect.
   *
   * @param {Player} player - Player who picked the item up.
   * @returns {void}
   */
  collect(player: Player): void {
    this.isCollected = true;
    this.applyTo(player);
  }


  /**
   * Effect of the item on the player.
   *
   * @param {Player} player - Player who picked the item up.
   * @returns {void}
   */
  abstract applyTo(player: Player): void;
}
