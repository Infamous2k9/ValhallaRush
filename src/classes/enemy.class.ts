import { GOLEM_1 } from '../data/golem_1.data';
import { setStoppableInterval } from '../utils/intervals';
import { MovableObject } from './movable-object.class';

/**
 * Normal golem enemy.
 */
export class Enemy extends MovableObject {
  damage = 5;

  /**
   * @param {number} x - Horizontal start position.
   */
  constructor(x: number) {
    super(x, 320, './assets/enemys/golem_1/Idle/0_Golem_Idle_000.png');
    this.otherDirection = true;
    this.speed = 0.5 + Math.random() * 1.5;
    this.offsets = { top: 30, right: 30, bottom: 20, left: 30 };
    this.loadImageCache(GOLEM_1.walking);
    this.loadImageCache(GOLEM_1.hurt);
    this.loadImageCache(GOLEM_1.dying);
    this.animate();
  }


  /**
   * Starts the animation loop.
   *
   * @returns {void}
   */
  animate(): void {
    setStoppableInterval(() => this.updateAnimation(), 1000 / 25);
  }


  /**
   * Picks the animation that matches the current state.
   *
   * @returns {void}
   */
  updateAnimation(): void {
    if (this.isDead()) {
      this.playAnimation(GOLEM_1.dying);
    } else if (this.isHurt()) {
      this.playAnimation(GOLEM_1.hurt);
    } else {
      this.playAnimation(GOLEM_1.walking);
    }
  }
}
