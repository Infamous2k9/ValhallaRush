export class EntityModel {
  position_x: number;
  position_y: number;
  height = 150;
  width = 150;
  offsets = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  image = new Image();
  imageCache: Record<string, HTMLImageElement> = {};
  otherDirection = false;
  currentImage = 0;
  speed = 0.5;
  speedY = 0;
  aceletration = 2;
  startPosition = -500;

  constructor(start_x: number, start_y: number, img: string) {
    this.position_x = start_x;
    this.position_y = start_y;
    this.image.src = img;
  }

  aplyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.position_y -= this.speedY;
        this.speedY -= this.aceletration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.position_y < 270;
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
  jump() {
    this.speedY = 25;
  }

  playAnimation(animationArr: string[]) {
    let i = this.currentImage % animationArr.length;
    let path = animationArr[i];
    this.image = this.imageCache[path];
    this.currentImage++;
  }

  // isColliding(object: EntityModel) {
  //   return (
  //     this.position_x + this.width > object.position_x &&
  //     this.position_y + this.height > object.position_y &&
  //     this.position_x < object.position_x + object.width &&
  //     this.position_y < object.position_y + object.height
  //   );
  // }
  isColliding(object: EntityModel) {
    return (
      this.position_x + this.offsets.left + this.width - this.offsets.right - this.offsets.left >
        object.position_x + object.offsets.left &&
      this.position_y + this.offsets.top + this.height - this.offsets.bottom >
        object.position_y + object.offsets.top &&
      this.position_x + this.offsets.left <
        object.position_x +
          object.offsets.left +
          object.width -
          object.offsets.left -
          object.offsets.right &&
      this.position_y + this.offsets.top <
        object.position_y +
          object.offsets.top +
          object.height -
          object.offsets.top -
          object.offsets.bottom
    );
  }

  // isColliding(object: EntityModel) {
  //   return (
  //     this.position_x + this.width - this.offsets.right > object.position_x + object.offsets.left &&
  //     this.position_y + this.height - this.offsets.bottom >
  //       object.position_y + object.offsets.top &&
  //     this.position_x + this.offsets.left < object.position_x - object.offsets.right &&
  //     this.position_y + this.offsets.top < object.position_y + object.height - object.offsets.bottom
  //   );
  // }
}
