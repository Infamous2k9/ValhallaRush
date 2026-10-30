type KeyAction = 'left' | 'right' | 'up' | 'down' | 'space';

const KEY_MAP: Record<string, KeyAction> = {
  ArrowLeft: 'left',
  a: 'left',
  ArrowRight: 'right',
  d: 'right',
  ArrowUp: 'up',
  w: 'up',
  ArrowDown: 'down',
  s: 'down',
  ' ': 'space',
};

/**
 * Tracks which game keys are currently pressed.
 */
export class Keyboard {
  left = false;
  right = false;
  up = false;
  down = false;
  space = false;


  /**
   * Registers keydown and keyup listeners. Call this only once.
   *
   * @returns {void}
   */
  bindEvents(): void {
    window.addEventListener('keydown', (event) => this.handleKey(event, true));
    window.addEventListener('keyup', (event) => this.handleKey(event, false));
  }


  /**
   * Updates the action that belongs to a key. Game keys do not scroll the page,
   * but a focused button still reacts to space and enter.
   *
   * @param {KeyboardEvent} event - Keyboard event from the browser.
   * @param {boolean} isPressed - New state of the action.
   * @returns {void}
   */
  handleKey(event: KeyboardEvent, isPressed: boolean): void {
    const action = KEY_MAP[event.key];
    if (!action) return;
    if (!(event.target instanceof HTMLButtonElement)) event.preventDefault();
    this[action] = isPressed;
  }


  /**
   * Releases all keys, e.g. before a new game starts.
   *
   * @returns {void}
   */
  reset(): void {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.space = false;
  }
}
