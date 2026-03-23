import { PLAYER } from '../data/player.data';
import { EntityModel } from './entity.model';
import type { WorldModel } from './world.model';

export class PlayerModel extends EntityModel {
  healthPoints = 100;
  runes = 0;
  stamina = 120;
  attack = 20;

  isOnGround = true;

  world: WorldModel | null = null;

  constructor(world: WorldModel) {
    super(-500, 290, './assets/player/knight.png');
    this.world = world;
    this.speed = 6;
    this.height = 175;
    this.width = 175;

    this.offsets.bottom = 25;
    this.offsets.right = 85;
    this.offsets.left = 40;
    this.offsets.top = 80;

    this.loadImageCache(['./assets/player/knight.png']);
    this.loadImageCache(PLAYER.walk);
    this.loadImageCache(PLAYER.jump);
    this.loadImageCache(PLAYER.idle);
    this.loadImageCache(PLAYER.death);
    this.loadImageCache(PLAYER.attack);
    this.loadImageCache(PLAYER.hurt);

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
      if (this.world.keyboard.LEFT && this.position_x > this.startPosition) {
        this.moveLeft();
        this.otherDirection = true;
      }

      if (this.world.keyboard.UP && !this.isAboveGround()) {
        this.jump();
      }

      this.world.POV_X = -this.position_x + 100;
    }, 1000 / 25);

    setInterval(() => {
      if (!this.world) return;
      if (this.isDead()) {
        //position muss noch angepasst werden
        this.position_y = 300;
        this.playAnimation(PLAYER.death);
      } else if (this.isHurt()) {
        this.playAnimation(PLAYER.hurt);
      } else if (this.isAboveGround()) {
        this.playAnimation(PLAYER.jump);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(PLAYER.walk);
      } else if (this.world.keyboard.SPACE) {
        this.playAnimation(PLAYER.attack);
      } else {
        this.playAnimation(['./assets/player/knight.png']);
      }
    }, 1000 / 10);
  }
}
