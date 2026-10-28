import { Keyboard } from './classes/keyboard.class';
import { World } from './classes/world.class';
import './styles/styles.scss';

// Expose the running game in the DevTools as `game`
declare global {
  interface Window {
    game: World;
  }
}

const keyboard = new Keyboard();


/**
 * Binds the input once and starts the first game.
 *
 * @returns {void}
 */
function init(): void {
  const canvas = document.querySelector<HTMLCanvasElement>('[data-app]');
  if (!canvas) return;
  keyboard.bindEvents();
  bindDebugToggle();
  window.game = new World(canvas, keyboard);
}


/**
 * Toggles the hitbox view with the H key.
 *
 * @returns {void}
 */
function bindDebugToggle(): void {
  window.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'h') window.game?.toggleDebugMode();
  });
}

init();
