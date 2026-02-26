import { PLAYER } from '../data/player.data';
import { EntityModel } from './entity.model';
import type { WorldModel } from './world.model';

export class PlayerModel extends EntityModel {
  healthPoints = 100;
  runes = 0;
  stamina = 120;
  attack = 20;
  height = 175;
  width = 175;
  world: WorldModel | null = null;

  constructor(world: WorldModel) {
    super(-500, 90, './assets/player/knight.png');
    this.world = world;
    this.speed = 6;
    this.loadImageCache(PLAYER.walk);
    this.aplyGravity();
    this.animate();
  }

  animate() {
    if (!this.world) return;

    setInterval(() => {
      if (!this.world) return;
      if (this.world.keyboard.RIGHT && this.position_x < this.world.level.endLevelX) {
        this.moveRight();
        this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT && this.position_x > -100) {
        this.moveLeft();
        this.otherDirection = true;
      }
      this.world.POV_X = -this.position_x + 100;
    }, 1000 / 25);

    setInterval(() => {
      if (!this.world) return;
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let i = this.currentImage % PLAYER.walk.length;
        let path = PLAYER.walk[i];
        this.image = this.imageCache[path];
        this.currentImage++;
      }
    }, 1000 / PLAYER.walk.length);
  }
}
