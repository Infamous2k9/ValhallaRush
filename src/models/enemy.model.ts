import { GOLEM_1 } from '../data/golem_1.data';
import { EntityModel } from './entity.model';

export class EnemyModel extends EntityModel {
  healthPoints = 100;
  attack = 20;
  height = 150;
  width = 150;
  currentImage = 0;

  constructor() {
    super(200 + Math.random() * 500, 320, '../../assets/enemys/golem_1/Idle/0_Golem_Idle_000.png');
    this.otherDirection = true;
    this.loadImageCache(GOLEM_1.walking);
    this.animate();
  }
  animate() {
    setInterval(() => {
      let i = this.currentImage % GOLEM_1.walking.length;
      let path = GOLEM_1.walking[i];
      this.image = this.imageCache[path];
      this.currentImage++;
    }, 1000 / GOLEM_1.walking.length);
  }

  moveR(value: number) {
    console.log(value);
  }
}
