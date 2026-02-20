export class EntityModel {
  position_x: number;
  position_y: number;
  image = new Image();
  imageCache: Record<string, HTMLImageElement> = {};
  otherDirection = false;
  currentImage = 0;
  speed = 0.5;

  constructor(start_x: number, start_y: number, img: string) {
    this.position_x = start_x;
    this.position_y = start_y;
    this.image.src = img;
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
}
