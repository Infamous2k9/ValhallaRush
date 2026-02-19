import { EntityModel } from './entity.model';

export class EnemyModel extends EntityModel {
  healthPoints = 100;
  attack = 20;

  constructor() {
    super(120, 200, '../../assets/enemys/golem_1/Idle/0_Golem_Idle_000.png');
  }
}
