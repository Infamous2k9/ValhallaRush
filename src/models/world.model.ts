import { Background } from './background.model';
import { EnemyModel } from './enemy.model';
import { Keyboard } from './keyboard.model';
import { PlayerModel } from './player.model';

export class WorldModel {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  player: PlayerModel;
  enemies = [new EnemyModel(), new EnemyModel()];
  keyboard: Keyboard;

  bgObjects = [
    new Background(0, 0, '../../assets/battlegrounds/Battleground1/Bright/sky.png'),
    new Background(0, 10, '../../assets/battlegrounds/Battleground1/Bright/ruins_bg.png'),
    new Background(0, 70, '../../assets/battlegrounds/Battleground1/Bright/hills&trees.png'),
    new Background(0, 80, '../../assets/battlegrounds/Battleground1/Bright/ruins.png'),
    new Background(0, 100, '../../assets/battlegrounds/Battleground1/Bright/ruins2.png'),
    new Background(0, 140, '../../assets/battlegrounds/Battleground1/Bright/statue.png'),
    new Background(0, 170, '../../assets/battlegrounds/Battleground1/Bright/stones&grass.png'),
  ];

  constructor(canvas: HTMLCanvasElement, keyboard: Keyboard) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = canvas.getContext('2d');
    this.player = new PlayerModel(this);
    this.setWorld();
    this.draw();
  }
  setWorld() {
    this.player.world = this;
  }
  //verstehe noch nicht warum da ne arrow func hin muss irgendwas wegen this????
  //wurde im video 12.2.10 erklärt aber etwas anders
  draw = () => {
    if (!this.ctx) return;

    //clear Canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //load background objects
    this.bgObjects.forEach((object) => this.loadBackground(object));

    //load enemies
    this.enemies.forEach((enemy) => this.loadEnemy(enemy));

    //load player
    this.loadPlayer(this.player);

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
    if (object.otherDirection) {
      this.flipObject(object);
    } else {
      this.drawObject(object);
    }
  }

  loadEnemy(object: EnemyModel) {
    if (!this.ctx) return;
    this.flipObject(object);
  }

  drawObject(obj: EnemyModel | PlayerModel) {
    if (!this.ctx) return;

    this.ctx.drawImage(obj.image, obj.position_x, obj.position_y, obj.width, obj.height);
  }

  flipObject(obj: EnemyModel | PlayerModel) {
    if (!this.ctx) return;
    this.ctx.save();

    this.ctx.translate(obj.position_x + obj.width / 2, 0);
    this.ctx.scale(-1, 1);

    this.ctx.drawImage(obj.image, 0, obj.position_y, obj.width, obj.height);

    this.ctx.restore();
  }
}
