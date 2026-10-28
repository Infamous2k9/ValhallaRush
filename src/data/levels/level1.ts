import { Background } from '../../classes/background.class';
import { Endboss } from '../../classes/endboss.class';
import { Enemy } from '../../classes/enemy.class';
import { Level } from '../../classes/level.class';

const BACKGROUND_PATH = './assets/battlegrounds/Battleground1/Bright/';
const BACKGROUND_WIDTH = 720;

const BACKGROUND_LAYERS = [
  { file: 'sky.png', y: 0 },
  { file: 'ruins_bg.png', y: 10 },
  { file: 'hills&trees.png', y: 70 },
  { file: 'ruins.png', y: 80 },
  { file: 'ruins2.png', y: 100 },
  { file: 'statue.png', y: 140 },
  { file: 'stones&grass.png', y: 170 },
];


/**
 * Builds all background layers for one screen-wide segment.
 *
 * @param {number} segment - Index of the segment (-1 is left of the start).
 * @returns {Background[]} Background layers of this segment.
 */
function createBackgroundSegment(segment: number): Background[] {
  const x = segment * BACKGROUND_WIDTH;
  return BACKGROUND_LAYERS.map((layer) => new Background(x, layer.y, BACKGROUND_PATH + layer.file));
}


/**
 * Builds the background from segment -1 to segment 3.
 *
 * @returns {Background[]} All background layers of the level.
 */
function createBackgrounds(): Background[] {
  const segments = [-1, 0, 1, 2, 3];
  return segments.flatMap((segment) => createBackgroundSegment(segment));
}


/**
 * Creates a fresh copy of level 1. Call it again for every new game.
 *
 * @returns {Level} A new level with new enemies.
 */
export function createLevel1(): Level {
  return new Level(
    [new Enemy(20 + Math.random() * 100)],
    new Endboss(1850),
    createBackgrounds()
  );
}
