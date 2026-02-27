import { level1 } from '../data/levels/level1';
import { Background } from './background.model';
import type { EndbossModel } from './endboss.model';
import { EnemyModel } from './enemy.model';
import type { EntityModel } from './entity.model';
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
    this.checkCollisions();
  }
  checkCollisions() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.player.isColliding(enemy)) console.log('colliding with: ', enemy);
      });
    }, 200);
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
    this.level.enemies.forEach((enemy) => {
      this.drawEnemy(enemy);
      this.drawRectEnemy(enemy);
      this.drawEnemyHitbox(enemy);
    });
    this.drawEnemy(this.level.endboss);
    //load player
    this.drawPlayer(this.player);
    this.drawRectPlayer(this.player);
    this.drawPlayerHitbox(this.player);

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
  //Player draw funcs
  drawPlayer(obj: PlayerModel) {
    if (!this.ctx) return;
    if (obj.otherDirection) {
      this.ctx.save();
      this.ctx.translate(obj.width, 0);
      this.ctx.scale(-1, 1);
      obj.position_x = obj.position_x * -1;
      this.ctx.drawImage(obj.image, obj.position_x + 42, obj.position_y, obj.width, obj.height);
    } else {
      this.ctx.drawImage(obj.image, obj.position_x, obj.position_y, obj.width, obj.height);
    }

    if (obj.otherDirection) {
      obj.position_x = obj.position_x * -1;
      this.ctx.restore();
    }
  }

  drawRectPlayer(obj: PlayerModel) {
    if (!this.ctx) return;

    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = 'blue';
    if (obj.otherDirection) {
      this.ctx.rect(obj.position_x - 42, obj.position_y, obj.width, obj.height);
    } else {
      this.ctx.rect(obj.position_x, obj.position_y, obj.width, obj.height);
    }
    this.ctx.stroke();
  }

  drawPlayerHitbox(obj: PlayerModel) {
    if (!this.ctx) return;

    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = 'red';
    if (obj.otherDirection) {
      this.ctx.rect(
        obj.position_x + obj.offsets.left,
        obj.position_y + obj.offsets.bottom,
        obj.width - obj.offsets.right,
        obj.height - obj.offsets.top
      );
    } else {
      this.ctx.rect(
        obj.position_x + obj.offsets.left,
        obj.position_y + obj.offsets.bottom,
        obj.width - obj.offsets.right,
        obj.height - obj.offsets.top
      );
    }
    this.ctx.stroke();
  }

  //enemy draw funcs
  drawEnemy(obj: EnemyModel | EndbossModel) {
    if (!this.ctx) return;
    if (obj.otherDirection) {
      this.ctx.save();
      this.ctx.translate(obj.width, 0);
      this.ctx.scale(-1, 1);
      obj.position_x = obj.position_x * -1;
    }
    this.ctx.drawImage(obj.image, obj.position_x, obj.position_y, obj.width, obj.height);

    if (obj.otherDirection) {
      obj.position_x = obj.position_x * -1;
      this.ctx.restore();
    }
  }

  drawRectEnemy(obj: EnemyModel | EndbossModel) {
    if (!this.ctx) return;

    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = 'blue';
    this.ctx.rect(obj.position_x, obj.position_y, obj.width, obj.height);
    this.ctx.stroke();
  }

  //irgendwas stimmt mit dem spiegeln nicht deswegen kommt die hitbox nicht klar

  drawEnemyHitbox(obj: EnemyModel) {
    if (!this.ctx) return;

    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = 'red';
    this.ctx.rect(
      obj.position_x + obj.offsets.left,
      obj.position_y + obj.offsets.bottom,
      obj.width - obj.offsets.right,
      obj.height - obj.offsets.top
    );
    this.ctx.stroke();
  }
}
