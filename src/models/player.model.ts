import { EntityModel } from './entity.model';

export class PlayerModel extends EntityModel {
  healthPoints = 100;
  runes = 0;
  stamina = 120;
  attack = 20;

  constructor() {
    super(20, 320, '../../assets/player/knight.png');
  }

  moveRight(value: number) {
    this.position_x += value;
  }
  moveLeft(value: number) {
    this.position_x -= value;
  }
}
