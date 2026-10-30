import { PLAYER } from '../data/player.data';
import type { Hitbox } from '../interfaces/hitbox.interface';
import { hitboxesOverlap } from '../utils/collision';
import { setStoppableInterval } from '../utils/intervals';
import type { Keyboard } from './keyboard.class';
import { MovableObject } from './movable-object.class';

const START_X = -500;
const ATTACK_DURATION = 400;
const ATTACK_RANGE = 95;
const ATTACK_COST = 25;
const STAMINA_REGENERATION = 0.5;
const SLEEP_DELAY = 10000;
const SLEEP_FRAMES = PLAYER.idle.flatMap((frame) => [frame, frame, frame]);
const PLAY_ONCE = [PLAYER.death, PLAYER.attack];

/**
 * The knight controlled by the player.
 */
export class Player extends MovableObject {
  runes = 0;
  stamina = 100;
  maxStamina = 100;
  damage = 20;
  keyboard: Keyboard;
  maxX: number;
  lastAttack = 0;
  lastInput = Date.now();
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
    this.offsets = { top: 80, right: 95, bottom: 25, left: 40 };
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
   * Starts the input loop and the animation loop.
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
    if (this.hasInput()) this.lastInput = Date.now();
    this.handleWalking();
    if (this.keyboard.up && !this.isAboveGround()) this.jump();
    if (this.keyboard.space) this.startAttack();
    this.regenerateStamina();
  }


  /**
   * @returns {boolean} True if any game key is pressed.
   */
  hasInput(): boolean {
    const { left, right, up, down, space } = this.keyboard;
    return left || right || up || down || space;
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
   * Refills stamina a little on every tick while not attacking.
   *
   * @returns {void}
   */
  regenerateStamina(): void {
    if (this.isAttacking()) return;
    this.stamina = Math.min(this.maxStamina, this.stamina + STAMINA_REGENERATION);
  }


  /**
   * @returns {number} Remaining stamina between 0 and 1.
   */
  getStaminaPercentage(): number {
    return this.stamina / this.maxStamina;
  }


  /**
   * Restores health without going above the maximum.
   *
   * @param {number} amount - Health points to restore.
   * @returns {void}
   */
  heal(amount: number): void {
    this.healthPoints = Math.min(this.maxHealthPoints, this.healthPoints + amount);
  }


  /**
   * Starts a new sword swing if no swing is running and enough stamina is left.
   *
   * @returns {void}
   */
  startAttack(): void {
    if (this.isAttacking() || this.stamina < ATTACK_COST) return;
    this.stamina -= ATTACK_COST;
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
   * @returns {boolean} True if the knight has been idle for too long.
   */
  isSleeping(): boolean {
    return !this.isDead() && Date.now() - this.lastInput > SLEEP_DELAY;
  }


  /**
   * Plays the animation of the current state. Death and attack do not loop.
   *
   * @returns {void}
   */
  updateAnimation(): void {
    const frames = this.getCurrentFrames();
    if (PLAY_ONCE.includes(frames)) {
      this.playAnimationOnce(frames);
    } else {
      this.playAnimation(frames);
    }
  }


  /**
   * @returns {string[]} Frames of the state with the highest priority.
   */
  getCurrentFrames(): string[] {
    if (this.isDead()) return PLAYER.death;
    if (this.isHurt()) return PLAYER.hurt;
    if (this.isAttacking()) return PLAYER.attack;
    if (this.isAboveGround()) return PLAYER.jump;
    if (this.keyboard.right || this.keyboard.left) return PLAYER.walk;
    if (this.isSleeping()) return SLEEP_FRAMES;
    return PLAYER.idle;
  }


  /**
   * Draws the knight and a floating "Zzz" while he sleeps.
   *
   * @param {CanvasRenderingContext2D} ctx - Canvas context to draw on.
   * @returns {void}
   */
  draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);
    if (this.isSleeping()) this.drawSleepIndicator(ctx);
  }


  /**
   * Draws a "Zzz" that slowly rises above the head and starts again.
   *
   * @param {CanvasRenderingContext2D} ctx - Canvas context to draw on.
   * @returns {void}
   */
  drawSleepIndicator(ctx: CanvasRenderingContext2D): void {
    const rise = (Date.now() / 60) % 25;
    ctx.font = 'bold 22px serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('Zzz', this.getCenterX(), this.y + 70 - rise);
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
