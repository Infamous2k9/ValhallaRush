/**
 * Base class for everything that can be drawn on the canvas.
 */
export class DrawableObject {
  x: number;
  y: number;
  width = 150;
  height = 150;
  image = new Image();
  imageCache: Record<string, HTMLImageElement> = {};
  otherDirection = false;

  /**
   * @param {number} x - Horizontal start position.
   * @param {number} y - Vertical start position.
   * @param {string} path - Path of the initial image.
   */
  constructor(x: number, y: number, path: string) {
    this.x = x;
    this.y = y;
    this.loadImage(path);
  }


  /**
   * Loads a single image and shows it immediately.
   *
   * @param {string} path - Path of the image.
   * @returns {void}
   */
  loadImage(path: string): void {
    this.image = new Image();
    this.image.src = path;
  }


  /**
   * Preloads a list of images into the cache for animations.
   *
   * @param {string[]} paths - Paths of the images.
   * @returns {void}
   */
  loadImageCache(paths: string[]): void {
    paths.forEach((path) => {
      const image = new Image();
      image.src = path;
      this.imageCache[path] = image;
    });
  }


  /**
   * Draws the object, mirrored if it faces left.
   *
   * @param {CanvasRenderingContext2D} ctx - Canvas context to draw on.
   * @returns {void}
   */
  draw(ctx: CanvasRenderingContext2D): void {
    if (this.otherDirection) {
      this.drawMirrored(ctx);
    } else {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }


  /**
   * Flips the canvas around the object instead of changing the object's position.
   *
   * @param {CanvasRenderingContext2D} ctx - Canvas context to draw on.
   * @returns {void}
   */
  drawMirrored(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.translate(this.x + this.width, this.y);
    ctx.scale(-1, 1);
    ctx.drawImage(this.image, 0, 0, this.width, this.height);
    ctx.restore();
  }
}
