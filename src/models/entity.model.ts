export class EntityModel {
  position_x: number;
  position_y: number;
  image: any;

  constructor(start_x: number, start_y: number, img: string) {
    this.position_x = start_x;
    this.position_y = start_y;
    this.image = new Image();
    this.image.src = img;
  }
}
