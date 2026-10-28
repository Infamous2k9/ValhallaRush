import { DrawableObject } from './drawable-object.class';

const FRAME_PATH = './assets/gui/ui-bar/bg.png';

/**
 * Bar that shows a value between 0 and 1, e.g. health or stamina.
 * It reads the value itself on every frame, so it can never be out of date.
 */
export class StatusBar extends DrawableObject {
  fill = new Image();
  getPercentage: () => number;
  isVisible: () => boolean;

  /**
   * @param {number} x - Horizontal screen position.
   * @param {number} y - Vertical screen position.
   * @param {string} fillPath - Image of the colored fill.
   * @param {() => number} getPercentage - Returns the current value between 0 and 1.
   * @param {() => boolean} [isVisible] - Returns false to hide the bar.
   */
  constructor(
    x: number,
    y: number,
    fillPath: string,
    getPercentage: () => number,
    isVisible: () => boolean = () => true
  ) {
    super(x, y, FRAME_PATH);
    this.width = 160;
    this.height = 35;
    this.fill.src = fillPath;
    this.getPercentage = getPercentage;
    this.isVisible = isVisible;
  }


  /**
   * Draws the frame and a fill that is cut to the current percentage.
   *
   * @param {CanvasRenderingContext2D} ctx - Canvas context to draw on.
   * @returns {void}
   */
  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.isVisible()) return;
    const percentage = Math.min(1, Math.max(0, this.getPercentage()));
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    if (percentage === 0 || !this.fill.complete) return;
    const sourceWidth = this.fill.naturalWidth * percentage;
    const sourceHeight = this.fill.naturalHeight;
    const targetWidth = this.width * percentage;
    ctx.drawImage(this.fill, 0, 0, sourceWidth, sourceHeight, this.x, this.y, targetWidth, this.height);
  }
}
