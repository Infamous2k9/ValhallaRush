import type { Hitbox } from '../interfaces/hitbox.interface';
import type { Offsets } from '../interfaces/offsets.interface';
import { hitboxesOverlap } from '../utils/collision';
import { setStoppableInterval } from '../utils/intervals';
import { DrawableObject } from './drawable-object.class';

/**
 * Base class for living objects that move, animate, collide and take damage.
 */
export class MovableObject extends DrawableObject {
  speed = 0.5;
  speedY = 0;
  acceleration = 2;
  groundY = 0;
  healthPoints = 100;
  lastHit = 0;
  currentImage = 0;
  currentAnimation: string[] = [];
  offsets: Offsets = { top: 0, right: 0, bottom: 0, left: 0 };


  /**
   * Starts pulling the object down while it is in the air.
   *
   * @returns {void}
   */
  applyGravity(): void {
    setStoppableInterval(() => this.updateVerticalPosition(), 1000 / 25);
  }


  /**
   * Moves the object by its vertical speed and lands it on the ground.
   *
   * @returns {void}
   */
  updateVerticalPosition(): void {
    if (!this.isAboveGround() && this.speedY <= 0) return;
    this.y -= this.speedY;
    this.speedY -= this.acceleration;
    if (this.y > this.groundY) {
      this.y = this.groundY;
      this.speedY = 0;
    }
  }


  /**
   * @returns {boolean} True if the object is above its ground line.
   */
  isAboveGround(): boolean {
    return this.y < this.groundY;
  }


  /**
   * @returns {void}
   */
  moveRight(): void {
    this.x += this.speed;
  }


  /**
   * @returns {void}
   */
  moveLeft(): void {
    this.x -= this.speed;
  }


  /**
   * Gives the object upward speed. Gravity takes over afterwards.
   *
   * @returns {void}
   */
  jump(): void {
    this.speedY = 25;
  }


  /**
   * Shows the next frame of an animation and loops it.
   *
   * @param {string[]} frames - Image paths of the animation.
   * @returns {void}
   */
  playAnimation(frames: string[]): void {
    this.switchAnimation(frames);
    const index = this.currentImage % frames.length;
    this.image = this.imageCache[frames[index]];
    this.currentImage++;
  }


  /**
   * Shows the next frame of an animation and stops on the last frame.
   *
   * @param {string[]} frames - Image paths of the animation.
   * @returns {void}
   */
  playAnimationOnce(frames: string[]): void {
    this.switchAnimation(frames);
    const index = Math.min(this.currentImage, frames.length - 1);
    this.image = this.imageCache[frames[index]];
    this.currentImage++;
  }


  /**
   * Restarts at the first frame whenever a different animation begins.
   *
   * @param {string[]} frames - Image paths of the requested animation.
   * @returns {void}
   */
  switchAnimation(frames: string[]): void {
    if (this.currentAnimation === frames) return;
    this.currentAnimation = frames;
    this.currentImage = 0;
  }


  /**
   * Reduces health points and remembers the time of the hit.
   *
   * @param {number} amount - Damage to apply.
   * @returns {void}
   */
  takeDamage(amount: number): void {
    this.healthPoints = Math.max(0, this.healthPoints - amount);
    this.lastHit = Date.now();
  }


  /**
   * @returns {boolean} True for 0.8 seconds after the last hit.
   */
  isHurt(): boolean {
    const secondsSinceHit = (Date.now() - this.lastHit) / 1000;
    return secondsSinceHit < 0.8;
  }


  /**
   * @returns {boolean} True if no health points are left.
   */
  isDead(): boolean {
    return this.healthPoints === 0;
  }


  /**
   * Calculates the hitbox. Left and right offsets swap when the object is mirrored.
   *
   * @returns {Hitbox} Absolute hitbox edges.
   */
  getHitbox(): Hitbox {
    const left = this.otherDirection ? this.offsets.right : this.offsets.left;
    const right = this.otherDirection ? this.offsets.left : this.offsets.right;
    return {
      left: this.x + left,
      right: this.x + this.width - right,
      top: this.y + this.offsets.top,
      bottom: this.y + this.height - this.offsets.bottom,
    };
  }


  /**
   * Checks whether two hitboxes overlap.
   *
   * @param {MovableObject} other - Object to test against.
   * @returns {boolean} True if both hitboxes overlap.
   */
  isColliding(other: MovableObject): boolean {
    return hitboxesOverlap(this.getHitbox(), other.getHitbox());
  }


  /**
   * @returns {number} Horizontal center of the sprite.
   */
  getCenterX(): number {
    return this.x + this.width / 2;
  }


  /**
   * Draws the sprite box (blue) and the hitbox (red) for debugging.
   *
   * @param {CanvasRenderingContext2D} ctx - Canvas context to draw on.
   * @returns {void}
   */
  drawDebugFrames(ctx: CanvasRenderingContext2D): void {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    this.strokeHitbox(ctx, this.getHitbox(), 'red');
  }


  /**
   * Outlines a hitbox on the canvas.
   *
   * @param {CanvasRenderingContext2D} ctx - Canvas context to draw on.
   * @param {Hitbox} box - Hitbox to outline.
   * @param {string} color - Stroke color.
   * @returns {void}
   */
  strokeHitbox(ctx: CanvasRenderingContext2D, box: Hitbox, color: string): void {
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.strokeRect(box.left, box.top, box.right - box.left, box.bottom - box.top);
  }
}
