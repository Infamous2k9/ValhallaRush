import { setStoppableInterval } from '../utils/intervals';
import { Collectible } from './collectible.class';
import type { Player } from './player.class';
import type { SoundName } from './sound-manager.class';

const RUNE_PATH = './assets/items/runes/runeBlue_slabOutline_';
const BOB_HEIGHT = 5;

/**
 * Rune stone that floats up and down. Works like a coin.
 */
export class Rune extends Collectible {
  baseY: number;
  collectSound: SoundName = 'runePickup';

  /**
   * @param {number} x - Horizontal position.
   * @param {number} y - Vertical position (center of the bobbing).
   * @param {number} symbol - Number of the rune image, e.g. 3 for "..._003.png".
   */
  constructor(x: number, y: number, symbol: number) {
    super(x, y, Rune.getImagePath(symbol));
    this.baseY = y;
    this.width = 40;
    this.height = 66;
    this.offsets = { top: 5, right: 4, bottom: 5, left: 4 };
    this.startBobbing();
  }


  /**
   * @param {number} symbol - Number of the rune image.
   * @returns {string} Path like "./assets/items/runes/runeBlue_slabOutline_003.png".
   */
  static getImagePath(symbol: number): string {
    return `${RUNE_PATH}${String(symbol).padStart(3, '0')}.png`;
  }


  /**
   * Moves the rune smoothly up and down. Each rune starts at a different phase.
   *
   * @returns {void}
   */
  startBobbing(): void {
    const phase = this.x / 100;
    setStoppableInterval(() => {
      this.y = this.baseY + Math.sin(Date.now() / 300 + phase) * BOB_HEIGHT;
    }, 1000 / 25);
  }


  /**
   * Adds one rune to the player's collection.
   *
   * @param {Player} player - Player who picked the rune up.
   * @returns {void}
   */
  applyTo(player: Player): void {
    player.runes++;
  }
}
