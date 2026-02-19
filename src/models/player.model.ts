import { EntityModel } from './entity.model';

export class PlayerModel extends EntityModel {
  healthPoints = 100;
  runes = 0;
  stamina = 120;
  attack = 20;

  constructor() {
    super(20, 200, '../../assets/player/knight.png');
  }
}
