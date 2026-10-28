import { PLAYER } from '../data/player.data';
import type { Hitbox } from '../interfaces/hitbox.interface';
import { hitboxesOverlap } from '../utils/collision';
import { setStoppableInterval } from '../utils/intervals';
import type { Keyboard } from './keyboard.class';
import { MovableObject } from './movable-object.class';

const START_X = -500;
const ATTACK_DURATION = 400;
const ATTACK_RANGE = 70;

/**
 * The knight controlled by the player.
 */
export class Player extends MovableObject {
  runes = 0;
  stamina = 120;
  damage = 20;
  keyboard: Keyboard;
  maxX: number;
  lastAttack = 0;
  hitTargets = new Set<MovableObject>();

  /**
   * @param {Keyboard} keyboard - Shared keyboard state.
   * @param {number} maxX - Right border of the level.
   */
  constructor(keyboard: Keyboard, maxX: number) {
    super(START_X, 290, PLAYER.idle[0]);
    this.keyboard = keyboard;
    this.maxX = maxX;
    this.groundY = 290;
    this.speed = 6;
    this.width = 175;
    this.height = 175;
    this.offsets = { top: 80, right: 20, bottom: 25, left: 40 };
    this.loadAllImages();
    this.applyGravity();
    this.animate();
  }


  /**
   * Preloads every animation of the knight.
   *
   * @returns {void}
   */
  loadAllImages(): void {
    Object.values(PLAYER).forEach((frames) => this.loadImageCache(frames));
  }


  /**
   * Starts the movement loop and the animation loop.
   *
   * @returns {void}
   */
  animate(): void {
    setStoppableInterval(() => this.handleInput(), 1000 / 25);
    setStoppableInterval(() => this.updateAnimation(), 1000 / 10);
  }


  /**
   * Reacts to the pressed keys. A dead knight ignores all input.
   *
   * @returns {void}
   */
  handleInput(): void {
    if (this.isDead()) return;
    this.handleWalking();
    if (this.keyboard.up && !this.isAboveGround()) this.jump();
    if (this.keyboard.space) this.startAttack();
  }


  /**
   * Walks left or right inside the level borders.
   *
   * @returns {void}
   */
  handleWalking(): void {
    if (this.keyboard.right && this.x < this.maxX) {
      this.moveRight();
      this.otherDirection = false;
    }
    if (this.keyboard.left && this.x > START_X) {
      this.moveLeft();
      this.otherDirection = true;
    }
  }


  /**
   * Starts a new sword swing unless one is still running.
   *
   * @returns {void}
   */
  startAttack(): void {
    if (this.isAttacking()) return;
    this.lastAttack = Date.now();
    this.hitTargets.clear();
  }


  /**
   * @returns {boolean} True while a sword swing is running.
   */
  isAttacking(): boolean {
    return Date.now() - this.lastAttack < ATTACK_DURATION;
  }


  /**
   * Area in front of the knight that the sword reaches.
   *
   * @returns {Hitbox} Absolute edges of the sword area.
   */
  getAttackHitbox(): Hitbox {
    const body = this.getHitbox();
    const left = this.otherDirection ? body.left - ATTACK_RANGE : body.right;
    return { left, right: left + ATTACK_RANGE, top: body.top, bottom: body.bottom };
  }


  /**
   * A target can be hit once per swing and only if the sword reaches it.
   *
   * @param {MovableObject} target - Object to test.
   * @returns {boolean} True if the current swing hits the target.
   */
  canHit(target: MovableObject): boolean {
    if (!this.isAttacking() || this.hitTargets.has(target)) return false;
    return hitboxesOverlap(this.getAttackHitbox(), target.getHitbox());
  }


  /**
   * Damages a target and remembers it for the current swing.
   *
   * @param {MovableObject} target - Object that was hit.
   * @returns {void}
   */
  hit(target: MovableObject): void {
    target.takeDamage(this.damage);
    this.hitTargets.add(target);
  }


  /**
   * Picks the animation that matches the current state.
   *
   * @returns {void}
   */
  updateAnimation(): void {
    if (this.isDead()) {
      this.playAnimationOnce(PLAYER.death);
    } else if (this.isHurt()) {
      this.playAnimation(PLAYER.hurt);
    } else if (this.isAttacking()) {
      this.playAnimationOnce(PLAYER.attack);
    } else if (this.isAboveGround()) {
      this.playAnimation(PLAYER.jump);
    } else if (this.keyboard.right || this.keyboard.left) {
      this.playAnimation(PLAYER.walk);
    } else {
      this.playAnimation(PLAYER.idle);
    }
  }


  /**
   * Adds the sword area (yellow) to the debug view while attacking.
   *
   * @param {CanvasRenderingContext2D} ctx - Canvas context to draw on.
   * @returns {void}
   */
  drawDebugFrames(ctx: CanvasRenderingContext2D): void {
    super.drawDebugFrames(ctx);
    if (this.isAttacking()) this.strokeHitbox(ctx, this.getAttackHitbox(), 'yellow');
  }
}
