import { EntityModel } from './entity.model';

export class EnemyModel extends EntityModel {
  healthPoints = 100;
  attack = 20;
  height = 150;
  width = 150;

  constructor() {
    super(200 + Math.random() * 500, 320, '../../assets/enemys/golem_2/Idle/0_Golem_Idle_000.png');
  }

  moveR(value: number) {
    console.log(value);
  }
}
