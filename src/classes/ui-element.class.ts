import { DrawableObject } from './drawable-object.class';

/**
 * Static interface image that stays fixed on screen (e.g. bar frames).
 */
export class UiElement extends DrawableObject {
  /**
   * @param {number} x - Horizontal screen position.
   * @param {number} y - Vertical screen position.
   * @param {string} path - Path of the image.
   */
  constructor(x: number, y: number, path: string) {
    super(x, y, path);
    this.width = 160;
    this.height = 35;
  }
}
