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
    window.addEventListener('keydown', (event) => this.setKey(event.key, true));
    window.addEventListener('keyup', (event) => this.setKey(event.key, false));
  }


  /**
   * Updates the state of the action that belongs to a key.
   *
   * @param {string} key - Value of KeyboardEvent.key.
   * @param {boolean} isPressed - New state of the action.
   * @returns {void}
   */
  setKey(key: string, isPressed: boolean): void {
    const action = KEY_MAP[key];
    if (action) this[action] = isPressed;
  }
}
