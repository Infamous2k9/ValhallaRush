import { Background } from '../../classes/background.class';
import { Endboss } from '../../classes/endboss.class';
import { Enemy } from '../../classes/enemy.class';
import { Level } from '../../classes/level.class';
import { Potion } from '../../classes/potion.class';
import { Rune } from '../../classes/rune.class';
import type { Collectible } from '../../classes/collectible.class';
import { HEAVY_GOLEM, SMALL_GOLEM } from '../enemy-types.data';

const BACKGROUND_PATH = './assets/battlegrounds/Battleground1/Bright/';
const BACKGROUND_WIDTH = 720;

const RUNE_LOW = 385;
const RUNE_HIGH = 270;
const POTION_Y = 390;

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
 * @returns {Level} A new level with new enemies and items.
 */
export function createLevel1(): Level {
  return new Level(createEnemies(), new Endboss(1850), createBackgrounds(), createCollectibles());
}


/**
 * Places the normal enemies. The first one is far enough away
 * so the player is not attacked right at the start.
 *
 * @returns {Enemy[]} Enemies of level 1.
 */
function createEnemies(): Enemy[] {
  return [
    new Enemy(400, SMALL_GOLEM),
    new Enemy(850, SMALL_GOLEM),
    new Enemy(1150, HEAVY_GOLEM),
    new Enemy(1450, SMALL_GOLEM),
  ];
}


/**
 * Places runes and potions. Runes on RUNE_HIGH can only be reached by jumping.
 *
 * @returns {Collectible[]} Items of level 1.
 */
function createCollectibles(): Collectible[] {
  const runePositions = [
    [-250, RUNE_LOW], [50, RUNE_HIGH], [300, RUNE_LOW], [650, RUNE_HIGH],
    [1000, RUNE_LOW], [1300, RUNE_HIGH], [1650, RUNE_LOW], [2050, RUNE_HIGH],
  ];
  const runes = runePositions.map(([x, y], index) => new Rune(x, y, index + 1));
  const potions = [new Potion(700, POTION_Y), new Potion(1550, POTION_Y)];
  return [...runes, ...potions];
}
