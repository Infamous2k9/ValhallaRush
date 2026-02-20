import { PLAYER } from '../data/player.data';
import { EntityModel } from './entity.model';

export class PlayerModel extends EntityModel {
  healthPoints = 100;
  runes = 0;
  stamina = 120;
  attack = 20;
  height = 175;
  width = 175;

  constructor() {
    super(20, 300, '../../assets/player/knight.png');
    this.loadImageCache(PLAYER.walk);
    this.animate(PLAYER.walk);
  }

  animate(stateArr: string[]) {
    setInterval(() => {
      let i = this.currentImage % stateArr.length;
      let path = stateArr[i];
      this.image = this.imageCache[path];
      this.currentImage++;
    }, 1000 / stateArr.length);
  }
}
