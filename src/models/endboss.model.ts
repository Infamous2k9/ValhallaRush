import { GOLEM_3 } from '../data/golem_3.data';
import { EntityModel } from './entity.model';

export class EndbossModel extends EntityModel {
  healthPoints = 500;
  attack = 50;
  height = 300;
  width = 300;

  constructor() {
    super(1850, 190, './assets/enemys/golem_3/Idle/0_Golem_Idle_000.png');
    this.otherDirection = true;
    this.speed = 2;
    this.speed = this.speed * (Math.random() * 1);

    this.loadImageCache(GOLEM_3.walking);
    this.animate();
  }
  animate() {
    this.playAnimation(GOLEM_3.walking);
  }
}
