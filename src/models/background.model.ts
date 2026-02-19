import { EntityModel } from './entity.model';

export class Background extends EntityModel {
  speed = 1;

  constructor(x: number, y: number, path: string) {
    super(x, y, path);
  }
}
