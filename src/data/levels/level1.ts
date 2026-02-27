import { Level } from '../../models/level.model';
import { EnemyModel } from '../../models/enemy.model';
import { Background } from '../../models/background.model';
import { EndbossModel } from '../../models/endboss.model';

export const level1 = new Level(
  [new EnemyModel()],

  new EndbossModel(),

  [
    new Background(-720, 0, './assets/battlegrounds/Battleground1/Bright/sky.png'),
    new Background(-720, 10, './assets/battlegrounds/Battleground1/Bright/ruins_bg.png'),
    new Background(-720, 70, './assets/battlegrounds/Battleground1/Bright/hills&trees.png'),
    new Background(-720, 80, './assets/battlegrounds/Battleground1/Bright/ruins.png'),
    new Background(-720, 100, './assets/battlegrounds/Battleground1/Bright/ruins2.png'),
    new Background(-720, 140, './assets/battlegrounds/Battleground1/Bright/statue.png'),
    new Background(-720, 170, './assets/battlegrounds/Battleground1/Bright/stones&grass.png'),
    new Background(0, 0, './assets/battlegrounds/Battleground1/Bright/sky.png'),
    new Background(0, 10, './assets/battlegrounds/Battleground1/Bright/ruins_bg.png'),
    new Background(0, 70, './assets/battlegrounds/Battleground1/Bright/hills&trees.png'),
    new Background(0, 80, './assets/battlegrounds/Battleground1/Bright/ruins.png'),
    new Background(0, 100, './assets/battlegrounds/Battleground1/Bright/ruins2.png'),
    new Background(0, 140, './assets/battlegrounds/Battleground1/Bright/statue.png'),
    new Background(0, 170, './assets/battlegrounds/Battleground1/Bright/stones&grass.png'),
    new Background(720, 0, './assets/battlegrounds/Battleground1/Bright/sky.png'),
    new Background(720, 10, './assets/battlegrounds/Battleground1/Bright/ruins_bg.png'),
    new Background(720, 70, './assets/battlegrounds/Battleground1/Bright/hills&trees.png'),
    new Background(720, 80, './assets/battlegrounds/Battleground1/Bright/ruins.png'),
    new Background(720, 100, './assets/battlegrounds/Battleground1/Bright/ruins2.png'),
    new Background(720, 140, './assets/battlegrounds/Battleground1/Bright/statue.png'),
    new Background(720, 170, './assets/battlegrounds/Battleground1/Bright/stones&grass.png'),
    new Background(720 * 2, 0, './assets/battlegrounds/Battleground1/Bright/sky.png'),
    new Background(720 * 2, 10, './assets/battlegrounds/Battleground1/Bright/ruins_bg.png'),
    new Background(720 * 2, 70, './assets/battlegrounds/Battleground1/Bright/hills&trees.png'),
    new Background(720 * 2, 80, './assets/battlegrounds/Battleground1/Bright/ruins.png'),
    new Background(720 * 2, 100, './assets/battlegrounds/Battleground1/Bright/ruins2.png'),
    new Background(720 * 2, 140, './assets/battlegrounds/Battleground1/Bright/statue.png'),
    new Background(720 * 2, 170, './assets/battlegrounds/Battleground1/Bright/stones&grass.png'),
    new Background(720 * 3, 0, './assets/battlegrounds/Battleground1/Bright/sky.png'),
    new Background(720 * 3, 10, './assets/battlegrounds/Battleground1/Bright/ruins_bg.png'),
    new Background(720 * 3, 70, './assets/battlegrounds/Battleground1/Bright/hills&trees.png'),
    new Background(720 * 3, 80, './assets/battlegrounds/Battleground1/Bright/ruins.png'),
    new Background(720 * 3, 100, './assets/battlegrounds/Battleground1/Bright/ruins2.png'),
    new Background(720 * 3, 140, './assets/battlegrounds/Battleground1/Bright/statue.png'),
    new Background(720 * 3, 170, './assets/battlegrounds/Battleground1/Bright/stones&grass.png'),
  ]
);
