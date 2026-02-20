import { Keyboard } from './models/keyboard.model';
import { WorldModel } from './models/world.model';
import './styles/styles.scss';
// damit game in den DevTools angezeigt wird!!!
declare global {
  interface Window {
    game: WorldModel;
  }
}

let appRef = document.querySelector<HTMLCanvasElement>('[data-app]');
let game: WorldModel;
const keyboard = new Keyboard();

function init() {
  if (!appRef) return;
  game = new WorldModel(appRef, keyboard);

  //devtools
  window.game = game;
}

// keyboard logic
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'a') {
    keyboard.LEFT = true;
  } else if (e.key === 'ArrowRight' || e.key === 'd') {
    keyboard.RIGHT = true;
  } else if (e.key === 'ArrowUp' || e.key === 'w') {
    keyboard.UP = true;
  } else if (e.key === 'ArrowDown' || e.key === 's') {
    keyboard.DOWN = true;
  } else if (e.key === ' ') {
    keyboard.SPACE = true;
  }
});
window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowLeft' || e.key === 'a') {
    keyboard.LEFT = false;
  } else if (e.key === 'ArrowRight' || e.key === 'd') {
    keyboard.RIGHT = false;
  } else if (e.key === 'ArrowUp' || e.key === 'w') {
    keyboard.UP = false;
  } else if (e.key === 'ArrowDown' || e.key === 's') {
    keyboard.DOWN = false;
  } else if (e.key === ' ') {
    keyboard.SPACE = false;
  }
});

init();
