import { level1 } from '../data/levels/level1';
import { Background } from './background.model';
import type { EndbossModel } from './endboss.model';
import { EnemyModel } from './enemy.model';
import type { EntityModel } from './entity.model';
import { Userinterface } from './gui.model';
import { Keyboard } from './keyboard.model';
import { PlayerModel } from './player.model';

export class WorldModel {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  player: PlayerModel;
  keyboard: Keyboard;
  POV_X = 0;
  debugMode = true;

  level = level1;

  UI = [
    new Userinterface(15, 10, './assets/gui/ui-bar/bg.png'),
    new Userinterface(15, 10, './assets/gui/ui-bar/red.png'),

    new Userinterface(15, 40, './assets/gui/ui-bar/bg.png'),
    new Userinterface(15, 40, './assets/gui/ui-bar/green.png'),
  ];

  constructor(canvas: HTMLCanvasElement, keyboard: Keyboard) {
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.ctx = canvas.getContext('2d');
    this.player = new PlayerModel(this);
    this.setWorld();
    this.draw();
    this.checkCollisions();
    this.initDebugToggle();
  }
  checkCollisions() {
    setInterval(() => {
      //Enemies Collision
      this.level.enemies.forEach((enemy) => {
        if (this.player.isColliding(enemy) && this.player.isAttacking === false) {
          this.player.takeDamage(enemy.attack);
          console.log('take dmg: ', this.player.healthPoints);
        }
      });

      //Endboss Collision
      if (this.player.isColliding(this.level.endboss)) {
        console.log('colliding with: ', this.level.endboss);
      }
    }, 20);
  }

  setWorld() {
    this.player.world = this;
  }

  draw = () => {
    if (!this.ctx) return;

    //clear Canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.POV_X, 0);
    //load background objects
    this.level.backgroundObjects.forEach((bg) => this.loadBackground(bg));

    //load Userinterface
    this.UI.forEach((element) => {
      this.drawInterface(element, -this.POV_X);
    });

    //load enemies
    this.level.enemies.forEach((enemy) => {
      this.drawEnemy(enemy);
      //Enemiy Debug
      if (this.debugMode) {
        this.drawSpriteBox(enemy);
        this.drawHitbox(enemy);
      }
    });
    this.drawEnemy(this.level.endboss);
    if (this.debugMode) {
      this.drawSpriteBox(this.level.endboss);
      this.drawHitbox(this.level.endboss);
    }
    //load player
    this.drawPlayer(this.player);
    // Player Debug
    if (this.debugMode) {
      this.drawSpriteBox(this.player);
      this.drawHitbox(this.player);
    }

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

  drawInterface(element: Userinterface, x: number) {
    if (!this.ctx) return;
    return this.ctx.drawImage(element.image, x + element.position_x, element.position_y, 160, 35);
  }

  drawPlayer(obj: PlayerModel) {
    if (!this.ctx) return;

    if (obj.otherDirection) {
      this.ctx.save();
      this.ctx.translate(obj.width, 0);
      this.ctx.scale(-1, 1);
      obj.position_x = obj.position_x * -1;
      this.ctx.drawImage(obj.image, obj.position_x + 42, obj.position_y, obj.width, obj.height);
    } else if (!obj.otherDirection) {
      this.ctx.drawImage(obj.image, obj.position_x, obj.position_y, obj.width, obj.height);
    }
    if (obj.otherDirection) {
      obj.position_x = obj.position_x * -1;
      this.ctx.restore();
    }
  }
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

  drawSpriteBox(object: EntityModel) {
    if (!this.ctx) return;

    this.ctx.strokeStyle = 'blue';
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(object.position_x, object.position_y, object.width, object.height);
  }

  drawHitbox(object: EntityModel) {
    if (!this.ctx) return;

    const x = object.position_x + object.offsets.left;
    const y = object.position_y + object.offsets.top;
    const width = object.width - object.offsets.left - object.offsets.right;
    const height = object.height - object.offsets.top - object.offsets.bottom;

    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(x, y, width, height);
  }

  initDebugToggle() {
    window.addEventListener('keydown', (event) => {
      if (event.key.toLowerCase() === 'h') {
        this.debugMode = !this.debugMode;
        console.log('Debug Mode:', this.debugMode);
      }
    });
  }
}
