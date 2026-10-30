import { createLevel1 } from '../data/levels/level1';
import { setStoppableInterval, stopAllIntervals } from '../utils/intervals';
import type { DrawableObject } from './drawable-object.class';
import type { Enemy } from './enemy.class';
import type { Keyboard } from './keyboard.class';
import type { Level } from './level.class';
import { MovableObject } from './movable-object.class';
import { Player } from './player.class';
import { RuneCounter } from './rune-counter.class';
import { StatusBar } from './status-bar.class';

const RED_FILL = './assets/gui/ui-bar/red.png';
const GREEN_FILL = './assets/gui/ui-bar/green.png';
const END_DELAY = 1500;

export type GameResult = 'won' | 'lost';

/**
 * Runs one game session: owns the level, the player, the camera and the draw loop.
 */
export class World {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  level: Level;
  player: Player;
  hud: DrawableObject[];
  cameraX = 0;
  debugMode = false;
  animationFrameId = 0;
  isOver = false;
  onGameEnd: (result: GameResult) => void;

  /**
   * @param {HTMLCanvasElement} canvas - Canvas to draw on.
   * @param {Keyboard} keyboard - Shared keyboard state.
   * @param {(result: GameResult) => void} onGameEnd - Called once when the game is won or lost.
   */
  constructor(canvas: HTMLCanvasElement, keyboard: Keyboard, onGameEnd: (result: GameResult) => void) {
    this.canvas = canvas;
    this.onGameEnd = onGameEnd;
    this.ctx = this.getContext(canvas);
    this.level = createLevel1();
    this.player = new Player(keyboard, this.level.endLevelX);
    this.level.setTarget(this.player);
    this.hud = this.createHud();
    setStoppableInterval(() => this.checkCollisions(), 20);
    setStoppableInterval(() => this.checkGameEnd(), 100);
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
   * Health, stamina and runes of the player on the left, boss health on the right.
   * The boss bar only shows up once the boss has woken up.
   *
   * @returns {DrawableObject[]} All elements of the HUD.
   */
  createHud(): DrawableObject[] {
    const boss = this.level.endboss;
    const bossBarX = this.canvas.width - 175;
    return [
      new StatusBar(15, 10, RED_FILL, () => this.player.getHealthPercentage()),
      new StatusBar(15, 40, GREEN_FILL, () => this.player.getStaminaPercentage()),
      new RuneCounter(20, 78, () => this.player.runes, this.level.totalRunes),
      new StatusBar(bossBarX, 10, RED_FILL, () => boss.getHealthPercentage(), () => boss.isActivated),
    ];
  }


  /**
   * Resolves fights and item pickups.
   *
   * @returns {void}
   */
  checkCollisions(): void {
    this.level.getAllEnemies().forEach((enemy) => {
      if (enemy.isDead()) return;
      this.checkPlayerAttack(enemy);
      this.checkEnemyContact(enemy);
    });
    this.checkCollectibles();
  }


  /**
   * Lets the player pick up every item he touches and removes it from the level.
   *
   * @returns {void}
   */
  checkCollectibles(): void {
    this.level.collectibles.forEach((item) => {
      if (item.canBeCollectedBy(this.player) && this.player.isColliding(item)) {
        item.collect(this.player);
      }
    });
    this.level.removeCollected();
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
    this.drawObjects(this.hud);
    this.animationFrameId = requestAnimationFrame(this.draw);
  };


  /**
   * Draws everything that moves with the camera.
   *
   * @returns {void}
   */
  drawWorldObjects(): void {
    this.drawObjects(this.level.backgroundObjects);
    this.drawObjects(this.level.collectibles);
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
   * Ends the game when the player or the boss has died.
   *
   * @returns {void}
   */
  checkGameEnd(): void {
    if (this.isOver) return;
    if (this.player.isDead()) {
      this.finish('lost');
    } else if (this.level.endboss.isDead()) {
      this.finish('won');
    }
  }


  /**
   * Lets the death animation play, then freezes the game and reports the result.
   *
   * @param {GameResult} result - Whether the player won or lost.
   * @returns {void}
   */
  finish(result: GameResult): void {
    this.isOver = true;
    setTimeout(() => {
      this.stop();
      this.onGameEnd(result);
    }, END_DELAY);
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
