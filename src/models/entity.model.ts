export class EntityModel {
  position_x: Number;
  position_y: Number;
  image: Image;

  constructor(start_x: Number, start_y: Number, img: string) {
    this.position_x = start_x;
    this.position_y = start_y;
    this.image = new Image();
    this.image.src = img;
  }
}
