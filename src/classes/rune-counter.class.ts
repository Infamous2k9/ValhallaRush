import { DrawableObject } from './drawable-object.class';
import { Rune } from './rune.class';

/**
 * HUD element that shows a small rune and "collected / total".
 */
export class RuneCounter extends DrawableObject {
  getCount: () => number;
  total: number;

  /**
   * @param {number} x - Horizontal screen position.
   * @param {number} y - Vertical screen position.
   * @param {() => number} getCount - Returns the number of collected runes.
   * @param {number} total - Number of runes in the level.
   */
  constructor(x: number, y: number, getCount: () => number, total: number) {
    super(x, y, Rune.getImagePath(1));
    this.width = 21;
    this.height = 35;
    this.getCount = getCount;
    this.total = total;
  }


  /**
   * Draws the icon and the counter text with a dark outline for readability.
   *
   * @param {CanvasRenderingContext2D} ctx - Canvas context to draw on.
   * @returns {void}
   */
  draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);
    const text = `${this.getCount()} / ${this.total}`;
    const textX = this.x + this.width + 10;
    const textY = this.y + this.height / 2;
    ctx.save();
    ctx.font = 'bold 20px serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'black';
    ctx.strokeText(text, textX, textY);
    ctx.fillStyle = 'white';
    ctx.fillText(text, textX, textY);
    ctx.restore();
  }
}
