export class EntityModel {
  position_x: number;
  position_y: number;
  image = new Image();
  imageCache: Record<string, HTMLImageElement> = {};
  otherDirection = false;
  currentImage = 0;
  speed = 0.5;
  speedY = 0;
  aceletration = 2.3;

  constructor(start_x: number, start_y: number, img: string) {
    this.position_x = start_x;
    this.position_y = start_y;
    this.image.src = img;
  }

  aplyGravity() {
    setInterval(() => {
      if (this.isAboveGround()) {
        this.position_y -= this.speedY;
        this.speedY -= this.aceletration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.position_y < 290;
  }

  loadImageCache(arr: string[]) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
  moveRight() {
    this.position_x += this.speed;
  }
  moveLeft() {
    this.position_x -= this.speed;
  }

  playAnimation(animationArr: string[]) {
    setInterval(() => {
      let i = this.currentImage % animationArr.length;
      let path = animationArr[i];
      this.image = this.imageCache[path];
      this.currentImage++;
      this.moveLeft();
    }, 1000 / animationArr.length);
  }
}
