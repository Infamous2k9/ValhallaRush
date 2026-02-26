import type { Background } from './background.model';
import type { EndbossModel } from './endboss.model';
import type { EnemyModel } from './enemy.model';

export class Level {
  enemies: EnemyModel[];
  endboss: EndbossModel;
  backgroundObjects: Background[];
  endLevelX = 700 * 3;

  constructor(enemies: EnemyModel[], endboss: EndbossModel, bgObjects: Background[]) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.backgroundObjects = bgObjects;
  }
}
