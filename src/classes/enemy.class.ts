import type { EnemyAnimations, EnemyConfig } from '../interfaces/enemy-config.interface';
import { setStoppableInterval } from '../utils/intervals';
import { MovableObject } from './movable-object.class';

/**
 * Golem enemy. Waits until the target comes close, then walks toward it and attacks.
 */
export class Enemy extends MovableObject {
  animations: EnemyAnimations;
  idleFrames: string[];
  damage = 0;
  activationRange = 0;
  isActivated = false;
  target: MovableObject | null = null;

  /**
   * @param {number} x - Horizontal start position.
   * @param {EnemyConfig} config - Stats and animations of the enemy type.
   */
  constructor(x: number, config: EnemyConfig) {
    super(x, config.y, config.animations.walking[0]);
    this.animations = config.animations;
    this.idleFrames = [config.animations.walking[0]];
    this.otherDirection = true;
    this.applyConfig(config);
    this.loadAnimations();
    this.animate();
  }


  /**
   * Copies size and stats from the enemy type.
   *
   * @param {EnemyConfig} config - Stats of the enemy type.
   * @returns {void}
   */
  applyConfig(config: EnemyConfig): void {
    this.width = config.width;
    this.height = config.height;
    this.healthPoints = config.healthPoints;
    this.maxHealthPoints = config.healthPoints;
    this.damage = config.damage;
    this.speed = config.speed;
    this.activationRange = config.activationRange;
    this.offsets = { ...config.offsets };
  }


  /**
   * Preloads every animation of this enemy type.
   *
   * @returns {void}
   */
  loadAnimations(): void {
    Object.values(this.animations).forEach((frames) => {
      if (frames) this.loadImageCache(frames);
    });
  }


  /**
   * Starts the movement loop and the animation loop.
   *
   * @returns {void}
   */
  animate(): void {
    setStoppableInterval(() => this.updateMovement(), 1000 / 25);
    setStoppableInterval(() => this.updateAnimation(), 1000 / 25);
  }


  /**
   * Wakes up when the target is close, then follows it until they touch.
   *
   * @returns {void}
   */
  updateMovement(): void {
    if (this.isDead() || !this.target || this.target.isDead()) return;
    if (!this.isActivated) this.isActivated = this.isTargetInRange();
    if (this.isActivated && !this.isColliding(this.target)) this.moveTowardTarget();
  }


  /**
   * @returns {boolean} True if the target is within the activation range.
   */
  isTargetInRange(): boolean {
    if (!this.target) return false;
    return Math.abs(this.target.getCenterX() - this.getCenterX()) < this.activationRange;
  }


  /**
   * Turns toward the target and takes one step.
   *
   * @returns {void}
   */
  moveTowardTarget(): void {
    if (!this.target) return;
    this.otherDirection = this.target.getCenterX() < this.getCenterX();
    if (this.otherDirection) {
      this.moveLeft();
    } else {
      this.moveRight();
    }
  }


  /**
   * Picks the animation that matches the current state.
   *
   * @returns {void}
   */
  updateAnimation(): void {
    if (this.isDead()) {
      this.playAnimationOnce(this.animations.dying);
    } else if (this.isHurt() && this.animations.hurt) {
      this.playAnimation(this.animations.hurt);
    } else if (this.target && this.isColliding(this.target)) {
      this.playAnimation(this.animations.attack);
    } else if (this.isActivated) {
      this.playAnimation(this.animations.walking);
    } else {
      this.playAnimation(this.idleFrames);
    }
  }
}
