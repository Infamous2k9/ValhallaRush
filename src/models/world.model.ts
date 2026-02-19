import { Background } from './background.model';
import { EnemyModel } from './enemy.model';
import { PlayerModel } from './player.model';

export class WorldModel {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  player = new PlayerModel();
  enemies = [new EnemyModel(), new EnemyModel()];

  bgObjects = [
    new Background(0, 0, '../../assets/battlegrounds/Battleground1/Bright/sky.png'),
    new Background(0, 10, '../../assets/battlegrounds/Battleground1/Bright/ruins_bg.png'),
    new Background(0, 70, '../../assets/battlegrounds/Battleground1/Bright/hills&trees.png'),
    new Background(0, 80, '../../assets/battlegrounds/Battleground1/Bright/ruins.png'),
    new Background(0, 100, '../../assets/battlegrounds/Battleground1/Bright/ruins2.png'),
    new Background(0, 140, '../../assets/battlegrounds/Battleground1/Bright/statue.png'),
    new Background(0, 170, '../../assets/battlegrounds/Battleground1/Bright/stones&grass.png'),
  ];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.draw();
  }
  //verstehe noch nicht warum da ne arrow func hin muss irgendwas wegen this????
  //wurde im video 12.2.10 erklärt aber etwas anders
  draw = () => {
    if (!this.ctx) return;

    //clear Canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //load background objects
    this.bgObjects.forEach((object) => this.loadBackground(object));

    //load player
    this.loadPlayer(this.player);

    //load enemies
    this.enemies.forEach((enemy) => this.loadEnemy(enemy));

    //redraw all
    requestAnimationFrame(this.draw);
  };

  loadBackground(object: Background) {
    if (!this.ctx) return;
    return this.ctx.drawImage(
      object.image,
      object.position_x,
      object.position_y,
      this.canvas.width,
      this.canvas.height
    );
  }

  loadPlayer(object: PlayerModel) {
    if (!this.ctx) return;
    return this.ctx.drawImage(
      object.image,
      object.position_x,
      object.position_y,
      object.height,
      object.width
    );
  }

  loadEnemy(object: EnemyModel) {
    if (!this.ctx) return;
    return this.ctx.drawImage(
      object.image,
      object.position_x,
      object.position_y,
      object.height,
      object.width
    );
  }
}
