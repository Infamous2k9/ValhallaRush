import { Keyboard } from './classes/keyboard.class';
import { World } from './classes/world.class';
import type { GameResult } from './classes/world.class';
import { soundManager } from './classes/sound-manager.class';
import './styles/styles.scss';

// Expose the running game in the DevTools as `game`
declare global {
  interface Window {
    game?: World;
  }
}

const keyboard = new Keyboard();
const canvas = document.querySelector<HTMLCanvasElement>('[data-app]');


/**
 * Binds all input once. The game itself starts with the start button.
 *
 * @returns {void}
 */
function init(): void {
  keyboard.bindEvents();
  bindShortcuts();
  bindButtons();
  updateMuteButton();
}


/**
 * Connects the buttons of the start and end screen.
 *
 * @returns {void}
 */
function bindButtons(): void {
  getElement('startButton').addEventListener('click', startGame);
  getElement('restartButton').addEventListener('click', startGame);
  getElement('homeButton').addEventListener('click', () => showScreen('startScreen'));
  getElement('muteButton').addEventListener('click', toggleMute);
}


/**
 * Switches all sounds on or off and updates the button.
 *
 * @returns {void}
 */
function toggleMute(): void {
  soundManager.toggleMute();
  updateMuteButton();
  blurActiveElement();
}


/**
 * Shows the current mute state on the button.
 *
 * @returns {void}
 */
function updateMuteButton(): void {
  const button = getElement('muteButton');
  button.textContent = soundManager.isMuted ? '🔇' : '🔊';
  button.setAttribute('aria-pressed', String(soundManager.isMuted));
}


/**
 * Stops a running game and starts a completely fresh one without reloading the page.
 *
 * @returns {void}
 */
function startGame(): void {
  if (!canvas) return;
  window.game?.stop();
  keyboard.reset();
  hideAllScreens();
  blurActiveElement();
  window.game = new World(canvas, keyboard, showEndScreen);
}


/**
 * Shows the result and the collected runes after the game has ended.
 *
 * @param {GameResult} result - Whether the player won or lost.
 * @returns {void}
 */
function showEndScreen(result: GameResult): void {
  const runes = window.game?.player.runes ?? 0;
  const totalRunes = window.game?.level.totalRunes ?? 0;
  getElement('endTitle').textContent = result === 'won' ? 'Victory!' : 'Game Over';
  getElement('endStats').textContent = `Runes collected: ${runes} / ${totalRunes}`;
  showScreen('endScreen');
}


/**
 * Hides every screen and shows only the requested one.
 *
 * @param {string} id - Id of the screen element.
 * @returns {void}
 */
function showScreen(id: string): void {
  hideAllScreens();
  getElement(id).classList.remove('d-none');
}


/**
 * @returns {void}
 */
function hideAllScreens(): void {
  document.querySelectorAll('.screen').forEach((screen) => screen.classList.add('d-none'));
}


/**
 * Removes the focus from the clicked button, so the space key
 * attacks in the game instead of clicking the button again.
 *
 * @returns {void}
 */
function blurActiveElement(): void {
  if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
}


/**
 * @param {string} id - Id of the element.
 * @returns {HTMLElement} The element with this id.
 * @throws {Error} If the element does not exist.
 */
function getElement(id: string): HTMLElement {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Element #${id} not found.`);
  return element;
}


/**
 * H toggles the hitbox view, M toggles the sound.
 *
 * @returns {void}
 */
function bindShortcuts(): void {
  window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (key === 'h') window.game?.toggleDebugMode();
    if (key === 'm') toggleMute();
  });
}

init();
