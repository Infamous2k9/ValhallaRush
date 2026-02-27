import { EntityModel } from './entity.model';

export class Background extends EntityModel {
  constructor(x: number, y: number, path: string) {
    super(x, y, path);
  }
}
