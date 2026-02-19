import { EntityModel } from './entity.model';

export class PlayerModel extends EntityModel {
  healthPoints = 100;
  runes = 0;
  stamina = 120;
  attack = 20;
  height = 175;
  width = 175;

  IMAGES_IDLE = [
    'assets/player/Idle/idle1.png',
    'assets/player/Idle/idle2.png',
    'assets/player/Idle/idle3.png',
    'assets/player/Idle/idle4.png',
    'assets/player/Idle/idle5.png',
    'assets/player/Idle/idle6.png',
    'assets/player/Idle/idle7.png',
    'assets/player/Idle/idle8.png',
    'assets/player/Idle/idle9.png',
    'assets/player/Idle/idle10.png',
    'assets/player/Idle/idle11.png',
    'assets/player/Idle/idle12.png',
  ];
  currentImage = 0;

  constructor() {
    super(20, 300, '../../assets/player/knight.png');
    this.loadImageCache(this.IMAGES_IDLE);
    this.animate();
  }

  moveRight(value: number) {
    this.position_x += value;
  }
  moveLeft(value: number) {
    this.position_x -= value;
  }
  animate() {
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_IDLE.length;
      let path = this.IMAGES_IDLE[i];
      this.image = this.imageCache[path];
      this.currentImage++;
    }, 1000 / 12);
  }
  loadImage(path: string) {
    this.image.src = path;
  }
}
