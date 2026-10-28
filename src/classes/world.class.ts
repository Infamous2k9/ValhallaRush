import { createLevel1 } from '../data/levels/level1';
import { setStoppableInterval, stopAllIntervals } from '../utils/intervals';
import type { DrawableObject } from './drawable-object.class';
import type { Enemy } from './enemy.class';
import type { Keyboard } from './keyboard.class';
import type { Level } from './level.class';
import { MovableObject } from './movable-object.class';
import { Player } from './player.class';
import { UiElement } from './ui-element.class';

/**
 * Runs one game session: owns the level, the player, the camera and the draw loop.
 */
export class World {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  level: Level;
  player: Player;
  uiElements: UiElement[];
  cameraX = 0;
  debugMode = false;
  animationFrameId = 0;

  /**
   * @param {HTMLCanvasElement} canvas - Canvas to draw on.
   * @param {Keyboard} keyboard - Shared keyboard state.
   */
  constructor(canvas: HTMLCanvasElement, keyboard: Keyboard) {
    this.canvas = canvas;
    this.ctx = this.getContext(canvas);
    this.level = createLevel1();
    this.player = new Player(keyboard, this.level.endLevelX);
    this.level.setTarget(this.player);
    this.uiElements = this.createUiElements();
    setStoppableInterval(() => this.checkCollisions(), 20);
    this.draw();
  }


  /**
   * @param {HTMLCanvasElement} canvas - Canvas element.
   * @returns {CanvasRenderingContext2D} The 2D context of the canvas.
   * @throws {Error} If the browser does not support a 2D context.
   */
  getContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context is not available.');
    return ctx;
  }


  /**
   * @returns {UiElement[]} Frames and fills of the status bars.
   */
  createUiElements(): UiElement[] {
    return [
      new UiElement(15, 10, './assets/gui/ui-bar/bg.png'),
      new UiElement(15, 10, './assets/gui/ui-bar/red.png'),
      new UiElement(15, 40, './assets/gui/ui-bar/bg.png'),
      new UiElement(15, 40, './assets/gui/ui-bar/green.png'),
    ];
  }


  /**
   * Resolves every fight between the player and the living enemies.
   *
   * @returns {void}
   */
  checkCollisions(): void {
    this.level.getAllEnemies().forEach((enemy) => {
      if (enemy.isDead()) return;
      this.checkPlayerAttack(enemy);
      this.checkEnemyContact(enemy);
    });
  }


  /**
   * Damages the enemy if the current sword swing reaches it.
   *
   * @param {Enemy} enemy - Enemy to test.
   * @returns {void}
   */
  checkPlayerAttack(enemy: Enemy): void {
    if (this.player.canHit(enemy)) this.player.hit(enemy);
  }


  /**
   * Damages the player on contact. A short invulnerability follows each hit.
   *
   * @param {Enemy} enemy - Enemy to test.
   * @returns {void}
   */
  checkEnemyContact(enemy: Enemy): void {
    if (this.player.isDead() || this.player.isHurt()) return;
    if (this.player.isColliding(enemy)) this.player.takeDamage(enemy.damage);
  }


  /**
   * Draws one frame and schedules the next one.
   *
   * @returns {void}
   */
  draw = (): void => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.cameraX = -this.player.x + 100;
    this.ctx.translate(this.cameraX, 0);
    this.drawWorldObjects();
    this.ctx.translate(-this.cameraX, 0);
    this.drawObjects(this.uiElements);
    this.animationFrameId = requestAnimationFrame(this.draw);
  };


  /**
   * Draws everything that moves with the camera.
   *
   * @returns {void}
   */
  drawWorldObjects(): void {
    this.drawObjects(this.level.backgroundObjects);
    this.drawObjects(this.level.enemies);
    this.drawObject(this.level.endboss);
    this.drawObject(this.player);
  }


  /**
   * @param {DrawableObject[]} objects - Objects to draw.
   * @returns {void}
   */
  drawObjects(objects: DrawableObject[]): void {
    objects.forEach((object) => this.drawObject(object));
  }


  /**
   * Draws an object and, in debug mode, its sprite box and hitbox.
   *
   * @param {DrawableObject} object - Object to draw.
   * @returns {void}
   */
  drawObject(object: DrawableObject): void {
    object.draw(this.ctx);
    if (this.debugMode && object instanceof MovableObject) {
      object.drawDebugFrames(this.ctx);
    }
  }


  /**
   * @returns {void}
   */
  toggleDebugMode(): void {
    this.debugMode = !this.debugMode;
  }


  /**
   * Freezes the game by stopping all intervals and the draw loop.
   *
   * @returns {void}
   */
  stop(): void {
    stopAllIntervals();
    cancelAnimationFrame(this.animationFrameId);
  }
}
