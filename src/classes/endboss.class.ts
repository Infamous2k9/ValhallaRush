import { GOLEM_3 } from '../data/golem_3.data';
import { setStoppableInterval } from '../utils/intervals';
import { MovableObject } from './movable-object.class';

/**
 * Boss golem at the end of the level.
 */
export class Endboss extends MovableObject {
  damage = 50;

  /**
   * @param {number} x - Horizontal start position.
   */
  constructor(x: number) {
    super(x, 190, './assets/enemys/golem_3/Idle/0_Golem_Idle_000.png');
    this.healthPoints = 500;
    this.width = 300;
    this.height = 300;
    this.otherDirection = true;
    this.speed = 1;
    this.offsets = { top: 70, right: 70, bottom: 40, left: 70 };
    this.loadImageCache(GOLEM_3.walking);
    this.animate();
  }


  /**
   * Starts the animation loop.
   *
   * @returns {void}
   */
  animate(): void {
    setStoppableInterval(() => this.playAnimation(GOLEM_3.walking), 1000 / 25);
  }
}
