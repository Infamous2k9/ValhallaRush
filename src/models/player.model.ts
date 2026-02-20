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
    super(20, 290, '../../assets/player/knight.png');
    this.world = world;
    this.speed = 6;
    this.loadImageCache(PLAYER.walk);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (!this.world) return;
      if (this.world.keyboard.RIGHT) {
        this.moveRight();
        this.otherDirection = false;
      }
      if (this.world.keyboard.LEFT) {
        this.moveLeft();
        this.otherDirection = true;
      }
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
