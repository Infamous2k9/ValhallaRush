import { level1 } from '../data/levels/level1';
import { Background } from './background.model';
import type { EndbossModel } from './endboss.model';
import { EnemyModel } from './enemy.model';
import { Keyboard } from './keyboard.model';
import { PlayerModel } from './player.model';

export class WorldModel {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  player: PlayerModel;
  keyboard: Keyboard;
  POV_X = 0;

  level = level1;

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

    this.ctx.translate(this.POV_X, 0);
    //load background objects
    this.level.backgroundObjects.forEach((object) => this.loadBackground(object));
    //load enemies
    this.level.enemies.forEach((enemy) => this.loadEnemy(enemy));
    this.loadEnemy(this.level.endboss);
    //load player
    this.loadPlayer(this.player);

    this.ctx.translate(-this.POV_X, 0);

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

  loadEnemy(object: EnemyModel | EndbossModel) {
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
