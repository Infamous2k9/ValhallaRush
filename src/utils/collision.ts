import type { Hitbox } from '../interfaces/hitbox.interface';

/**
 * Checks whether two hitboxes overlap.
 *
 * @param {Hitbox} a - First hitbox.
 * @param {Hitbox} b - Second hitbox.
 * @returns {boolean} True if both hitboxes overlap.
 */
export function hitboxesOverlap(a: Hitbox, b: Hitbox): boolean {
  return a.right > b.left && a.bottom > b.top && a.left < b.right && a.top < b.bottom;
}
