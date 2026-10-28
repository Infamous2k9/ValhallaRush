import { PLAYER } from '../data/player.data';
import { setStoppableInterval } from '../utils/intervals';
import type { Keyboard } from './keyboard.class';
import { MovableObject } from './movable-object.class';

const START_X = -500;

/**
 * The knight controlled by the player.
 */
export class Player extends MovableObject {
  runes = 0;
  stamina = 120;
  damage = 20;
  keyboard: Keyboard;
  maxX: number;

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
    setStoppableInterval(() => this.handleMovement(), 1000 / 25);
    setStoppableInterval(() => this.updateAnimation(), 1000 / 10);
  }


  /**
   * Moves and jumps according to the pressed keys.
   *
   * @returns {void}
   */
  handleMovement(): void {
    if (this.isDead()) return;
    if (this.keyboard.right && this.x < this.maxX) {
      this.moveRight();
      this.otherDirection = false;
    }
    if (this.keyboard.left && this.x > START_X) {
      this.moveLeft();
      this.otherDirection = true;
    }
    if (this.keyboard.up && !this.isAboveGround()) this.jump();
  }


  /**
   * Picks the animation that matches the current state.
   *
   * @returns {void}
   */
  updateAnimation(): void {
    if (this.isDead()) {
      this.playAnimation(PLAYER.death);
    } else if (this.isHurt()) {
      this.playAnimation(PLAYER.hurt);
    } else if (this.isAboveGround()) {
      this.playAnimation(PLAYER.jump);
    } else if (this.keyboard.right || this.keyboard.left) {
      this.playAnimation(PLAYER.walk);
    } else if (this.keyboard.space) {
      this.playAnimation(PLAYER.attack);
    } else {
      this.playAnimation(PLAYER.idle);
    }
  }
}
