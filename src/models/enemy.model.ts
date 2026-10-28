import { GOLEM_1 } from '../data/golem_1.data';
//import { GOLEM_2 } from '../data/golem_2.data';
//import { GOLEM_3 } from '../data/golem_3.data';
import { EntityModel } from './entity.model';

export class EnemyModel extends EntityModel {
  attack = 5;

  constructor() {
    //später justieren
    super(20 + Math.random() * 100, 320, './assets/enemys/golem_1/Idle/0_Golem_Idle_000.png');
    this.otherDirection = true;
    this.speed = 2;
    this.speed = this.speed * (Math.random() * 2);

    this.offsets.bottom = 20;
    this.offsets.top = 30;
    this.offsets.right = 30;
    this.offsets.left = 30;

    this.loadImageCache(GOLEM_1.walking);
    this.animate();
  }
  animate() {
    setInterval(() => {
      this.playAnimation(GOLEM_1.walking);
      //this.moveLeft();
    }, 1000 / 25);

    setInterval(() => {
      if (this.isDead()) {
        //position muss noch angepasst werden
        this.position_y = 300;
        this.playAnimation(GOLEM_1.dying);
      } else if (this.isHurt()) {
        this.playAnimation(GOLEM_1.hurt);
      }
    }, 1000 / 10);
  }
}
