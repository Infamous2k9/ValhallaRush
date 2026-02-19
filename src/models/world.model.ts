import { EnemyModel } from './enemy.model';
import { PlayerModel } from './player.model';

export class WorldModel {
  ctx: CanvasRenderingContext2D | null;
  player = new PlayerModel();
  enemies = [new EnemyModel(), new EnemyModel()];

  canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    console.log(this.ctx);

    this.draw();
  }
  //verstehe noch nicht warum da ne arrow func hin muss irgendwas wegen this????
  //wurde im video 12.2.10 erklärt aber etwas anders
  draw = () => {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.clearRect(0, 0, 800, 600);

    this.ctx.drawImage(this.player.image, this.player.position_x, this.player.position_y, 100, 100);

    requestAnimationFrame(this.draw);
  };
}
