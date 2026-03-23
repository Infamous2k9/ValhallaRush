export class EntityModel {
  healthPoints = 100;

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
  lastHit = 0;

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
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 0.8;
  }

  takeDamage(value: number) {
    this.healthPoints -= value;
    if (this.healthPoints < 0) {
      this.healthPoints = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isDead() {
    return this.healthPoints === 0;
  }

  playAnimation(animationArr: string[]) {
    let i = this.currentImage % animationArr.length;
    let path = animationArr[i];
    this.image = this.imageCache[path];
    this.currentImage++;
  }

  isColliding(object: EntityModel): boolean {
    const tolerance = 0;

    const thisLeft = this.position_x + this.offsets.left - tolerance;
    const thisRight = this.position_x + this.width - this.offsets.right + tolerance;
    const thisTop = this.position_y + this.offsets.top - tolerance;
    const thisBottom = this.position_y + this.height - this.offsets.bottom + tolerance;

    const objectLeft = object.position_x + object.offsets.left;
    const objectRight = object.position_x + object.width - object.offsets.right;
    const objectTop = object.position_y + object.offsets.top;
    const objectBottom = object.position_y + object.height - object.offsets.bottom;

    return (
      thisRight > objectLeft &&
      thisBottom > objectTop &&
      thisLeft < objectRight &&
      thisTop < objectBottom
    );
  }
}
