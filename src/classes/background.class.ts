import { DrawableObject } from './drawable-object.class';

/**
 * One layer of the level background, as wide as the canvas.
 */
export class Background extends DrawableObject {
  /**
   * @param {number} x - Horizontal position of the layer.
   * @param {number} y - Vertical offset of the layer.
   * @param {string} path - Path of the layer image.
   */
  constructor(x: number, y: number, path: string) {
    super(x, y, path);
    this.width = 720;
    this.height = 480;
  }
}
