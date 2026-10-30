import { setStoppableInterval } from '../utils/intervals';
import { Collectible } from './collectible.class';
import type { Player } from './player.class';
import type { SoundName } from './sound-manager.class';

const SHEET_PATH = './assets/items/potions/potions_small_64.png';
const FRAME_SIZE = 64;
const FRAME_COUNT = 15;
const RED_ROW = 6;
const HEAL_AMOUNT = 30;

/**
 * Spinning health potion. The animation comes from one sprite sheet.
 */
export class Potion extends Collectible {
  frame = 0;
  collectSound: SoundName = 'potionHeal';

  /**
   * @param {number} x - Horizontal position.
   * @param {number} y - Vertical position.
   */
  constructor(x: number, y: number) {
    super(x, y, SHEET_PATH);
    this.width = FRAME_SIZE;
    this.height = FRAME_SIZE;
    this.offsets = { top: 6, right: 12, bottom: 11, left: 12 };
    setStoppableInterval(() => this.nextFrame(), 1000 / 15);
  }


  /**
   * @returns {void}
   */
  nextFrame(): void {
    this.frame = (this.frame + 1) % FRAME_COUNT;
  }


  /**
   * Cuts the current frame out of the sprite sheet and draws it.
   *
   * @param {CanvasRenderingContext2D} ctx - Canvas context to draw on.
   * @returns {void}
   */
  draw(ctx: CanvasRenderingContext2D): void {
    const sourceX = this.frame * FRAME_SIZE;
    const sourceY = RED_ROW * FRAME_SIZE;
    ctx.drawImage(
      this.image,
      sourceX, sourceY, FRAME_SIZE, FRAME_SIZE,
      this.x, this.y, this.width, this.height
    );
  }


  /**
   * Only an injured player picks the potion up, so it is not wasted.
   *
   * @param {Player} player - Player who touches the potion.
   * @returns {boolean} True if the potion can be used right now.
   */
  canBeCollectedBy(player: Player): boolean {
    return super.canBeCollectedBy(player) && player.healthPoints < player.maxHealthPoints;
  }


  /**
   * Restores some health.
   *
   * @param {Player} player - Player who drank the potion.
   * @returns {void}
   */
  applyTo(player: Player): void {
    player.heal(HEAL_AMOUNT);
  }
}
