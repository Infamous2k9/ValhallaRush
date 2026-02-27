import { GOLEM_3 } from '../data/golem_3.data';
import { EntityModel } from './entity.model';

export class EndbossModel extends EntityModel {
  healthPoints = 500;
  attack = 50;

  constructor() {
    super(1850, 190, './assets/enemys/golem_3/Idle/0_Golem_Idle_000.png');
    this.otherDirection = true;
    this.speed = 2;
    this.speed = this.speed * (Math.random() * 1);
    this.height = 300;
    this.width = 300;

    this.offsets.bottom = 73;
    this.offsets.top = 120;
    this.offsets.left = 80;
    this.offsets.right = 170;

    this.loadImageCache(GOLEM_3.walking);
    this.animate();
  }
  animate() {
    //setInterval muss noch geschrieben werden
    this.playAnimation(GOLEM_3.walking);
  }
}
