import { GOLEM_1 } from '../data/golem_1.data';
//import { GOLEM_2 } from '../data/golem_2.data';
//import { GOLEM_3 } from '../data/golem_3.data';
import { EntityModel } from './entity.model';

export class EnemyModel extends EntityModel {
  healthPoints = 100;
  attack = 20;

  constructor() {
    //später justieren
    super(20 + Math.random() * 100, 320, './assets/enemys/golem_1/Idle/0_Golem_Idle_000.png');
    this.otherDirection = true;
    this.speed = 2;
    this.speed = this.speed * (Math.random() * 2);

    this.offsets.bottom = 35;
    this.offsets.top = 50;
    this.offsets.right = 80;
    this.offsets.left = 40;

    this.loadImageCache(GOLEM_1.walking);
    this.animate();
  }
  animate() {
    setInterval(() => {
      this.playAnimation(GOLEM_1.walking);
      //this.moveLeft();
    }, 1000 / 25);
  }
}
