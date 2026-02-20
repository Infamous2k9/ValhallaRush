export class EntityModel {
  position_x: number;
  position_y: number;
  image = new Image();
  imageCache: Record<string, HTMLImageElement> = {};
  otherDirection = false;

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
}
