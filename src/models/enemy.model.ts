import { GOLEM_1 } from '../data/golem_1.data';
//import { GOLEM_2 } from '../data/golem_2.data';
//import { GOLEM_3 } from '../data/golem_3.data';
import { EntityModel } from './entity.model';

export class EnemyModel extends EntityModel {
  healthPoints = 100;
  attack = 20;
  height = 150;
  width = 150;

  constructor() {
    super(400 + Math.random() * 500, 320, './assets/enemys/golem_1/Idle/0_Golem_Idle_000.png');
    this.otherDirection = true;
    this.speed = 2;
    this.speed = this.speed * (Math.random() * 2);

    this.loadImageCache(GOLEM_1.walking);
    this.animate();
  }
  animate() {
    this.playAnimation(GOLEM_1.walking);
  }
}
