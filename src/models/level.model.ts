import type { Background } from './background.model';
import type { EnemyModel } from './enemy.model';

export class Level {
  enemies: EnemyModel[];
  backgroundObjects: Background[];
  endLevelX = 700 * 3;

  constructor(enemies: EnemyModel[], bgObjects: Background[]) {
    this.enemies = enemies;
    this.backgroundObjects = bgObjects;
  }
}
